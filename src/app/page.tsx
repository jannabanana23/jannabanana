import Image from "next/image";
import Link from "next/link";
import { CadCursor } from "@/components/CadCursor";
import { CopyEmail } from "@/components/CopyEmail";
import { HobbyPlan } from "@/components/HobbyPlan";
import { RfiForm } from "@/components/RfiForm";
import { Timeline } from "@/components/Timeline";
import { WorksBays } from "@/components/WorksBays";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export default function Home() {
  const works = projects.map(({ slug, number, title, category, location, year, context, cover }) => ({
    slug, number, title, category, location, year, context, cover,
  }));

  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        {/* Structural grid: one line per project, bubbles jump to that sheet. */}
        <nav className="hero__grid" aria-label="Projects">
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="hero__gridline">
              <span className="bubble">{p.number}</span>
              <span className="hero__gridlabel">{p.title}</span>
            </Link>
          ))}
        </nav>

        <div className="hero__text">
          <h1 id="hero-title" className="hero__title" aria-label="Portfolio">
            {"PORTFOLIO".split("").map((ch, i) => (
              <span key={i} style={{ "--i": i } as React.CSSProperties} aria-hidden="true">
                {ch}
              </span>
            ))}
          </h1>
          <hr className="hero__rule" />
          <p className="hero__name">{profile.name}</p>
          <p className="hero__span">{profile.span}</p>
        </div>

        <div className="hero__drawing">
          <Image
            src={profile.coverDrawing.src}
            alt={profile.coverDrawing.alt}
            width={profile.coverDrawing.width}
            height={profile.coverDrawing.height}
            sizes="100vw"
            priority
          />
          <span className="hero__plotter" aria-hidden="true" />
        </div>
      </section>

      <section id="about" className="intro" aria-labelledby="about-title">
        <h2 id="about-title" className="sr-only">About</h2>
        <p className="intro__statement">{profile.statement}</p>
        <figure className="intro__portrait">
          <Image src={profile.portrait.src} alt={profile.portrait.alt} width={profile.portrait.width} height={profile.portrait.height} sizes="(max-width: 760px) 80vw, 30vw" />
        </figure>
        <div className="intro__body">
          {profile.about.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section id="works" className="works" aria-labelledby="works-title">
        <header className="works__head">
          <h2 id="works-title" className="works__title">Selected works</h2>
          <p className="works__count">{projects.length} projects, 2024 to 2026</p>
        </header>
        <WorksBays works={works} />
      </section>

      <section id="cv" className="vitae" aria-labelledby="cv-title">
        <header className="vitae__head">
          <h2 id="cv-title" className="vitae__title">Curriculum vitae</h2>
          <p className="vitae__note">Education and experience, dimensioned like a drawing.</p>
        </header>

        <Timeline />
        <p className="tl-hint">Swipe sideways to see the whole timeline.</p>

        <div className="vitae__extras">
          <div>
            <h3 className="vitae__sub">Software and languages</h3>
            <table className="schedule">
              <tbody>
                {profile.software.map((g) => (
                  <tr key={g.group}>
                    <th scope="row">{g.group}</th>
                    <td>
                      <ul className="chips">
                        {g.items.map((s) => <li key={s}>{s}</li>)}
                      </ul>
                    </td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">Languages</th>
                  <td>
                    <ul className="chips">
                      {profile.languages.map((l) => <li key={l}>{l}</li>)}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="vitae__sub">Outside the studio</h3>
            <HobbyPlan />
          </div>
        </div>
      </section>

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <CadCursor />
        <div className="contact__grid">
          <div className="contact__intro">
            <h2 id="contact-title" className="contact__title">Thank you!</h2>
            <p className="contact__lead">Contact me here</p>
            <CopyEmail email={profile.email} />
            <a href={`tel:${profile.phoneHref}`} className="contact__phone">{profile.phone}</a>
          </div>
          <RfiForm email={profile.email} />
        </div>

        <footer className="titlestrip">
          <div className="titlestrip__cell">
            <span className="titlestrip__label">Project</span>
            Portfolio, {profile.span.toLowerCase()}
          </div>
          <div className="titlestrip__cell">
            <span className="titlestrip__label">Drawn by</span>
            {profile.name}
          </div>
          <div className="titlestrip__cell titlestrip__cell--graphic" aria-hidden="true">
            <svg className="scalebar" viewBox="0 0 104 18">
              <rect x="2" y="2" width="20" height="5" fill="currentColor" />
              <rect x="22" y="2" width="20" height="5" fill="none" stroke="currentColor" />
              <rect x="42" y="2" width="20" height="5" fill="currentColor" />
              <rect x="62" y="2" width="40" height="5" fill="none" stroke="currentColor" />
              <text x="2" y="16">0</text>
              <text x="40" y="16">1</text>
              <text x="92" y="16">2m</text>
            </svg>
            <svg className="north" viewBox="0 -6 24 36">
              <circle cx="12" cy="16" r="10" fill="none" stroke="currentColor" />
              <path d="M12 4l5 18-5-4-5 4z" fill="currentColor" />
              <text x="12" y="3" textAnchor="middle">N</text>
            </svg>
          </div>
          <div className="titlestrip__cell">
            <span className="titlestrip__label">Date</span>
            &copy; {new Date().getFullYear()}
          </div>
          <a href="#main" className="titlestrip__cell titlestrip__top">
            <span className="titlestrip__label">Sheet</span>
            Back to top
          </a>
        </footer>
      </section>
    </main>
  );
}
