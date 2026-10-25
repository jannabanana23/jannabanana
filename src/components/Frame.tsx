import Image from "next/image";

type FrameProps = {
  label: string;
  src?: string;
  /** width / height */
  ratio?: number;
  /** stretch to the parent's height instead of keeping `ratio` */
  fill?: boolean;
  caption?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

// Shows the image when `src` is set, otherwise a drafting-style placeholder:
// the boxed X architects use for an element that is yet to be detailed.
export function Frame({
  label,
  src,
  ratio = 3 / 2,
  fill,
  caption = true,
  priority,
  sizes = "(max-width: 760px) 100vw, 50vw",
  className,
}: FrameProps) {
  return (
    <figure className={["frame", fill && "frame--fill", className].filter(Boolean).join(" ")}>
      <div className="frame__box" style={fill ? undefined : { aspectRatio: ratio }}>
        {src ? (
          <Image src={src} alt={label} fill sizes={sizes} priority={priority} />
        ) : (
          <div className="frame__placeholder" role="img" aria-label={`Placeholder: ${label}`}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0" y1="0" x2="100" y2="100" vectorEffect="non-scaling-stroke" />
              <line x1="100" y1="0" x2="0" y2="100" vectorEffect="non-scaling-stroke" />
            </svg>
            <span>Image to follow</span>
          </div>
        )}
      </div>
      {caption && <figcaption className="frame__caption">{label}</figcaption>}
    </figure>
  );
}
