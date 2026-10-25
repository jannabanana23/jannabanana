"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Media } from "@/content/media";

type LightboxProps = {
  items: Media[];
  index: number | null;
  onIndex: (index: number | null) => void;
  /** drawings: allow zooming in to read the linework */
  zoomable?: boolean;
};

const MAX_ZOOM = 4;

export function Lightbox({ items, index, onIndex, zoomable }: LightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [index]);

  const step = useCallback(
    (dir: number) => {
      if (index === null) return;
      onIndex((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
    if (zoomable && (e.key === "+" || e.key === "=")) setZoom((z) => Math.min(MAX_ZOOM, z * 1.5));
    if (zoomable && e.key === "-") setZoom((z) => Math.max(1, z / 1.5));
  };

  const zoomAt = (next: number, clientX: number, clientY: number, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    // keep the point under the cursor fixed while scaling
    const cx = clientX - rect.left - rect.width / 2;
    const cy = clientY - rect.top - rect.height / 2;
    const clamped = Math.min(MAX_ZOOM, Math.max(1, next));
    const ratio = clamped / zoom;
    setPan((p) => (clamped === 1 ? { x: 0, y: 0 } : { x: cx - (cx - p.x) * ratio, y: cy - (cy - p.y) * ratio }));
    setZoom(clamped);
  };

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={item?.alt ?? "Image viewer"}
      onClose={() => onIndex(null)}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && onIndex(null)}
    >
      {item && (
        <>
          <div
            className={`lightbox__stage${zoomable ? " is-zoomable" : ""}${zoom > 1 ? " is-zoomed" : ""}`}
            onWheel={zoomable ? (e) => zoomAt(zoom * (e.deltaY < 0 ? 1.2 : 1 / 1.2), e.clientX, e.clientY, e.currentTarget) : undefined}
            onPointerDown={(e) => {
              if (!zoomable) return;
              drag.current = { x: e.clientX - pan.x, y: e.clientY - pan.y, moved: false };
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (!drag.current || zoom === 1) return;
              drag.current.moved = true;
              setPan({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y });
            }}
            onPointerUp={(e) => {
              const wasDrag = drag.current?.moved;
              drag.current = null;
              if (zoomable && !wasDrag) zoomAt(zoom > 1 ? 1 : 2.5, e.clientX, e.clientY, e.currentTarget);
            }}
          >
            <div className="lightbox__img" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
              <Image key={item.src} src={item.src} alt={item.alt} fill sizes="100vw" quality={90} />
            </div>
          </div>

          <div className="lightbox__bar">
            <p className="lightbox__caption">
              <span className="lightbox__count">
                {index! + 1}/{items.length}
              </span>
              {item.alt}
            </p>
            <div className="lightbox__actions">
              {zoomable && (
                <span className="lightbox__hint">{zoom > 1 ? "Drag to move, click to reset" : "Click or scroll to zoom"}</span>
              )}
              {items.length > 1 && (
                <>
                  <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Previous image">
                    <Arrow dir="left" />
                  </button>
                  <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Next image">
                    <Arrow dir="right" />
                  </button>
                </>
              )}
              <button type="button" className="icon-btn" onClick={() => onIndex(null)} aria-label="Close viewer" autoFocus>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={dir === "left" ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}
