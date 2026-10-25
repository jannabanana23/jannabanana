import { media, type Media } from "./media";

// Each project reads like a drawing set: sections are lettered sheets (A, B, C...)
// in the order they appear in the printed portfolio.

export type Sheet = { label: string; image: Media };

export type Section = {
  id: string;
  title: string;
  body?: string[];
} & (
  | { kind: "text"; figure?: Media }
  | { kind: "plans"; sheets: Sheet[] }
  | { kind: "drawings"; images: Media[] }
  | { kind: "gallery"; images: Media[] }
  | { kind: "switch"; options: Sheet[] }
  | { kind: "concept"; seed: Media; diagram: Media }
);

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
  cover: Media;
  thumb: Media;
  sections: Section[];
};

const a = (name: string, alt: string) => media(`arts-high-school/${name}`, alt);
const b = (name: string, alt: string) => media(`bungalow-house/${name}`, alt);
const c = (name: string, alt: string) => media(`composite-building/${name}`, alt);
const z = (name: string, alt: string) => media(`zenso-hotel-resort/${name}`, alt);

const artsCover = a("cover", "Arts High School main entrance with its patterned glass facade");

export const projects: Project[] = [
  {
    slug: "arts-high-school",
    number: "1",
    title: "Arts High School",
    category: "Public school",
    location: "Malolos City, Bulacan",
    context: "Thesis project",
    year: 2025,
    tools: ["AutoCAD", "SketchUp", "D5 Render"],
    summary:
      "A public arts high school for Malolos, with dedicated studios for visual arts, music, dance, media and creative writing.",
    cover: artsCover,
    thumb: artsCover,
    sections: [
      {
        id: "overview",
        kind: "text",
        title: "Overview",
        body: [
          "The Malolos Arts High School is envisioned as a specialized learning institution designed to address the educational and creative needs of students pursuing arts-focused programs in the City of Malolos. It aims to serve junior high school students enrolled in the Special Program for the Arts (SPA) and senior high school students taking the Arts and Design Track, providing them with an environment that nurtures artistic excellence, creativity, and holistic development.",
          "The project responds to the growing number of students demonstrating interest and potential in various forms of art, while addressing the need for dedicated facilities and learning spaces that support specialized arts education within the public school system.",
        ],
        figure: a("aerial", "Aerial view of the school around its central courtyard and solar roof"),
      },
      {
        id: "concept",
        kind: "concept",
        title: "Design concept",
        body: [
          "The design is inspired by the seed of the Siar Tree, famously known as the “Kalayaan Tree” of Malolos City, an emblem of freedom where revolutionaries once gathered and the First Philippine Republic was established.",
          "Just as the tree symbolizes the nation’s struggle for independence, its seed reflects the growth of young, aspiring artists. Through this concept, the school becomes a place where students are free to nurture their creativity and express themselves through diverse forms of art, continuing the legacy of freedom.",
        ],
        seed: a("seed", "Siar seed pod abstracted into a curving line, then into the plan form"),
        diagram: a("zoning", "Zoning and interrelationship diagram of school functions"),
      },
      {
        id: "plans",
        kind: "plans",
        title: "Floor plans",
        sheets: [
          { label: "Ground", image: a("plan-ground", "Ground floor plan") },
          { label: "2nd", image: a("plan-2nd", "Second floor plan") },
          { label: "3rd", image: a("plan-3rd", "Third floor plan") },
          { label: "4th", image: a("plan-4th", "Fourth floor plan") },
        ],
      },
      {
        id: "elevations",
        kind: "drawings",
        title: "Elevations",
        images: [
          a("elevations", "Rendered elevations and sections of all building wings"),
          a("street", "Street elevation along the main gate"),
        ],
      },
      {
        id: "systems",
        kind: "drawings",
        title: "Diagrams",
        body: [
          "Circulation, passive light and ventilation, acoustic detailing and the massing steps that led to the final form.",
        ],
        images: [
          a("circulation", "Exploded circulation diagram showing human and vehicle routes"),
          a("environment", "Light, ventilation, acoustic and security design solution"),
          a("form-evolution", "Form evolution from a single slab to the courtyard block"),
          a("considerations", "Design considerations: healthy indoor environment, security, accessibility, learning flexibility, inclusive, engaging design, sustainable design, community access"),
        ],
      },
      {
        id: "flexibility",
        kind: "switch",
        title: "Design flexibility",
        body: ["One classroom, three arrangements. Movable furniture lets the same room shift between lecture, group work and studio use."],
        options: [
          { label: "Lecture", image: a("flexibility-1", "Grade 7 classroom in lecture arrangement") },
          { label: "Groups", image: a("flexibility-2", "Grade 7 classroom in group arrangement") },
          { label: "Studio", image: a("flexibility-3", "Grade 7 classroom in studio arrangement") },
        ],
      },
      {
        id: "perspectives",
        kind: "gallery",
        title: "Perspectives",
        images: [
          a("main-lobby", "Main lobby"),
          a("drawing-studio", "Drawing studio"),
          a("workshop-studio", "Workshop studio"),
          a("creative-writing-studio", "Creative writing studio"),
          a("wind-instruments-studio", "Wind instruments studio"),
          a("percussion-studio", "Percussion studio"),
          a("stringed-instruments-studio", "Stringed instruments studio"),
          a("dance-studio", "Dance studio"),
          a("media-studio", "Media studio"),
          a("technical-room", "Technical room (voice studio)"),
          a("voice-studio", "Voice studio"),
          a("gym", "Multi-purpose gym and performance hall"),
          a("library", "Library"),
          a("student-lounge", "Student lounge"),
          a("canteen", "Canteen"),
          a("administrative-office", "Administrative office"),
          a("courtyard", "Courtyard"),
          a("rooftop-garden", "Rooftop garden"),
        ],
      },
    ],
  },
  {
    slug: "bungalow-house",
    number: "2",
    title: "Bungalow House",
    category: "Residential",
    location: "Nueva Ecija",
    context: "Freelance project",
    year: 2026,
    tools: ["AutoCAD", "SketchUp", "D5 Render"],
    summary: "A three-bedroom family bungalow with practical planning and a spacious backyard.",
    cover: b("cover", "Bungalow front with stone-clad entry and gabled roof"),
    thumb: b("thumb", "Bungalow entrance"),
    sections: [
      {
        id: "overview",
        kind: "text",
        title: "Overview",
        body: [
          "This three-bedroom bungalow residence was designed to meet the needs of a simple family through practical space planning, comfortable living environments, and a spacious backyard that enhances the connection between indoor and outdoor living.",
        ],
      },
      {
        id: "drawings",
        kind: "plans",
        title: "Plans and elevations",
        sheets: [
          { label: "Floor plan", image: b("plan", "Ground floor plan") },
          { label: "Elevations", image: b("elevations", "Front, rear, right and left elevations") },
        ],
      },
    ],
  },
  {
    slug: "composite-building",
    number: "3",
    title: "Composite Building",
    category: "Residential",
    location: "Nueva Ecija",
    context: "Freelance project",
    year: 2025,
    tools: ["AutoCAD", "SketchUp", "D5 Render"],
    summary: "Affordable two-storey housing that keeps comfort and everyday function intact.",
    cover: c("cover", "Two-storey composite house with balcony and carport"),
    thumb: c("thumb", "Composite building front"),
    sections: [
      {
        id: "overview",
        kind: "text",
        title: "Overview",
        body: [
          "This composite residential building was designed to provide an affordable housing solution without compromising the comfort, functionality, and essential needs of its future occupants.",
          "The design emphasizes efficient space planning, practical living areas, and cost-effective construction strategies to create a comfortable and sustainable living environment.",
        ],
      },
      {
        id: "plans",
        kind: "plans",
        title: "Floor plans",
        sheets: [
          { label: "Ground", image: c("plan-ground", "Ground floor plan") },
          { label: "Second", image: c("plan-2nd", "Second floor plan") },
          { label: "Attic", image: c("plan-attic", "Attic plan") },
          { label: "Roof", image: c("plan-roof", "Roof plan") },
        ],
      },
      {
        id: "elevations",
        kind: "drawings",
        title: "Elevations",
        images: [
          c("elevations-front-rear", "Front and rear elevations"),
          c("elevations-sides", "Left and right side elevations"),
        ],
      },
    ],
  },
  {
    slug: "zenso-hotel-resort",
    number: "4",
    title: "Zenso Hotel & Resort",
    category: "Commercial",
    location: "Baler, Aurora",
    context: "Architectural plate",
    year: 2024,
    tools: ["AutoCAD", "SketchUp", "Enscape"],
    summary: "A wellness resort with spa, restaurant, fitness center, infinity pool and koi pond.",
    cover: z("cover", "Zenso resort entrance gate with tiled roof"),
    thumb: z("thumb", "Zenso resort gate"),
    sections: [
      {
        id: "overview",
        kind: "text",
        title: "Overview",
        body: [
          "ZENSO hotel and resort is envisioned as a destination for leisure, wellness, and relaxation. Designed to offer a comprehensive staycation experience, the development integrates comfortable accommodations with a range of amenities, including a spa, restaurant, fitness center, and recreational spaces.",
          "Through thoughtful planning and a guest-centered approach, the project fosters an atmosphere that encourages rest, rejuvenation, and overall well-being.",
        ],
        figure: z("pool", "Infinity pool in front of the guest wing"),
      },
      {
        id: "plans",
        kind: "plans",
        title: "Plans",
        sheets: [
          { label: "Site", image: z("site-plan", "Site development plan with infinity pool, koi pond and parking") },
          { label: "Ground", image: z("plan-ground", "Ground floor plan: lobby, restaurant, bar and kitchen") },
          { label: "Second", image: z("plan-2nd", "Second floor plan: double rooms and fitness gym") },
          { label: "3rd–4th", image: z("plan-3rd-4th", "Third to fourth floor plan: suites and office") },
          { label: "Elevations", image: z("elevations", "Front and rear elevations") },
        ],
      },
      {
        id: "perspectives",
        kind: "gallery",
        title: "Perspectives",
        images: [
          z("lobby-reception", "Lobby, reception"),
          z("lobby-lounge", "Lobby, lounge"),
          z("restaurant-1", "Restaurant"),
          z("restaurant-2", "Restaurant, counter"),
          z("koi-pond", "Koi pond"),
          z("pool", "Infinity pool"),
          z("suite-bedroom", "Deluxe suite, bedroom"),
          z("suite-bath", "Deluxe suite, bathroom"),
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const sheetLetter = (i: number) => String.fromCharCode(65 + i);
