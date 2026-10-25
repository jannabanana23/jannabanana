// All project content lives here. To replace a placeholder with a real image,
// drop the file into /public/images/<project-slug>/ and set `src` on that item,
// e.g. { label: "Front view", src: "/images/arts-high-school/front.jpg" }.

export type Shot = {
  label: string;
  src?: string;
  /** width / height, defaults to 3 / 2 */
  ratio?: number;
};

export type Section =
  | { kind: "text"; title: string; body: string[] }
  | { kind: "gallery"; title: string; columns: 1 | 2 | 3; shots: Shot[]; body?: string[] }
  | { kind: "list"; title: string; items: string[] };

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  location: string;
  context: string;
  year: number;
  tools: string[];
  summary: string;
  cover: Shot;
  sections: Section[];
};

const SHEET = 297 / 210; // A4 landscape drawing sheet

export const projects: Project[] = [
  {
    slug: "arts-high-school",
    number: "01",
    title: "Arts High School",
    category: "Public school",
    location: "Malolos City, Bulacan",
    context: "Thesis project",
    year: 2025,
    tools: ["AutoCAD", "SketchUp", "D5 Render"],
    summary:
      "The Malolos Arts High School is envisioned as a specialized learning institution designed to address the educational and creative needs of students pursuing arts-focused programs in the City of Malolos.",
    cover: { label: "Front perspective, main entrance", ratio: 4 / 3 },
    sections: [
      {
        kind: "text",
        title: "Overview",
        body: [
          "The Malolos Arts High School is envisioned as a specialized learning institution designed to address the educational and creative needs of students pursuing arts-focused programs in the City of Malolos. It aims to serve junior high school students enrolled in the Special Program for the Arts (SPA) and senior high school students taking the Arts and Design Track, providing them with an environment that nurtures artistic excellence, creativity, and holistic development.",
          "The project responds to the growing number of students demonstrating interest and potential in various forms of art, while addressing the need for dedicated facilities and learning spaces that support specialized arts education within the public school system.",
        ],
      },
      {
        kind: "gallery",
        title: "Floor plans",
        columns: 2,
        shots: [
          { label: "Ground floor plan", ratio: SHEET },
          { label: "2nd floor plan", ratio: SHEET },
          { label: "3rd floor plan", ratio: SHEET },
          { label: "4th floor plan", ratio: SHEET },
        ],
      },
      {
        kind: "gallery",
        title: "Design concept",
        columns: 2,
        body: [
          "The design is inspired by the seed of the Siar Tree, famously known as the “Kalayaan Tree” of Malolos City, an emblem of freedom where revolutionaries once gathered and the First Philippine Republic was established.",
          "Just as the tree symbolizes the nation’s struggle for independence, its seed reflects the growth of young, aspiring artists. Through this concept, the school becomes a place where students are free to nurture their creativity and express themselves through diverse forms of art, continuing the legacy of freedom.",
        ],
        shots: [
          { label: "Siar seed concept", ratio: 1 },
          { label: "Zoning and interrelationship diagram", ratio: 1 },
        ],
      },
      {
        kind: "gallery",
        title: "Diagrams",
        columns: 3,
        shots: [
          { label: "Circulation diagram", ratio: 1 },
          { label: "Light, ventilation, acoustic and security solution", ratio: 1 },
          { label: "Form evolution", ratio: 1 },
        ],
      },
      {
        kind: "list",
        title: "Design considerations",
        items: [
          "Design flexibility",
          "Healthy indoor environment",
          "Security",
          "Accessibility",
          "Learning flexibility",
          "Inclusive",
          "Engaging design",
          "Sustainable design",
          "Community access",
        ],
      },
      {
        kind: "gallery",
        title: "Perspectives",
        columns: 3,
        shots: [
          { label: "Drawing studio" },
          { label: "Workshop studio" },
          { label: "Creative writing studio" },
          { label: "Wind instruments studio" },
          { label: "Percussion studio" },
          { label: "Stringed instruments studio" },
          { label: "Courtyard" },
          { label: "Rooftop garden" },
          { label: "Library" },
          { label: "Technical room (voice studio)" },
          { label: "Voice studio" },
          { label: "Canteen" },
          { label: "Administrative office" },
          { label: "Dance studio" },
          { label: "Media studio" },
          { label: "Student lounge" },
          { label: "Multi-purpose gym / performance hall" },
        ],
      },
    ],
  },
  {
    slug: "bungalow-house",
    number: "02",
    title: "Bungalow House",
    category: "Residential",
    location: "Nueva Ecija",
    context: "Freelance project",
    year: 2026,
    tools: ["AutoCAD", "SketchUp", "D5 Render"],
    summary:
      "A three-bedroom bungalow designed around practical space planning, comfortable living and a spacious backyard.",
    cover: { label: "Front exterior render", ratio: 4 / 3 },
    sections: [
      {
        kind: "text",
        title: "Overview",
        body: [
          "This three-bedroom bungalow residence was designed to meet the needs of a simple family through practical space planning, comfortable living environments, and a spacious backyard that enhances the connection between indoor and outdoor living.",
        ],
      },
      {
        kind: "gallery",
        title: "Plans and elevations",
        columns: 2,
        shots: [
          { label: "Floor plan", ratio: SHEET },
          { label: "Front elevation", ratio: SHEET },
          { label: "Rear elevation", ratio: SHEET },
          { label: "Left elevation", ratio: SHEET },
          { label: "Right elevation", ratio: SHEET },
        ],
      },
      {
        kind: "gallery",
        title: "Renders",
        columns: 2,
        shots: [{ label: "Exterior view" }, { label: "Backyard view" }],
      },
    ],
  },
  {
    slug: "composite-building",
    number: "03",
    title: "Composite Building",
    category: "Residential",
    location: "Nueva Ecija",
    context: "Freelance project",
    year: 2025,
    tools: ["AutoCAD", "SketchUp", "D5 Render"],
    summary:
      "An affordable two-storey residential building that keeps comfort, function and the essentials of daily life intact.",
    cover: { label: "Exterior render", ratio: 4 / 3 },
    sections: [
      {
        kind: "text",
        title: "Overview",
        body: [
          "This composite residential building was designed to provide an affordable housing solution without compromising the comfort, functionality, and essential needs of its future occupants.",
          "The design emphasizes efficient space planning, practical living areas, and cost-effective construction strategies to create a comfortable and sustainable living environment.",
        ],
      },
      {
        kind: "gallery",
        title: "Elevations",
        columns: 2,
        shots: [
          { label: "Front elevation", ratio: SHEET },
          { label: "Rear elevation", ratio: SHEET },
          { label: "Left side elevation", ratio: SHEET },
          { label: "Right side elevation", ratio: SHEET },
        ],
      },
      {
        kind: "gallery",
        title: "Floor plans",
        columns: 2,
        shots: [
          { label: "Ground floor plan", ratio: SHEET },
          { label: "Second floor plan", ratio: SHEET },
          { label: "Attic floor plan", ratio: SHEET },
          { label: "Roof plan", ratio: SHEET },
        ],
      },
    ],
  },
  {
    slug: "zenso-hotel-resort",
    number: "04",
    title: "Zenso Hotel & Resort",
    category: "Commercial",
    location: "Baler, Aurora",
    context: "Architectural plate",
    year: 2024,
    tools: ["AutoCAD", "SketchUp", "Enscape"],
    summary:
      "A destination for leisure, wellness and relaxation, with a spa, restaurant, fitness center and recreational spaces.",
    cover: { label: "Resort exterior render", ratio: 4 / 3 },
    sections: [
      {
        kind: "text",
        title: "Overview",
        body: [
          "ZENSO hotel and resort is envisioned as a destination for leisure, wellness, and relaxation. Designed to offer a comprehensive staycation experience, the development integrates comfortable accommodations with a range of amenities, including a spa, restaurant, fitness center, and recreational spaces.",
          "Through thoughtful planning and a guest-centered approach, the project fosters an atmosphere that encourages rest, rejuvenation, and overall well-being.",
        ],
      },
      {
        kind: "gallery",
        title: "Site development plan",
        columns: 1,
        shots: [{ label: "Site development plan, infinity pool, koi pond and parking", ratio: SHEET }],
      },
      {
        kind: "gallery",
        title: "Floor plans and elevations",
        columns: 2,
        shots: [
          { label: "Ground floor plan", ratio: SHEET },
          { label: "Second floor plan", ratio: SHEET },
          { label: "3rd–4th floor plan", ratio: SHEET },
          { label: "Front and rear elevations", ratio: SHEET },
        ],
      },
      {
        kind: "gallery",
        title: "Perspectives",
        columns: 2,
        shots: [
          { label: "Lobby, left side" },
          { label: "Lobby, right side" },
          { label: "Restaurant" },
          { label: "Outdoor facilities" },
          { label: "Deluxe suite" },
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
