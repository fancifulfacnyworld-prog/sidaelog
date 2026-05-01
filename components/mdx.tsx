import type { ReactNode } from "react";
import { Spoiler } from "./Spoiler";

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-black/20 pl-5">
      <div className="text-[16px] leading-[1.8] tracking-[-0.01em] text-black/70">
        {children}
      </div>
    </blockquote>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-12 mb-4 block text-[20px] font-medium tracking-[-0.02em] text-black/85">
      {children}
    </span>
  );
}

export function Callout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-8 rounded-2xl border border-black/10 bg-white/60 p-5">
      {title ? (
        <div className="text-[12px] tracking-[0.18em] uppercase text-black/55">
          {title}
        </div>
      ) : null}

      <div className="mt-3 text-[15px] leading-[1.8] text-black/80">
        {children}
      </div>
    </div>
  );
}

export function Divider() {
  return <div className="my-10 h-px w-full bg-black/10" />;
}

export function Figure({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  return (
    <figure className="my-10">
      <img
        src={src}
        alt={caption ?? ""}
        className="w-full border border-black/10 bg-white/40"
      />

      {caption ? (
        <figcaption className="mt-3 text-[12px] leading-[1.6] text-black/55">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export { Spoiler };