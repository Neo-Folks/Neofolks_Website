# NeoFolks

The official site for **NeoFolks**, the technology community at Navrachana University (NUV) — built with React, TypeScript, Tailwind CSS, and Vite.

## 🚀 Project Overview

The site covers:
- **Home** — full-viewport hero, an animated orbital "tech focus" timeline, a scrolling testimonials wall, and a partners/sponsors strip
- **About** — mission & vision, community highlights, NUV connection, focus areas, and core values
- **Team** — an offset photo showcase of the leadership team
- **Events** — past events on a curved, scroll-animated timeline
- **Contact** — a contact form plus direct contact methods
- **Join** — a full membership application form

## 🛠 Technology Stack

- **React 18** + **TypeScript**
- **Vite** for dev server and production builds
- **Tailwind CSS** with a custom dark, purple-accented design system
- **shadcn/ui** (Radix primitives) for form controls, dialogs, toasts, etc.
- **motion** (Framer Motion successor) for scroll-triggered and orbital animations
- **lucide-react** for icons
- **react-router-dom** for client-side routing
- **react-hook-form** + **zod** available for form handling/validation

## 📱 Responsive Design

The site is fully responsive from small phones (~360px) through desktop. Key points if you're extending it:

- Global safety nets live in `src/index.css`: `overflow-x: hidden` on `html`/`body` and `img { max-width: 100% }` guard against any stray fixed-width element causing horizontal scroll.
- Most layout is done with inline styles plus a scoped `<style>` block per section containing the mobile overrides (search for `@media` in each file). This mirrors the pattern already used in `Navigation.tsx` and `curved-timeline.tsx`.
- Notable responsive behaviors:
  - **Hero title** (`pages/Index.tsx`) scales fluidly with `clamp()` instead of a fixed pixel size, and stacks the wordmark above the logo below 520px.
  - **Tech Focus orbital timeline** (`components/ui/radial-orbital-timeline.tsx`) measures its own container with a `ResizeObserver` and shrinks the orbit radius so nodes never clip off-screen on narrow viewports.
  - **Team page** (`pages/Team.tsx`) collapses its offset multi-column photo layout into a centered, wrapping layout below 800px.
  - **Footer**, **TrustedBySection**, and the **Join**/**Contact** form grids all collapse from multi-column to single/double column on small screens.
  - **Events timeline** (`components/ui/curved-timeline.tsx`) already ships two layouts: a curved serpentine path on `md:` and up, and a simple stacked list below that.
- When adding a new section, follow the existing pattern: build desktop-first with inline styles, add a `className` hook for anything that needs to change on mobile, and drop the media query in a `<style>` tag scoped to that section.

## 📦 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd neofolks-vercel

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

### Linting
```bash
npm run lint
```

## 🏗 Project Structure

```
src/
├── assets/
│   ├── events/        # Event photos
│   └── team/           # Team member photos
├── components/
│   ├── ui/              # shadcn/ui components + custom widgets
│   │   ├── curved-timeline.tsx        # Events page scroll timeline
│   │   ├── radial-orbital-timeline.tsx # Home page tech-focus orbit
│   │   ├── testimonials-columns.tsx   # Auto-scrolling testimonial columns
│   │   └── ...
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx   # Fixed nav with mobile hamburger menu
│   ├── ParallaxSection.tsx  # Scroll-in fade/slide wrapper
│   ├── Team.tsx
│   └── TrustedBySection.tsx
├── pages/
│   ├── Index.tsx        # Home
│   ├── About.tsx
│   ├── Team.tsx
│   ├── Events.tsx
│   ├── Contact.tsx
│   ├── Join.tsx
│   └── NotFound.tsx
├── hooks/
│   └── use-toast.ts
├── lib/
│   └── utils.ts
└── index.css            # Design tokens, base styles, Tailwind layers
```

## 🎨 Design System

- **Palette**: near-black background (`#000000`) with a purple accent (`rgba(168,85,247,*)`), white text at varying opacity for hierarchy
- **Typography**: `Gambarino` (serif, display) for headings, `Inter` for UI text and body copy
- **Motion**: scroll-triggered fade/slide-in via `ParallaxSection` and `motion`'s `whileInView`, plus a couple of dedicated animated components (orbital timeline, curved timeline, scrolling testimonials)

## 🚀 Deployment

Configured for **Vercel** out of the box (`vercel.json` rewrites all routes to `index.html` for client-side routing). Any static host that supports SPA rewrites (Netlify, Cloudflare Pages, etc.) will also work.

## 🧪 Manual QA Checklist

- **Home**: hero readable and centered at mobile widths; orbital timeline nodes stay inside the viewport; testimonial columns scroll without overflowing
- **Team**: photo layout collapses cleanly and stays centered below ~800px
- **Contact / Join**: form fields stack to a single column on small screens; all inputs remain reachable and legible
- **Navigation**: hamburger menu opens/closes correctly below 768px; active link state is visible
- **Cross-browser**: Chrome, Safari (iOS), Firefox
- **Cross-device**: phone (~360–430px), tablet (~768–1024px), desktop (1280px+)

## 🤝 Contributing

1. Keep the existing dark, purple-accented visual language consistent across new sections.
2. Any new layout should be checked at ~360px, ~768px, and ~1280px before merging.
3. Prefer the `className` + scoped `<style>` media-query pattern already used throughout the codebase over introducing a new styling approach.
4. Run `npm run build` before opening a PR to catch type errors.

## 📄 License

All rights reserved, NeoFolks — Navrachana University.
