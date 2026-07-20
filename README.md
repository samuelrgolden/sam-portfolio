# Sam Golden — Portfolio

A one-page data-science portfolio and a companion photography gallery, built as a
static site. Data-driven work up front — an honors thesis on Oregon's power grid,
a live dashboard, quant and ML projects — plus a full photography wing.

**Design:** an "annotated figure" aesthetic in a field-notes palette (fir green +
antique gold on warm paper), with a scroll-linked green throughline that guides the
reader from the intro down through skills, projects, and experience. Light and dark
modes on the main page.

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- Two entry points: `index.html` (main site) and `photography.html` (gallery)
- No backend — ships as static files. Images are self-hosted WebP.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Structure

```
index.html · photography.html   entry points
src/
  App.jsx                        main page: stacks the sections
  components/                    Hero, About, Skills, Projects, Experience,
                                 Recognition, Ending, Nav, Thread (the throughline)…
  GalleryPage.jsx                the photography gallery (justified collage + lightbox)
  galleryData.js                 photo manifest (order, categories)
  index.css                      design tokens + component classes
public/
  photos/ · work/                site imagery
  gallery/thumb · gallery/full   two-tier gallery images
```

Section content lives in plain data arrays at the top of each component, so copy is
easy to edit without touching layout.

Every photograph on the site was taken by Sam Golden.
