import type { ReactNode } from "react";
import { Spoiler } from "./Spoiler";

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-[3px] border-[#c2552e] pl-5">
      <div className="text-[19px] font-semibold leading-[1.5] tracking-[-0.02em] text-[#16140f]">
        {children}
      </div>
    </blockquote>
  );
}

export function QuestionBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-lg border-[1.5px] border-[#16140f] bg-[#16140f]/[0.03] px-5 py-5">
      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c2552e]">
        Questions
      </div>

      <div className="space-y-2 text-[15px] leading-[1.8] text-[#16140f]/80">
        {children}
      </div>
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-12 mb-4 block text-[20px] font-bold tracking-[-0.03em] text-[#16140f]">
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
    <div className="my-8 rounded-lg border-[1.5px] border-[#16140f] bg-[#fdfcfa] p-5">
      {title ? (
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c2552e]">
          {title}
        </div>
      ) : null}

      <div className="mt-3 text-[15px] leading-[1.8] text-[#16140f]/85">
        {children}
      </div>
    </div>
  );
}

export function Divider() {
  return <div className="my-10 h-[2px] w-full bg-[#16140f]" />;
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
        className="w-full border-[1.5px] border-[#16140f]"
      />

      {caption ? (
        <figcaption className="mt-3 text-[12px] leading-[1.6] text-[#16140f]/55">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export { Spoiler };

export const a = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>
) => {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[#c2552e] underline underline-offset-4 transition hover:opacity-70"
    >
      {props.children}
      <span className="text-[11px]">↗</span>
    </a>
  );
};
