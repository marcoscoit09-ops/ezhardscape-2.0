"use client";

import { useRef, RefObject } from "react";

/**
 * useVideoFade
 *
 * Custom hook that manages a requestAnimationFrame-based fade system
 * for a background video element. NO CSS transitions are used.
 *
 * Fade-in:  opacity 0 → 1 over 250ms (on first canPlay + each loop restart)
 * Fade-out: opacity 1 → 0 over 250ms (when 0.55s remain before video ends)
 *
 * On video ended:
 *   1. Set opacity to 0
 *   2. Wait 100ms
 *   3. Reset currentTime = 0 and play()
 *   4. Fade back in
 */
export function useVideoFade(videoRef: RefObject<HTMLVideoElement | null>) {
  const animFrameRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);
  const hasStartedRef = useRef<boolean>(false);

  /** Cancel any currently running animation frame */
  const cancelFrame = () => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  /** Fade opacity from 0 → 1 over 250ms using rAF */
  const fadeIn = (el: HTMLVideoElement) => {
    cancelFrame();
    const duration = 250;
    const startTime = performance.now();
    el.style.opacity = "0";

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.style.opacity = String(progress);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  };

  /** Fade opacity from 1 → 0 over 250ms using rAF */
  const fadeOut = (el: HTMLVideoElement) => {
    cancelFrame();
    const duration = 250;
    const startTime = performance.now();
    const startOpacity = parseFloat(el.style.opacity ?? "1");

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.style.opacity = String(startOpacity * (1 - progress));

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        el.style.opacity = "0";
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  };

  /* ── Event Handlers ─────────────────────────────────────────── */

  /**
   * onCanPlay: Triggers fade-in on first load only.
   * Subsequent loops are handled by onEnded.
   */
  const onCanPlay = () => {
    const el = videoRef.current;
    if (!el || hasStartedRef.current) return;
    hasStartedRef.current = true;
    fadingOutRef.current = false;
    fadeIn(el);
  };

  /**
   * onTimeUpdate: When 0.55s remain before the video ends,
   * trigger the fade-out. fadingOutRef prevents re-triggering.
   */
  const onTimeUpdate = () => {
    const el = videoRef.current;
    if (!el || fadingOutRef.current) return;

    const remaining = el.duration - el.currentTime;
    if (remaining <= 0.55 && remaining > 0) {
      fadingOutRef.current = true;
      fadeOut(el);
    }
  };

  /**
   * onEnded: Reset and restart the video with a fade-in.
   * 1. Set opacity to 0 immediately
   * 2. Wait 100ms
   * 3. Reset currentTime and play
   * 4. Fade in
   */
  const onEnded = () => {
    const el = videoRef.current;
    if (!el) return;

    cancelFrame();
    el.style.opacity = "0";

    setTimeout(() => {
      if (!videoRef.current) return;
      const video = videoRef.current;
      video.currentTime = 0;
      fadingOutRef.current = false;

      video
        .play()
        .then(() => fadeIn(video))
        .catch(() => {
          // Autoplay blocked — keep video hidden, it'll retry on user interaction
        });
    }, 100);
  };

  return { onCanPlay, onTimeUpdate, onEnded };
}
