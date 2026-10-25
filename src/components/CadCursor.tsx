"use client";

import { useEffect, useRef } from "react";

// An AutoCAD-style crosshair for the parent section: full-width hairlines, a
// pick box and a live coordinate readout. Mouse only; hidden over the form.
export function CadCursor() {
  const root = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const section = el?.parentElement;
    if (!el || !section || !window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const overForm = (e.target as Element).closest("[data-cad-ignore]") !== null;
      el.dataset.active = overForm ? "false" : "true";
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
      // origin at the bottom-left, like model space
      if (readout.current) readout.current.textContent = `X ${Math.round(x * 10)}   Y ${Math.round((rect.height - y) * 10)}`;
    };
    const leave = () => {
      el.dataset.active = "false";
    };

    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    section.dataset.cad = "on";
    return () => {
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
      delete section.dataset.cad;
    };
  }, []);

  return (
    <div ref={root} className="cad" data-active="false" aria-hidden="true">
      <span className="cad__h" />
      <span className="cad__v" />
      <span className="cad__box" />
      <span ref={readout} className="cad__readout" />
    </div>
  );
}
