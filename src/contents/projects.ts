import { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "DevTree",
    description:
      "A full-stack platform exclusive for developers made to share their social media.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    githubLink: "https://github.com/MigaleMR/devtree",
    demoLink: "https://migale-devtree.netlify.app",
    image: "/projects/logo.svg",
  },
  {
    title: "Schoolify",
    description:
      "A full-stack collaborative college project designed to provide a virtual classroom platform.",
    technologies: [
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Redis",
      "Neo4j",
      "Cassandra",
      "Docker",
    ],
    githubLink: "https://github.com/liangbinjie/Schoolify",
    demoLink: "https://demo.com",
    image: "/projects/not-available.jpg",
  },
  {
    title: "CashTrackr",
    description:
      "A platform that allows users to create budgets and their respective expenses (work in progress).",
    technologies: ["Node.js", "Tailwind CSS", "React", "PostgreSQL", ],
    githubLink: "https://github.com",
    demoLink: "https://demo.com",
    image: "/projects/work-in-progress.png",
  },
  {
    title: "Agendafy",
    description:
      "A comprehensive appointment scheduling and calendar management system designed for efficient time management.",
    technologies: ["Next.js", "React", "TypeScript", "MongoDB"],
    githubLink: "https://github.com/CtpN3m01/agendafy",
    demoLink: "https://agendafy.vercel.app",
    image: "/projects/not-available.jpg",
  },
];
