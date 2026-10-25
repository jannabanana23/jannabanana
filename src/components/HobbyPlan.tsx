import { profile } from "@/content/profile";

// Hobbies drawn as a small house plan: every room is one of them.
export function HobbyPlan() {
  return (
    <figure className="hplan">
      <ul className="hplan__rooms" aria-label="Hobbies">
        {profile.hobbies.map((h) => (
          <li key={h.area} className={`hplan__room hplan__room--${h.area}`}>
            <span className="hplan__door" aria-hidden="true" />
            <span className="hplan__name">{h.room}</span>
            <span className="sr-only">: {h.hobby}</span>
          </li>
        ))}
      </ul>
      <figcaption className="hplan__foot">
        <span>My hobbies, drawn as a floor plan: one room each.</span>
        <span className="hplan__marks" aria-hidden="true">
          <svg className="scalebar" viewBox="0 0 104 18">
            <rect x="2" y="2" width="20" height="5" fill="currentColor" />
            <rect x="22" y="2" width="20" height="5" fill="none" stroke="currentColor" />
            <rect x="42" y="2" width="20" height="5" fill="currentColor" />
            <rect x="62" y="2" width="40" height="5" fill="none" stroke="currentColor" />
            <text x="2" y="16">0</text>
            <text x="40" y="16">2</text>
            <text x="91" y="16">5m</text>
          </svg>
          <svg className="north" viewBox="0 -6 24 36">
            <circle cx="12" cy="16" r="10" fill="none" stroke="currentColor" />
            <path d="M12 4l5 18-5-4-5 4z" fill="currentColor" />
            <text x="12" y="3" textAnchor="middle">N</text>
          </svg>
        </span>
      </figcaption>
    </figure>
  );
}
