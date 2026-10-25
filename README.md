# jannabanana

Portfolio site for Janna Darlene P. Sagaysay, built with Next.js.

## Run it

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

All text lives in two files:

- `src/content/profile.ts`: name, about text, education, experience, skills, contact
- `src/content/projects.ts`: the four projects, their descriptions and every image slot

## Adding images

Every image starts as a grey placeholder with an X. To replace one:

1. Put the file in `public/images/`, e.g. `public/images/arts-high-school/front.jpg`.
2. Set `src` on the matching item, e.g.
   `cover: { label: "Front perspective, main entrance", src: "/images/arts-high-school/front.jpg", ratio: 4 / 3 }`.

The portrait and the cover line drawing are set with `portrait` and `coverDrawing` in `profile.ts`.
