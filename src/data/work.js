export const jobs = [
  {
    slug: null,
    name: "dropbox (swe intern)",
    date: "may – aug 2026",
    description: null,
    tech: "python, django, postgresql, aws ecs, llm agents",
    tags: [],
    repoUrl: null,
    entries: [
      {
        slug: "dropbox-learning-platform",
        name: "learning platform",
        date: null,
        description:
          "django/postgresql platform that turns internal assessment data into personalized skill reports and learning modules for 1500+ dropbox employees",
        tech: null,
        tags: ["shipped · aws ecs"],
        repoUrl: null,
        entries: [],
      },
      {
        slug: "dropbox-signal-router",
        name: "customer signal router",
        date: null,
        description:
          "agentic router that ingests support-forum posts from 5 sources, classifies owning team and severity, and reproduces reported issues with a playwright agent — ~400 reports/week, report to triaged ticket down from ~3 days to under 30 minutes",
        tech: null,
        tags: ["best tech execution", "most likely to ship"],
        repoUrl: null,
        entries: [],
      },
    ],
  },
  {
    slug: null,
    name: "texas a&m university (ml researcher)",
    date: "mar 2026 – present",
    description:
      "deep time-series models (1d cnn + transformer) forecasting ecg/ppg waveforms from wearable sensor streams — pearson r = 0.91 on held-out patients, over a preprocessing pipeline spanning 10k+ patient records",
    tech: "python, pytorch, numpy, scipy",
    tags: [],
    repoUrl: null,
    entries: [],
  },
  {
    slug: null,
    name: "texas a&m university (teaching assistant)",
    date: "may 2026 – present",
    description:
      "lead lab sections and office hours for 120 students in data structures & algorithms; review 600+ programming assignments per term with line-level feedback on correctness and complexity",
    tech: "c++",
    tags: [],
    repoUrl: null,
    entries: [],
  },
  {
    slug: null,
    name: "startup (swe intern)",
    date: "jun – sep 2025",
    description:
      "shipped a full-stack ai note-taking platform on whisper, with google oauth and aws cognito auth over a dynamodb schema for role-based access control",
    tech: "javascript, typescript, react, node.js, aws, whisper",
    tags: [],
    repoUrl: null,
    entries: [],
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
