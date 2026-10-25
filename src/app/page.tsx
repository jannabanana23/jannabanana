import Link from "next/link";
import { Frame } from "@/components/Frame";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <main>
      <section className="cover" aria-labelledby="cover-title">
        <div className="cover__block" aria-hidden="true" />
        <div className="cover__text">
          <h1 id="cover-title" className="cover__title">Portfolio</h1>
          <hr className="cover__rule" />
          <p className="cover__name">{profile.name}</p>
          <p className="cover__span">{profile.span}</p>
        </div>
        <Frame
          className="cover__drawing"
          label="Line elevation of the Malolos Arts High School"
          src={profile.coverDrawing}
          ratio={6}
          caption={false}
          priority
          sizes="100vw"
        />
      </section>

      <section id="about" className="split" aria-labelledby="about-title">
        <div className="split__plain">
          <h2 id="about-title" className="display">About</h2>
        </div>
        <div className="split__tinted about">
          <Frame className="about__portrait" label={`Portrait of ${profile.name}`} src={profile.portrait} ratio={4 / 5} caption={false} sizes="320px" />
          <h3 className="about__name">{profile.name}</h3>
          <p className="about__text">{profile.about}</p>
        </div>
      </section>

      <section className="split split--cv" aria-label="Curriculum vitae">
        <div className="split__tinted cv">
          <h2 className="cv__heading">Education</h2>
          <ol className="cv__list">
            {profile.education.map((e) => (
              <li key={e.school}>
                <p className="cv__meta"><strong>{e.years}</strong><span>{e.place}</span></p>
                <p className="cv__org">{e.school}</p>
                <p>{e.detail}</p>
              </li>
            ))}
          </ol>
          <h2 className="cv__heading">Experience</h2>
          <ol className="cv__list">
            {profile.experience.map((x) => (
              <li key={x.org}>
                <p className="cv__meta"><span>{x.when}</span></p>
                <p className="cv__org">{x.org}</p>
                <p className="cv__role">{x.role}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="split__plain cv">
          <h2 className="cv__heading">Language proficiency</h2>
          <p>{profile.languages.join(" and ")}</p>
          <h2 className="cv__heading">Software skills</h2>
          <ul className="cv__software">
            {profile.software.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <h2 className="cv__heading">Hobbies</h2>
          <ul className="cv__hobbies">
            {profile.hobbies.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
      </section>

      <section id="works" className="works" aria-labelledby="works-title">
        <h2 id="works-title" className="display">Content</h2>
        <ol className="works__grid">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="works__item">
                <Frame label={p.cover.label} src={p.cover.src} ratio={1} caption={false} sizes="(max-width: 760px) 100vw, 25vw" />
                <span className="works__number" aria-hidden="true">{p.number}</span>
                <span className="works__title">{p.title}</span>
                <span className="works__meta">{p.category}, {p.location}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <h2 id="contact-title" className="display">Thank you!</h2>
        <p className="contact__lead">Contact me here:</p>
        <ul className="contact__list">
          <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
          <li><a href={`tel:${profile.phoneHref}`}>{profile.phone}</a></li>
        </ul>
      </section>
    </main>
  );
}
