import { profile } from "@/content/profile";

// Education and experience as dimension strings along a year axis. The twelve
// years before 2018 are squeezed behind a break line ("not to scale") so the
// busy recent years get the room.
const START = 2006;
const BREAK = 2018;
const END = 2027;
const SQUEEZED = 14; // % of the axis given to 2006–2018

const x = (year: number) =>
  year <= BREAK
    ? ((year - START) / (BREAK - START)) * SQUEEZED
    : SQUEEZED + ((year - BREAK) / (END - BREAK)) * (100 - SQUEEZED);

const pct = (n: number) => `${n.toFixed(2)}%`;
const TICKS = [2006, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

export function Timeline() {
  return (
    <>
      <TimelineAxis />
      <TimelineList />
    </>
  );
}

// Phones: the same entries as a vertical dimension line, newest first.
function TimelineList() {
  const groups = [
    {
      label: "Education",
      items: profile.education.map((e) => ({ when: `${e.from}–${e.to}`, name: e.school, detail: e.detail, sort: e.to })),
    },
    {
      label: "Experience",
      items: profile.experience.map((w) => ({ when: w.when, name: w.org, detail: w.role, sort: w.end ?? w.start })),
    },
  ];
  return (
    <div className="tl-list">
      {groups.map((g) => (
        <div key={g.label} className="tl-list__group">
          <h3 className="tl__lane-label">{g.label}</h3>
          <ol>
            {[...g.items].sort((a, b) => b.sort - a.sort).map((item) => (
              <li key={item.name}>
                <span className="dim__when">{item.when}</span>
                <span className="dim__name">{item.name}</span>
                <span className="dim__detail">{item.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

function TimelineAxis() {
  return (
    <div className="tl-scroll" tabIndex={0} aria-label="Timeline of education and experience">
      <div className="tl">
        <h3 className="tl__lane-label">Education</h3>
        <ol className="tl__track tl__track--edu">
          {profile.education.map((e) => (
            <li key={e.school} className="dim" style={{ left: pct(x(e.from)), width: pct(x(e.to) - x(e.from)) }}>
              <span className="dim__label">
                <span className="dim__when">{`${e.from}–${e.to}`}</span>
                <span className="dim__name">{e.school}</span>
                <span className="dim__detail">{e.detail}</span>
              </span>
              <span className="dim__line" aria-hidden="true" />
            </li>
          ))}
        </ol>

        <span aria-hidden="true" />
        <div className="tl__axis" aria-hidden="true">
          {TICKS.map((t) => (
            <span key={t} className="tl__tick" style={{ left: pct(x(t)) }}>
              {t}
            </span>
          ))}
          <span className="tl__break" style={{ left: pct(SQUEEZED / 2) }}>
            <svg viewBox="0 0 24 24">
              <path d="M2 12h7l2-7 2 14 2-7h7" />
            </svg>
            <span>not to scale</span>
          </span>
        </div>

        <h3 className="tl__lane-label">Experience</h3>
        <ol className="tl__track tl__track--work">
          {profile.experience.map((w) => {
            const left = x(w.start);
            const width = w.end ? x(w.end) - left : 0;
            // late entries hang their label to the left so it stays inside the axis
            const flip = left > 62 && !w.ongoing;
            return (
              <li key={w.org} className="tl__row">
                <span
                  className={`dim dim--work${width ? "" : " dim--point"}${w.ongoing ? " dim--ongoing" : ""}${flip ? " dim--flip" : ""}`}
                  style={{ left: pct(left), width: pct(width) }}
                >
                  <span className="dim__line" aria-hidden="true" />
                  <span className="dim__label">
                    <span className="dim__when">{w.when}</span>
                    <span className="dim__name">{w.org}</span>
                    <span className="dim__detail">{w.role}</span>
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
