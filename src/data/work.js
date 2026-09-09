export const jobs = [
  {
    name: "dropbox (swe intern)",
    date: "may – aug 2026",
    summaries: [
      {
        label: "ai support triage",
        text: "cut report-to-ticket from 3 days to 30 min with llm agents",
      },
      {
        label: "learning platform",
        text: "built reliable assessment callbacks and slack/email delivery",
      },
    ],
  },
  {
    name: "texas a&m · stmi lab (ml researcher)",
    date: "mar – aug 2026",
    summaries: [
      {
        text: "forecast ecg/ppg waveforms with cnn/transformer models (r = 0.91)",
      },
    ],
  },
  {
    name: "texas a&m (teaching assistant)",
    date: "aug 2026 – present",
    summaries: [
      {
        text: "lead c++ and algorithms labs for 120 students and review 600+ assignments per term",
      },
    ],
  },
  {
    name: "legacai (swe intern)",
    date: "jun – sep 2025",
    summaries: [
      {
        text: "built an ai note-taking app with streaming whisper transcription",
      },
    ],
  },
];

export const projects = [
  {
    slug: null,
    name: "parallel wikipedia word indexer",
    date: "2026",
    description:
      "counted 4.5b wikipedia words at 880 mb/s on 12 cores using c++, per-thread hash tables, and a 2 gb virtual memory reservation",
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
      "c++17 runtime for parkinson's voice screening — 0.94 auroc, with p50 inference cut from 47 ms to 8 ms using embedded onnx runtime",
    tech: "c++17, pytorch, onnx runtime, fftw, avx2, webassembly",
    tags: [],
    repoUrl: "https://github.com/andrewv426/voxpath",
    entries: [],
  },
  {
    slug: null,
    name: "nagi — tamuhack",
    date: "2026",
    description:
      "agentic pipeline of 12+ tools orchestrated by nvidia nemotron, compiling natural language and uploaded files into runnable python programs and slurm job specs for hpc clusters",
    tech: "next.js, typescript, tailwind, nemotron api, react, figma",
    tags: [],
    repoUrl: "https://github.com/isaacchacko/tamuhack26",
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
  {
    slug: null,
    name: "jp morgan dataforgood",
    date: "2025",
    description:
      "built a logistic regression model with an ngo to improve employment outcomes for domestic violence survivors and identify gaps in adolescent services",
    tech: "python, pandas, scikit-learn, logistic regression",
    tags: ["winner"],
    repoUrl: null,
    entries: [],
  },
];
