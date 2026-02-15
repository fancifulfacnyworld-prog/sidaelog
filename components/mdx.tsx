export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 border-l-2 border-black/20 pl-5">
      <p className="text-[22px] leading-[1.35] tracking-[-0.02em] text-black/85">
        {children}
      </p>
    </div>
  );
}

export function Callout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
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
      {/* 일반 img로 시작 (next/image는 나중에) */}
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