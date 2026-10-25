"use client";

import { useEffect, useState } from "react";
import { sheetLetter } from "@/content/projects";

type Item = { id: string; title: string };

// Sticky sheet index for a project page. Highlights the section in view.
export function SheetNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // a section counts as current once it crosses the upper third of the screen
      { rootMargin: "-30% 0px -65% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="sheetnav" aria-label="Sheets in this project">
      <ol>
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="sheetnav__link" aria-current={item.id === active ? "location" : undefined}>
              <span className="bubble bubble--sm" aria-hidden="true">
                {sheetLetter(i)}
              </span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
