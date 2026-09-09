export const jobs = [
  {
    name: "dropbox (swe intern)",
    date: "may – aug 2026",
    bullets: [
      {
        label: "ai support triage",
        text: "built agents that reproduce support issues and file jira tickets, cutting triage from 3 days to 30 minutes",
      },
      {
        label: "learning platform",
        text: "made assessment callbacks safe to retry and built reliable slack/email delivery for a company-wide learning platform",
      },
    ],
  },
  {
    name: "texas a&m · stmi lab (ml researcher)",
    date: "mar – aug 2026",
    bullets: [
      {
        text: "trained cnn/transformer models to forecast ecg/ppg waveforms, achieving r = 0.91 on held-out patients",
      },
    ],
  },
  {
    name: "texas a&m (teaching assistant)",
    date: "aug 2026 – present",
    bullets: [
      {
        text: "lead c++ and algorithms labs for 120 students and review 600+ assignments per term",
      },
    ],
  },
  {
    name: "legacai (swe intern)",
    date: "jun – sep 2025",
    bullets: [
      {
        text: "built an ai note-taking platform with streaming whisper transcription and role-based access",
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
      "multithreaded c++ indexer that tokenizes, hashes, and counts 4.5b words of wikipedia text — 880 mb/s on 12 cores against 95 mb/s single-threaded, over a custom hash table packed into a 2 gb virtualalloc reservation",
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
      "c++17 inference runtime detecting vocal biomarkers for early parkinson's screening — 0.94 auroc on held-out speakers, p50 latency 47 ms → 8 ms by embedding onnx runtime and removing python from the hot path",
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
      "logistic regression model to improve employment outcomes for domestic violence survivors, built with an ngo to identify a service gap affecting adolescents excluded from both childcare and adult workforce programs",
    tech: "python, pandas, scikit-learn, logistic regression",
    tags: ["winner"],
    repoUrl: null,
    entries: [],
  },
];
