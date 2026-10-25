# jannabanana

Architecture portfolio of Janna Darlene P. Sagaysay, built with Next.js.

## Run it

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages at <https://jannabanana.github.io> (see `.github/workflows/deploy.yml`). Progress shows under the repo's **Actions** tab.

The site is a static export, so the Pages path prefix (`/jannabanana`) is passed in at build time through `PAGES_BASE_PATH`. Local builds leave it empty and serve from `/`.

## Content

- `src/content/profile.ts`: name, about, education, experience, skills, contact
- `src/content/projects.ts`: the four projects. Each one is a list of lettered sheets (overview, plans, drawings, gallery...) shown in order on the project page.

## Images

All images come from `PORTFOLIO.pdf` (kept out of git). To re-extract them after the PDF changes:

```sh
npm run images
```

This needs [Poppler](https://poppler.freedesktop.org/) on your PATH (`scoop install poppler` on Windows). Renders and photos are copied out as-is; plans, elevations and diagrams are vector, so they are rendered at 300 dpi and cropped. The crop boxes and which PDF image goes where are listed at the top of `scripts/extract-images.mjs`. Output goes to `public/images/` as `.webp`, plus `src/content/images.json` with each image's size.

To use a higher-resolution original instead, drop it over the matching file in `public/images/`, then update its width and height in `images.json`.
