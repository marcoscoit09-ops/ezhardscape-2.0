interface LoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function staticLoader({ src }: LoaderParams): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${base}${src}`;
}
