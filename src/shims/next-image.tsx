/**
 * `next/image` shim.
 *
 * Arc's installed blocks are authored for Next.js and one of them
 * (`site-header`) imports `next/image`. This project is Vite + React Router,
 * so the import is aliased here (see vite.config.ts / tsconfig.app.json)
 * to a plain `<img>` that accepts the same props we actually pass.
 * Keeping it as a shim means Arc's source stays unforked and can be
 * re-installed by the shadcn CLI without losing local edits.
 */
import type { ImgHTMLAttributes } from "react";

type NextImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> & {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  /** Next-only knobs we accept and ignore. */
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  unoptimized?: boolean;
};

export default function Image({
  fill,
  priority,
  // Next-only knobs: accepted so the prop types line up, then dropped so
  // they never reach the DOM.
  quality,
  unoptimized,
  style,
  alt,
  ...rest
}: NextImageProps) {
  void quality;
  void unoptimized;
  return (
    <img
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={
        fill
          ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }
          : style
      }
      {...rest}
    />
  );
}
