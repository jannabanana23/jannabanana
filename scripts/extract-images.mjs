// Pulls every image the site uses out of PORTFOLIO.pdf.
//
//   node scripts/extract-images.mjs [path/to/PORTFOLIO.pdf]
//
// Needs Poppler (pdfimages, pdftoppm) on PATH. Renders and photos are copied
// out of the PDF as-is; plans, elevations and diagrams are vector, so those are
// rendered at 300 dpi and cropped. Writes /public/images/** as .webp and
// src/content/images.json (width/height of each file, used for aspect ratios).

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const pdf = path.resolve(process.argv[2] ?? path.join(root, "PORTFOLIO.pdf"));
const outDir = path.join(root, "public", "images");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "jb-extract-"));

// raw: embedded image (pdfimages "-p" name), mask: its soft mask for transparency
// page + crop: [left, top, right, bottom] as fractions of the rendered page
const R = (raw, mask, rotate) => ({ raw, mask, rotate });
const C = (page, ...crop) => ({ page, crop });

const sources = {
  "site/cover-drawing": R("img-001-000", "img-001-001"),
  "site/portrait": R("img-002-002", null, 270), // stored sideways; the PDF rotates it on the page

  "arts-high-school/cover": R("img-006-044"),
  "arts-high-school/street": R("img-007-045"),
  "arts-high-school/aerial": R("img-010-046"),
  "arts-high-school/elevations": R("img-010-047"),
  "arts-high-school/seed": R("img-010-054", "img-010-055"),
  "arts-high-school/zoning": C(10, 0.722, 0.4, 0.998, 0.99),
  "arts-high-school/circulation": C(11, 0, 0, 0.32, 1),
  "arts-high-school/environment": C(11, 0.334, 0, 1, 0.445),
  "arts-high-school/flexibility-1": R("img-011-101"),
  "arts-high-school/flexibility-2": R("img-011-102"),
  "arts-high-school/flexibility-3": R("img-011-103"),
  "arts-high-school/considerations": C(11, 0.33, 0.72, 1, 0.875),
  "arts-high-school/form-evolution": C(11, 0.32, 0.895, 1, 0.997),
  "arts-high-school/plan-ground": C(8, 0.04, 0.17, 0.53, 0.95),
  "arts-high-school/plan-2nd": C(8, 0.57, 0.17, 0.99, 0.95),
  "arts-high-school/plan-3rd": C(9, 0.07, 0.17, 0.53, 0.95),
  "arts-high-school/plan-4th": C(9, 0.53, 0.17, 0.95, 0.95),
  "arts-high-school/drawing-studio": R("img-012-131"),
  "arts-high-school/workshop-studio": R("img-012-132"),
  "arts-high-school/creative-writing-studio": R("img-012-136"),
  "arts-high-school/wind-instruments-studio": R("img-012-133"),
  "arts-high-school/percussion-studio": R("img-012-134"),
  "arts-high-school/stringed-instruments-studio": R("img-012-135"),
  "arts-high-school/courtyard": R("img-012-137"),
  "arts-high-school/rooftop-garden": R("img-012-138"),
  "arts-high-school/library": R("img-012-139"),
  "arts-high-school/technical-room": R("img-013-140"),
  "arts-high-school/voice-studio": R("img-013-143"),
  "arts-high-school/canteen": R("img-013-147"),
  "arts-high-school/dance-studio": R("img-013-141"),
  "arts-high-school/media-studio": R("img-013-142"),
  "arts-high-school/administrative-office": R("img-013-146"),
  "arts-high-school/student-lounge": R("img-013-144"),
  "arts-high-school/main-lobby": R("img-013-148"),
  "arts-high-school/gym": R("img-013-145"),

  "bungalow-house/cover": R("img-014-149"),
  "bungalow-house/thumb": R("img-004-040"),
  "bungalow-house/plan": C(15, 0.015, 0.07, 0.33, 0.96),
  "bungalow-house/elevations": C(15, 0.365, 0.12, 0.99, 0.955),

  "composite-building/cover": R("img-016-151"),
  "composite-building/thumb": R("img-005-043"),
  "composite-building/elevations-front-rear": C(17, 0.09, 0.1, 0.91, 0.53),
  "composite-building/elevations-sides": C(17, 0.09, 0.53, 0.91, 0.97),
  "composite-building/plan-ground": C(18, 0.015, 0.16, 0.5, 0.92),
  "composite-building/plan-2nd": C(18, 0.49, 0.16, 0.985, 0.92),
  "composite-building/plan-attic": C(19, 0.07, 0.14, 0.5, 0.92),
  "composite-building/plan-roof": C(19, 0.52, 0.14, 0.95, 0.92),

  "zenso-hotel-resort/cover": R("img-021-152"),
  "zenso-hotel-resort/thumb": R("img-005-042"),
  "zenso-hotel-resort/site-plan": C(20, 0.46, 0.08, 0.96, 0.97),
  "zenso-hotel-resort/plan-ground": C(22, 0.03, 0.22, 0.52, 0.93),
  "zenso-hotel-resort/plan-2nd": C(22, 0.52, 0.22, 0.998, 0.93),
  "zenso-hotel-resort/plan-3rd-4th": C(23, 0.04, 0.22, 0.5, 0.93),
  "zenso-hotel-resort/elevations": C(23, 0.49, 0.11, 0.98, 0.89),
  "zenso-hotel-resort/lobby-reception": R("img-024-153"),
  "zenso-hotel-resort/lobby-lounge": R("img-024-154"),
  "zenso-hotel-resort/restaurant-1": R("img-025-156"),
  "zenso-hotel-resort/restaurant-2": R("img-025-157"),
  "zenso-hotel-resort/pool": R("img-025-155"),
  "zenso-hotel-resort/koi-pond": R("img-025-158"),
  "zenso-hotel-resort/suite-bedroom": R("img-025-159"),
  "zenso-hotel-resort/suite-bath": R("img-025-160"),
};

const MAX_WIDTH = 2400;

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: ["ignore", "ignore", "inherit"] });
}

console.log(`Extracting from ${pdf}`);
run("pdfimages", ["-png", "-p", pdf, path.join(tmp, "img")]);

const pages = [...new Set(Object.values(sources).flatMap((s) => (s.page ? [s.page] : [])))];
for (const page of pages) {
  run("pdftoppm", ["-png", "-r", "300", "-f", String(page), "-l", String(page), "-singlefile", pdf, path.join(tmp, `page-${page}`)]);
}

const manifest = {};
for (const [name, src] of Object.entries(sources)) {
  let img;
  if (src.raw) {
    img = sharp(path.join(tmp, `${src.raw}.png`));
    if (src.mask) {
      const alpha = await sharp(path.join(tmp, `${src.mask}.png`)).toColourspace("b-w").raw().toBuffer({ resolveWithObject: true });
      img = img.joinChannel(alpha.data, { raw: alpha.info });
    }
  } else {
    const file = path.join(tmp, `page-${src.page}.png`);
    const { width, height } = await sharp(file).metadata();
    const [l, t, r, b] = src.crop;
    img = sharp(file).extract({
      left: Math.round(l * width),
      top: Math.round(t * height),
      width: Math.round((r - l) * width),
      height: Math.round((b - t) * height),
    });
  }

  let buf = await img.png().toBuffer();
  if (src.rotate) buf = await sharp(buf).rotate(src.rotate).toBuffer();
  const out = sharp(buf).resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const target = path.join(outDir, `${name}.webp`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  // Line drawings compress badly with lossy settings, so keep them crisp.
  const info = await out.webp(src.page ? { quality: 90, smartSubsample: true } : { quality: 82 }).toFile(target);
  manifest[`/images/${name}.webp`] = { width: info.width, height: info.height };
  console.log(`  ${name}.webp  ${info.width}x${info.height}`);
}

fs.writeFileSync(path.join(root, "src", "content", "images.json"), JSON.stringify(manifest, null, 2) + "\n");
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`Done: ${Object.keys(manifest).length} images`);
