# Arjya Ananya Birthday & Diwali Celebration

A React + Vite birthday celebration website with interactive diyas, fireworks,
music, memories, and a Diwali-themed hero section.

## Run locally

**Prerequisite:** Node.js 20 or newer

```powershell
cd "D:\coding folder\arjya birthday"
npm install --legacy-peer-deps --no-package-lock
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create a production build:

```powershell
npm run build
```

## Add your five local photos

Create this folder:

```text
public/images
```

Put your five photos there with these exact names:

```text
public/images/hero.svg
public/images/memory-1.svg
public/images/memory-2.svg
public/images/memory-3.svg
public/images/memory-4.svg
```

- `hero.svg` is the large demo image in the hero section.
- `memory-1.svg` through `memory-4.svg` are the four demo memory cards.

JPG, PNG, WebP, and SVG files are supported. If you use another extension, update
the matching path in `src/components/HeroSection.tsx` or
`src/components/MemoriesSection.tsx`. Save the files and refresh the browser.
