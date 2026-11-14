export const handle = "andrewvong6";

export const links = [
  { label: "Email", text: "andrewvong426@gmail.com", href: "mailto:andrewvong426@gmail.com" },
  { label: "School email", text: "andrewvong@tamu.edu", href: "mailto:andrewvong@tamu.edu" },
  { label: "GitHub", text: "github.com/andrewv426", href: "https://github.com/andrewv426" },
  { label: "LinkedIn", text: "in/andrewvong06", href: "https://linkedin.com/in/andrewvong06" },
  { label: "X", text: "@andrewvong6", href: "https://x.com/andrewvong6" },
];

export const jobs = [
  {
    name: "Dropbox",
    role: "Software engineering intern",
    date: "May – Aug 2026",
    description:
      "Built an agentic triage pipeline (LLM agents that triage, reproduce, and route support issues) and a learning platform with assessment workflows, a content editor, Okta SSO, and a Slack integration.",
  },
  {
    name: "Texas A&M University",
    role: "Teaching assistant",
    date: "Aug 2026 – present",
  },
  {
    name: "Texas A&M University",
    role: "ML researcher, STMI Lab",
    date: "Mar – Aug 2026",
    description: "ECG and PPG waveform forecasting.",
  },
  {
    name: "Startup",
    date: "Jun – Sep 2025",
    description: "Built an AI note-taking app with streaming Whisper transcription.",
  },
];

export const projects = [
  {
    slug: "wikipedia-indexer",
    name: "Parallel Wikipedia word indexer",
    date: "2026",
    description:
      "Multithreaded C++ word indexer for Wikipedia, using per-thread hash tables and virtual memory to count words efficiently.",
    tech: "C++, Win32, virtual memory, multithreading, cache optimization",
    links: [],
  },
  {
    slug: "kolor",
    name: "Kolor",
    date: "2026",
    description:
      "Daily photo-editing game: edit one photo a day, then unlock a gallery of how everyone else and AI models edited the same shot.",
    tech: "Next.js, TypeScript, React, Supabase, UPNG",
    links: [{ label: "GitHub", href: "https://github.com/andrewv426/Kolor" }],
  },
  {
    slug: "poro",
    name: "Poro",
    date: "2026",
    description:
      "A macOS floating assistant that nudges you back on task during focus sessions.",
    tech: "Swift, SwiftUI, AppKit, Cerebras, AppleScript",
    links: [{ label: "GitHub", href: "https://github.com/andrewv426/Poro" }],
  },
  {
    slug: "voxpath",
    name: "Voxpath",
    date: "2025",
    description:
      "C++ inference runtime that detects vocal biomarkers for Parkinson's screening, with ONNX models running directly in the audio path.",
    tech: "C++17, PyTorch, ONNX Runtime, FFTW, AVX2, WebAssembly",
    links: [{ label: "GitHub", href: "https://github.com/andrewv426/voxpath" }],
  },
];

export const hackathons = [
  {
    name: "Timecasters",
    event: "TAMU Datathon",
    date: "2026",
    description:
      "Blends Bayesian models, GRUs, and transformers to predict payout odds for simulated slot machines.",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/timecasters" },
      { label: "GitHub", href: "https://github.com/Amir-Suh/TAMU-Datathon-2027/tree/main" },
    ],
  },
  {
    name: "Pokes",
    event: "TAMU Datathon",
    date: "2026",
    description:
      "Heads-up short-deck Omaha bot that estimates hand equity with Monte Carlo simulations and adapts to opponents' betting patterns.",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/pokes-xebzda" },
      { label: "GitHub", href: "https://github.com/andrewv426/timecasters-pokerbot" },
    ],
  },
  {
    name: "Dropbox Emerging Talent Hackathon",
    date: "2026",
    award: "1st place",
    description: "Earned best technical execution and most likely to ship.",
    links: [],
  },
  {
    name: "NAI (Northmark AI)",
    event: "TAMUhack",
    date: "2026",
    description:
      "Agentic pipeline that turns natural language and uploaded files into Python programs and Slurm job specs for simulated HPC workflows.",
    tech: "Next.js, TypeScript, Tailwind, Nemotron API, React, Figma",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/askjd-eop639" },
      { label: "GitHub", href: "https://github.com/isaacchacko/tamuhack26" },
    ],
  },
  {
    name: "JPMC DataForGood Hackathon",
    date: "2025",
    award: "1st place",
    description:
      "Built a logistic regression model with an NGO to improve employment outcomes for domestic violence survivors and identify gaps in adolescent services.",
    tech: "Python, pandas, scikit-learn, logistic regression",
    links: [],
  },
  {
    name: "Power Presenter",
    event: "HackTX",
    date: "2025",
    description:
      "Collaborative presentations with live audience questions, transcription, and AI-generated slide annotations.",
    tech: "Next.js, Node.js, Firebase, AssemblyAI",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/project-ishaan" },
      { label: "GitHub", href: "https://github.com/isaacchacko/hacktx25" },
    ],
  },
  {
    name: "Northmark Strategies quant trading competition",
    date: "2025",
    award: "1st place",
    description:
      "Built an ARMA model to forecast prices and tested a trading strategy on historical data.",
    links: [],
  },
];
