import type { ReactNode } from "react";
import { KineticText } from "@/components/KineticText";

type Tone = "accent" | "coral" | "amber" | "ink";

const toneTextCls: Record<Tone, string> = {
  accent: "text-[var(--color-accent)]",
  coral: "text-[var(--color-coral)]",
  amber: "text-[var(--color-amber)]",
  ink: "text-[var(--color-ink)]",
};

const blobColorVar: Record<Tone, string> = {
  accent: "var(--color-accent)",
  coral: "var(--color-coral)",
  amber: "var(--color-amber)",
  ink: "var(--color-ink)",
};

const stickerToneCls: Record<Tone, string> = {
  accent: "is-blue",
  coral: "is-coral",
  amber: "is-amber",
  ink: "is-ink",
};

/**
 * PageHero — the "chapter" header pattern shared by About / Blog index /
 * Recommends: a soft background blob, an optional rotated sticker, a big
 * chapter number, and a kinetic (word-wipe) title. Previously this ~15
 * line block was hand-copied on every page with slightly drifting
 * numbers/colors — now it lives in one place.
 */
export function PageHero({
  number,
  label,
  title,
  accentSuffix = "。",
  tone = "accent",
  meta,
  sticker,
  stickerTone,
  blobSide = "left",
  className = "",
  children,
}: {
  number: string;
  label: string;
  title: string;
  /** rendered right after the kinetic title, e.g. "." or "？" */
  accentSuffix?: ReactNode;
  tone?: Tone;
  meta?: ReactNode;
  /** small rotated corner sticker text, e.g. "About ✦" — omitted if unset */
  sticker?: string;
  /** sticker color, defaults to `tone` but can be set independently for contrast */
  stickerTone?: Tone;
  blobSide?: "left" | "right";
  className?: string;
  /** extra content under the title — chip rows, stat grids, description text */
  children?: ReactNode;
}) {
  return (
    <section
      className={`px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-10 relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className={`absolute -top-10 w-[380px] h-[380px] rounded-full pointer-events-none opacity-15 ${
          blobSide === "left" ? "-left-20" : "-right-20"
        }`}
        style={{
          background: `radial-gradient(circle, ${blobColorVar[tone]}, transparent 70%)`,
        }}
      />
      {sticker && (
        <span
          className={`sticker ${stickerToneCls[stickerTone ?? tone]} absolute top-14 right-5 sm:right-8 lg:right-12 rotate-[-3deg] z-10 hidden sm:inline-block`}
        >
          {sticker}
        </span>
      )}

      <header
        className="flex items-end justify-between gap-6 mb-2 flex-wrap"
        data-reveal
      >
        <div className="flex items-end gap-4 sm:gap-6 min-w-0">
          <span
            className={`chapter-number ${toneTextCls[tone]} text-[clamp(56px,8vw,120px)]`}
          >
            {number}
          </span>
          <span className="pb-3">
            <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">
              {label}
            </span>
            <span className="flex items-baseline gap-0.5 flex-wrap">
              <KineticText
                as="h2"
                text={title}
                className="font-serif font-semibold leading-[1.05] tracking-tight text-[var(--color-ink)] text-[clamp(28px,3.4vw,48px)]"
              />
              {accentSuffix && <span className="hl-coral">{accentSuffix}</span>}
            </span>
          </span>
        </div>
        {meta && <div className="pb-3">{meta}</div>}
      </header>

      {children}
    </section>
  );
}
