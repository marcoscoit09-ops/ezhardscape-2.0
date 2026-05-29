import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface BadgeProps {
  newLabel?: string;
  text: string;
  className?: string;
}

/**
 * Badge — split pill design
 * Left: dark background with star icon + "New" label
 * Right: light background with descriptive text
 */
export default function Badge({
  newLabel = "New",
  text,
  className,
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full overflow-hidden shadow-sm border border-black/[0.06]",
        className
      )}
    >
      {/* Dark left side */}
      <div className="flex items-center gap-1 bg-[#0e1311] px-3 py-1.5">
        <Star className="w-3 h-3 text-white fill-white" />
        <span className="font-inter text-[13px] font-medium text-white leading-none">
          {newLabel}
        </span>
      </div>

      {/* Light right side */}
      <div className="flex items-center bg-white px-3 py-1.5">
        <span className="font-inter text-[11px] sm:text-[13px] font-normal text-black/80 leading-none">
          {text}
        </span>
      </div>
    </div>
  );
}
