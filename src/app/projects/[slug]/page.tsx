import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Frame } from "@/components/Frame";
import { getProject, projects, type Section } from "@/content/projects";

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

  const index = projects.indexOf(project);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <main>
      <section className="project-hero" aria-labelledby="project-title">
        <div className="project-hero__panel">
          <span className="project-hero__number" aria-hidden="true">{project.number}</span>
          <div className="project-hero__meta">
            <h1 id="project-title" className="project-hero__title">{project.title}</h1>
            <p>{project.category}</p>
            <p>{project.location}</p>
            <p>{project.context}</p>
            <p>{project.year}</p>
          </div>
          <p className="project-hero__tools">{project.tools.join(", ")}</p>
        </div>
        <Frame
          className="project-hero__image"
          label={project.cover.label}
          src={project.cover.src}
          ratio={project.cover.ratio}
          fill
          caption={false}
          priority
          sizes="(max-width: 760px) 100vw, 60vw"
        />
      </section>

      {project.sections.map((section) => (
        <ProjectSection key={section.title} section={section} />
      ))}

      <nav className="project-nav" aria-label="More projects">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="project-nav__link">
            <span className="project-nav__hint">Previous</span>
            {prev.number} {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="project-nav__link project-nav__link--next">
            <span className="project-nav__hint">Next</span>
            {next.number} {next.title}
          </Link>
        ) : (
          <Link href="/#works" className="project-nav__link project-nav__link--next">
            <span className="project-nav__hint">Back to</span>
            All projects
          </Link>
        )}
      </nav>
    </main>
  );
}

function ProjectSection({ section }: { section: Section }) {
  return (
    <section className={`project-section project-section--${section.kind}`}>
      <h2 className="project-section__title">{section.title}</h2>
      {section.kind === "text" && (
        <div className="prose">{section.body.map((p) => <p key={p}>{p}</p>)}</div>
      )}
      {section.kind === "list" && (
        <ul className="considerations">{section.items.map((i) => <li key={i}>{i}</li>)}</ul>
      )}
      {section.kind === "gallery" && (
        <>
          {section.body && <div className="prose">{section.body.map((p) => <p key={p}>{p}</p>)}</div>}
          <div className={`gallery gallery--${section.columns}`}>
            {section.shots.map((shot) => (
              <Frame
                key={shot.label}
                label={shot.label}
                src={shot.src}
                ratio={shot.ratio}
                sizes={section.columns === 1 ? "100vw" : `(max-width: 760px) 100vw, ${Math.round(100 / section.columns)}vw`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
