export const jobs = [
  {
    name: "dropbox (swe intern)",
    date: "may – aug 2026",
    initiatives: [
      {
        name: "agentic triage pipeline",
        description: "llm agents that triage, reproduce, and route support issues",
      },
      {
        name: "learning platform",
        description: "assessment workflows, content editor, Okta SSO, slack integration",
      },
    ],
  },
  {
    name: "texas a&m university",
    initiatives: [
      {
        name: "ml researcher",
        description: "stmi lab: ecg/ppg waveform forecasting",
        date: "mar – aug 2026",
      },
      {
        name: "teaching assistant",
        date: "aug 2026 – present",
      },
    ],
  },
  {
    name: "legacai (swe intern)",
    date: "jun – sep 2025",
    description: "built an ai note-taking app with streaming whisper transcription",
  },
];

export const projects = [
  {
    slug: null,
    name: "parallel wikipedia word indexer",
    date: "2026",
    description:
      "multithreaded c++ word indexer for wikipedia, using per-thread hash tables and virtual memory to count words efficiently",
    tech: "c++, win32, virtual memory, multithreading, cache optimization",
    tags: [],
    repoUrl: null,
    entries: [],
  },
  {
    slug: null,
    name: "voxpath",
    date: "2025",
    description:
      "c++ inference runtime that detects vocal biomarkers for parkinson's screening, with onnx models running directly in the audio path",
    tech: "c++17, pytorch, onnx runtime, fftw, avx2, webassembly",
    tags: [],
    repoUrl: "https://github.com/andrewv426/voxpath",
    entries: [],
  },
  {
    slug: null,
    name: "kolor",
    date: "2026",
    description:
      "daily photo-editing game — edit one photo a day, then unlock a gallery of how everyone else and ai models edited the same shot",
    tech: "next.js, typescript, react, supabase, upng",
    tags: [],
    repoUrl: "https://github.com/andrewv426/Kolor",
    entries: [],
  },
  {
    slug: null,
    name: "poro",
    date: "2026",
    description:
      "built a macos floating assistant that nudges you back on task during focus sessions",
    tech: "swift, swiftui, appkit, cerebras, applescript",
    tags: [],
    repoUrl: "https://github.com/andrewv426/Poro",
    entries: [],
  },
];

export const hackathons = [
  {
    name: "dropbox emerging talent hackathon",
    date: "2026",
    tags: ["1st place"],
  },
  {
    slug: null,
    name: "jpmc dataforgood hackathon",
    date: "2025",
    description:
      "built a logistic regression model with an ngo to improve employment outcomes for domestic violence survivors and identify gaps in adolescent services",
    tech: "python, pandas, scikit-learn, logistic regression",
    tags: ["1st place"],
    repoUrl: null,
    entries: [],
  },
  {
    name: "northmark strategies quant trading competition",
    tags: ["1st place"],
  },
  {
    slug: null,
    name: "nagi — tamuhack",
    date: "2026",
    description:
      "agentic pipeline that turns natural language and uploaded files into python programs and slurm job specs for simulated hpc workflows",
    tech: "next.js, typescript, tailwind, nemotron api, react, figma",
    tags: [],
    devpostUrl: "https://devpost.com/software/askjd-eop639",
    repoUrl: "https://github.com/isaacchacko/tamuhack26",
    entries: [],
  },
  {
    name: "power presenter — hacktx",
    date: "2025",
    description: "collaborative presentations with live audience questions, transcription, and ai-generated slide annotations",
    tech: "next.js, node.js, firebase, assemblyai",
    devpostUrl: "https://devpost.com/software/project-ishaan",
    repoUrl: "https://github.com/isaacchacko/hacktx25",
  },
];
