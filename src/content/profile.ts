import { media } from "./media";

export const profile = {
  name: "Janna Darlene P. Sagaysay",
  shortName: "Janna Sagaysay",
  initials: "JS",
  role: "Architecture graduate, Mapúa University",
  span: "Selected works 2024–2026",
  email: "jannadarlene@gmail.com",
  phone: "+63 962 806 9818",
  phoneHref: "+639628069818",
  portrait: media("site/portrait", "Portrait of Janna Darlene P. Sagaysay"),
  coverDrawing: media("site/cover-drawing", "Line drawing of the Malolos Arts High School street front"),
  statement: "Spaces that are functional, sustainable and meaningful.",
  about: [
    "As an aspiring architect, I am driven by a passion for creating spaces that are functional, sustainable, and meaningful. I approach every project with careful attention to detail, considering not only the visual quality of a design but also its impact on users, communities, and the environment.",
    "I believe that architecture should first fulfill its intended purpose while creating memorable experiences through thoughtful and aesthetically pleasing design. My goal is to contribute to a built environment where human needs and environmental stewardship coexist in harmony, resulting in spaces that are both enduring and responsible.",
  ],
  // Oldest first. Years are plotted on the CV timeline.
  education: [
    { from: 2006, to: 2018, school: "Core Gateway College Inc.", detail: "Pre-elementary to junior high", place: "San Jose City, Nueva Ecija" },
    { from: 2018, to: 2019, school: "St. Joseph School of San Jose City", detail: "Grade 11", place: "San Jose City, Nueva Ecija" },
    { from: 2019, to: 2020, school: "San Jose City National High School", detail: "Grade 12", place: "San Jose City, Nueva Ecija" },
    { from: 2020, to: 2026, school: "Mapúa University", detail: "BS Architecture", place: "Intramuros, Manila" },
  ],
  // start/end as decimal years (Feb 2024 = 2024.08); no end means a single date
  experience: [
    { when: "2023–now", start: 2023, end: 2026.8, ongoing: true, org: "Freelance", role: "Residential, commercial and interior projects" },
    { when: "Feb–May 2024", start: 2024.08, end: 2024.42, org: "Alero Design Studio", role: "On-the-job training" },
    { when: "Dec 2024", start: 2024.92, org: "Asia Young Designer Awards", role: "Architecture competition" },
  ],
  languages: ["English", "Filipino"],
  software: [
    { group: "Drafting & BIM", items: ["AutoCAD", "Revit", "Archicad"] },
    { group: "Modelling & rendering", items: ["SketchUp", "3ds Max", "D5 Render", "Enscape"] },
    { group: "Presentation", items: ["Photoshop", "Illustrator", "InDesign", "Canva", "PowerPoint"] },
  ],
  // Hobbies drawn as the rooms of a small house plan.
  hobbies: [
    { hobby: "Painting", room: "Painting studio", area: "paint" },
    { hobby: "Cooking", room: "Kitchen", area: "cook" },
    { hobby: "Baking", room: "Bakery nook", area: "bake" },
    { hobby: "Pets", room: "Pet corner", area: "pets" },
    { hobby: "Photography", room: "Darkroom", area: "photo" },
    { hobby: "Sewing", room: "Sewing room", area: "sew" },
  ],
};
