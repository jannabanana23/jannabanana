import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/projects";

type Work = Pick<Project, "slug" | "number" | "title" | "category" | "location" | "year" | "context" | "cover">;

// Four structural bays, one per project. Hovering or focusing a bay opens it to
// full colour; the rest close down to greyscale strips. Each image carries a
// fixed transition name so it morphs into the project hero on click.
export function WorksBays({ works }: { works: Work[] }) {
  return (
    <ol className="bays">
      {works.map((w) => (
        <li key={w.slug} className="bay">
          <Link href={`/projects/${w.slug}`} className="bay__link" aria-label={`${w.title}, ${w.category}, ${w.location}, ${w.year}`}>
            <ViewTransition name={`cover-${w.slug}`} share="morph" default="none">
              <span className="bay__media">
                <Image src={w.cover.src} alt="" fill sizes="(max-width: 760px) 100vw, 60vw" />
              </span>
            </ViewTransition>

            <span className="bay__bubble bubble" aria-hidden="true">{w.number}</span>
            <span className="bay__spine" aria-hidden="true">{w.title}</span>

            <span className="bay__card" aria-hidden="true">
              <span className="bay__number">{w.number.padStart(2, "0")}</span>
              <span className="bay__text">
                <span className="bay__title">{w.title}</span>
                <span className="bay__meta">
                  {w.category}, {w.location}
                  <br />
                  {w.context}, {w.year}
                </span>
                <span className="bay__cta">View project</span>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
