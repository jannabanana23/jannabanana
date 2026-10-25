import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Drawings } from "@/components/Drawings";
import { Gallery } from "@/components/Gallery";
import { LayoutSwitch } from "@/components/LayoutSwitch";
import { PlanSet } from "@/components/PlanSet";
import { SheetNav } from "@/components/SheetNav";
import { getProject, projects, sheetLetter, type Section } from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <main id="main">
      <section className="phero" aria-labelledby="project-title">
        <div className="phero__panel">
          <span className="phero__number" aria-hidden="true">{project.number.padStart(2, "0")}</span>
          <div className="phero__meta">
            <h1 id="project-title" className="phero__title">{project.title}</h1>
            <dl className="phero__facts">
              <div><dt>Type</dt><dd>{project.category}</dd></div>
              <div><dt>Location</dt><dd>{project.location}</dd></div>
              <div><dt>Context</dt><dd>{project.context}</dd></div>
              <div><dt>Year</dt><dd>{project.year}</dd></div>
              <div><dt>Tools</dt><dd>{project.tools.join(", ")}</dd></div>
            </dl>
          </div>
        </div>
        <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
          <div className="phero__image">
            <Image src={project.cover.src} alt={project.cover.alt} fill priority sizes="(max-width: 900px) 100vw, 58vw" />
          </div>
        </ViewTransition>
      </section>

      <p className="phero__summary">{project.summary}</p>

      <div className="sheets">
        <SheetNav items={project.sections.map(({ id, title }) => ({ id, title }))} />
        <div className="sheets__body">
          {project.sections.map((section, i) => (
            <ProjectSection key={section.id} section={section} letter={sheetLetter(i)} />
          ))}
        </div>
      </div>

      <Link href={`/projects/${next.slug}`} className="next-project">
        <span className="next-project__label">Next project</span>
        <span className="next-project__title">
          <span className="bubble" aria-hidden="true">{next.number}</span>
          {next.title}
        </span>
        <ViewTransition name={`cover-${next.slug}`} share="morph" default="none">
          <span className="next-project__image">
            <Image src={next.thumb.src} alt="" fill sizes="(max-width: 760px) 100vw, 40vw" />
          </span>
        </ViewTransition>
      </Link>
    </main>
  );
}

function ProjectSection({ section, letter }: { section: Section; letter: string }) {
  return (
    <section id={section.id} className={`sheet sheet--${section.kind}`} aria-labelledby={`${section.id}-title`}>
      <h2 id={`${section.id}-title`} className="sheet__title">
        <span className="bubble" aria-hidden="true">{letter}</span>
        {section.title}
      </h2>

      {section.kind === "concept" ? (
        <div className="concept">
          <div className="concept__text">
            <Image src={section.seed.src} alt={section.seed.alt} width={section.seed.width} height={section.seed.height} sizes="320px" className="concept__seed" />
            {section.body?.map((p) => <p key={p}>{p}</p>)}
          </div>
          <figure className="concept__diagram">
            <Image src={section.diagram.src} alt={section.diagram.alt} width={section.diagram.width} height={section.diagram.height} sizes="(max-width: 900px) 100vw, 35vw" />
          </figure>
        </div>
      ) : (
        section.body && (
          <div className="prose">
            {section.body.map((p) => <p key={p}>{p}</p>)}
          </div>
        )
      )}

      {section.kind === "text" && section.figure && (
        <figure className="sheet__figure">
          <Image src={section.figure.src} alt={section.figure.alt} width={section.figure.width} height={section.figure.height} sizes="(max-width: 1000px) 100vw, 75vw" />
          <figcaption>{section.figure.alt}</figcaption>
        </figure>
      )}
      {section.kind === "plans" && <PlanSet sheets={section.sheets} />}
      {section.kind === "drawings" && <Drawings images={section.images} />}
      {section.kind === "gallery" && <Gallery images={section.images} />}
      {section.kind === "switch" && <LayoutSwitch options={section.options} />}
    </section>
  );
}
