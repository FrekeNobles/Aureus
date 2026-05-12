export type Project = {
  id: number;
  title: string;
  desc: string;
  stack: string[];
  category: string;
  demo: string;
  repo: string;
  initials: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Zylo",
    desc: "A modern web application built with React and TypeScript, focused on clean component architecture and type-safe development patterns.",
    stack: ["React", "TypeScript", "Vite", "CSS Modules"],
    category: "react",
    demo: "#",
    repo: "#",
    initials: "ZY"
  },
  {
    id: 2,
    title: "etokiAI",
    desc: "An AI-powered application with a custom manifest configuration, engineered for performance and seamless user experience.",
    stack: ["JavaScript", "PWA", "REST API"],
    category: "react",
    demo: "#",
    repo: "#",
    initials: "AI"
  },
  {
    id: 3,
    title: "ViewOps",
    desc: "A real-time operations dashboard built with Vue, featuring live data streams, dynamic charts, and responsive monitoring interfaces.",
    stack: ["Vue.js", "WebSockets", "Chart.js", "Pinia"],
    category: "vue",
    demo: "#",
    repo: "#",
    initials: "VO"
  },
  {
    id: 4,
    title: "HabitMe",
    desc: "A Progressive Web App for habit tracking built with Next.js and TypeScript, with offline support and push notifications.",
    stack: ["Next.js", "TypeScript", "PWA", "TailwindCSS"],
    category: "next",
    demo: "#",
    repo: "#",
    initials: "HM"
  }
];