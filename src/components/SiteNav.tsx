"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavProject = { slug: string; number: string; title: string };

const LINKS = [
  { id: "works", label: "Works" },
  { id: "about", label: "About" },
  { id: "cv", label: "CV" },
  { id: "contact", label: "Contact" },
];

// A title-strip nav: solid cells, so it stays readable over any section.
export function SiteNav({ name, initials, projects }: { name: string; initials: string; projects: NavProject[] }) {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const project = projects.find((p) => pathname === `/projects/${p.slug}`);

  // On the home page, mark the section currently in the middle of the screen.
  useEffect(() => {
    setActive(null);
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
          else setActive((current) => (current === entry.target.id ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of LINKS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="nav">
      <div className="nav__bar">
        <Link href="/" className="nav__cell nav__brand" aria-label={`${name}, home`}>
          <span className="bubble" aria-hidden="true">{initials}</span>
          <span className="nav__name">{name}</span>
        </Link>
        {project && (
          <span className="nav__cell nav__context">
            <span className="bubble bubble--sm" aria-hidden="true">{project.number}</span>
            <span className="nav__context-title">{project.title}</span>
          </span>
        )}
        <nav className="nav__links" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.id} href={`/#${l.id}`} className="nav__cell nav__link" aria-current={active === l.id ? "true" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <span className="nav__progress" aria-hidden="true" />
      </div>
    </header>
  );
}
