# Aureus — Ndifreke Udoh's Developer Portfolio

> A highly interactive, visually impressive personal portfolio built with SvelteKit 5, featuring a minimal aesthetic, gold accent design system, smooth GSAP animations, and an AI-powered portfolio assistant.

---

##  Live Demo

> [live link](https://aureus-gamma.vercel.app)

##  Repository

> [Aureus_repo](https://github.com/FrekeNobles/Aureus)

---

##  Project Overview

**Aureus** is a personal portfolio built to document my digital craftmanship. The goal was to build an immersive, animated, and engineered portfolio experience.

The name *Aureus* is inspired by the gold Roman coin, reflecting the gold-accented design system throughout the project.

---

##  Features

### Core Sections
- **Hero** — Typewriter animation cycling through roles, stats card, social links, scroll indicator
- **About** — Bio, tech stack skills grid with staggered reveal animations
- **Projects** — Filterable project grid with animated modals on click
- **Contact** — Contact form with validation feedback + social links
- **Footer** — Clean branded footer with navigation

### Creative Feature — AI Portfolio Assistant
- Floating chat button (bottom-right) powered by **Groq API** (LLaMA 3.1)
- Answers questions about my's skills, projects, availability, and experience
- Typing indicator, suggestion chips, smooth panel open/close animation
- Secure — API key never exposed to the browser via SvelteKit server routes

### Design & UX
- **Dark/Light mode** with smooth transition and `localStorage` persistence
- **Minimal Brutalist** aesthetic — strong typography, raw grid, intentional whitespace
- **Gold accent** design system using CSS custom properties throughout
- Responsive across desktop, tablet, and mobile
- Accessible — keyboard navigable, semantic HTML, visible focus states, ARIA labels

### Animations
- **GSAP** hero entrance — staggered timeline (eyebrow → name → actions → card)
- **ScrollTrigger** — scroll-driven reveals for every section
- **Project modals** — smooth fade + slide-up on open, fade + slide-down on close
- **Typewriter effect** — role text types itself, cycles on interval
- **Floating scroll indicator** — subtle float loop animation
- CSS transitions for theme switching, hover states, nav scroll effect

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Framework | SvelteKit 5 |
| Language | TypeScript |
| Styling | TailwindCSS v4 + CSS Custom Properties |
| Animations | GSAP + ScrollTrigger |
| AI | Groq API (LLaMA 3.1 8B Instant) |
| Fonts | DM Serif Display, Syne, JetBrains Mono |
| Deployment | Vercel |

---

##  Project Architecture

```
aureus/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Nav.svelte          # Fixed nav, theme toggle, mobile hamburger
│   │   │   ├── Hero.svelte         # Typewriter animation, stats card, socials
│   │   │   ├── About.svelte        # Bio, skills grid
│   │   │   ├── Projects.svelte     # Filterable grid, animated modals
│   │   │   ├── Contact.svelte      # Contact form, social links
│   │   │   ├── Footer.svelte       # Footer with nav links
│   │   │   └── AIAssistant.svelte  # Groq-powered chat panel
│   │   ├── data/
│   │   │   └── projects.ts         # Reusable project data array
│   │   └── utils/
│   │       └── animations.ts       # GSAP ScrollTrigger helpers
│   ├── routes/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── +server.ts      # Server-side Groq API route
│   │   ├── +layout.svelte          # Root layout, CSS import
│   │   └── +page.svelte            # Main page composition
│   ├── app.css                     # Global styles, CSS variables, theme
│   └── app.html                    # HTML shell
├── static/                         # Static assets, favicon
├── .env                            # Environment variables (gitignored)
├── svelte.config.js
└── package.json
```

---

##  Setup Instructions

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher
- A Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/FrekeNobles/aureus.git
cd aureus

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a .env file in the root directory
echo "GROQ_API_KEY=your_groq_api_key_here" > .env

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GROQ_API_KEY` | Your Groq API key for the AI assistant | Yes |

> ⚠️ Never commit `.env` to version control. It is already listed in `.gitignore`.

The API key is kept server-side via a SvelteKit API route (`src/routes/api/chat/+server.ts`), so it is never exposed to the browser.

---

## Animation Decisions

### GSAP for Hero Entrance
The hero section uses a GSAP timeline for a cinematic entrance sequence. Each element animates in with a deliberate stagger — eyebrow line first, then the name, then CTAs, then the stats card sliding in from the right. This creates a sense of intentional choreography rather than everything popping in at once.

### ScrollTrigger for Section Reveals
Every section uses GSAP ScrollTrigger with `gsap-reveal` and `gsap-stagger` utility classes. Elements fade up from 40px below their natural position as they enter the viewport. Staggered children (skill tags, project cards) animate with a 0.1s delay between each item.

### Modal Transitions
Project modals use GSAP for open (fade + scale up from 0.94 + slide up 60px, `expo.out` easing) and close (fade + scale down + slide down 40px, `power2.in` easing). The backdrop fades independently for depth separation.

### Typewriter Effect
The hero role text uses a custom `setInterval` typewriter that cycles through multiple roles with a pause between each. The intro paragraph types itself out on mount using a faster interval (18ms) for a natural reading feel. A blinking cursor is CSS-animated with `step-end` timing.

### CSS Transitions
Theme switching, hover states, nav background on scroll, and AI panel open/close all use CSS transitions rather than GSAP — keeping GSAP reserved for entrance animations where timing control matters most.

---

##  Performance Optimization

- **Font preconnect** — Google Fonts loaded with `preconnect` hints for faster font delivery
- **CSS custom properties** — Theme switching without JavaScript style recalculation
- **Intersection Observer via GSAP ScrollTrigger** — Animations only trigger when elements are in view, not on page load
- **Server-side API route** — AI assistant calls go through SvelteKit's server, preventing unnecessary client-side bundle weight
- **`auto-fill` grid** — Project grid uses `minmax` for responsive layout without JavaScript
- **Svelte's compiled output** — No virtual DOM overhead; components compile to minimal vanilla JS
- **Lazy scroll reveals** — Elements start hidden and reveal only when scrolled into view, reducing initial paint complexity

---

##  Accessibility

- Semantic HTML throughout (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- All interactive elements are focusable with visible focus states
- ARIA labels on icon-only buttons (hamburger, theme toggle, send button, AI FAB)
- `aria-label` and `role="dialog"` on modal and AI panel
- `aria-modal="true"` and `tabindex="-1"` on modal content
- Escape key closes modal
- Project cards converted from `<article>` to `<button>` for proper keyboard interaction
- `alt` text and `aria-label` attributes on all SVG icons
- Colour contrast maintained across both dark and light themes
- Mobile menu traps focus within navigation context

---

##  Adding New Projects

Projects are driven by a single data file. To add a new project, open `src/lib/data/projects.ts` and add a new entry to the array:

```ts
{
  id: 5,
  title: "Your Project Name",
  desc: "A short description of what the project does.",
  stack: ["React", "TypeScript", "TailwindCSS"],
  category: "react",        // "react" | "vue" | "next"
  demo: "https://your-demo-url.com",
  repo: "https://github.com/you/repo",
  initials: "YP"            // 2 letters shown on the card thumbnail
}
```

The card renders automatically — no other changes needed.

---

## Trade-offs Made

| Decision | Trade-off |
|---|---|
| Groq (LLaMA 3.1) over Claude API or OpenAI | Groq has a generous free tier suitable for a portfolio; Others requires billing setup |
| CSS custom properties over Tailwind for theming | More explicit control over the gold/navy palette; Tailwind's JIT doesn't support runtime theme switching as cleanly |
| Single-page layout over multi-route | Smoother scroll experience for a portfolio; no page transition overhead |
| GSAP over native CSS animations for entrance | More control over sequencing and easing; worth the bundle size for a portfolio |
| SvelteKit server route for AI | Slightly more setup than direct client fetch, but API key is never exposed |
| No image optimization plugin | Kept setup simple for the submission; would add `@sveltejs/enhanced-img` in production |

---

##  Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable in Vercel dashboard
# Settings → Environment Variables → GROQ_API_KEY
```


##  Submission Checklist

- ✅ Built with SvelteKit 5
- ✅ TypeScript throughout
- ✅ Hero with typewriter animation
- ✅ Projects showcase with filter tabs and modals
- ✅ Smooth GSAP animations and scroll reveals
- ✅ Responsive — desktop, tablet, mobile
- ✅ Dark mode + light mode with persistence
- ✅ Contact section with form
- ✅ AI Portfolio Assistant (Groq/LLaMA)
- ✅ Accessible — keyboard nav, ARIA, semantic HTML
- ✅ Clean component architecture
- ✅ Reusable project cards (data-driven)
- ✅ No console errors or warnings
- ✅ README with full documentation

---

##  Author

**Ndifreke Udoh**
Frontend Developer

- Email: frekenobles@gmail.com
- GitHub: [here](https://github.com/ndifreke)
- LinkedIn: [my_linkedin](https://linkedin.com/in/ndifreke)

---

