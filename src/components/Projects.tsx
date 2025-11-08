import { ProjectCard, ProjectData } from "./ProjectCard";

const projectsData: ProjectData[] = [
  {
    title: "Power Presenter",
    subtitle: "HackTX",
    year: "2025",
    techStack: [
      "Next.js",
      "Socket.IO",
      "Node.js",
      "Firebase",
      "AssemblyAI",
      "Gemini API",
    ],
    description: [
      "Built a real-time presentation platform with live voice transcription and AI-powered summaries, enabling synchronized slide navigation and interactive Q&A for multiple concurrent users",
      "Architected Socket.IO infrastructure for real-time communication, broadcasting live transcription and slide synchronization across rooms with connection recovery and state persistence",
      "Integrated AssemblyAI for live speech-to-text transcription and Google Gemini API for AI-generated slide summaries with PDF export, implementing rate limiting and error handling for production reliability",
    ],
    links: {
      github: "https://github.com/andrewv426",
    },
  },
  {
    title: "JP Morgan DataForGood Hackathon",
    subtitle: "Winner",
    year: "2025",
    award: "Winner",
    techStack: ["Python", "Pandas", "Logistic Regression", "Data Analysis"],
    description: [
      "Partnered with NGO to analyze domestic violence survivor program data, identifying a critical service gap affecting adolescent children (ages 12-18) excluded from both childcare and adult workforce programs",
      "Built a logistic regression model using Python and scikit-learn to predict employment outcomes based on certification completion, achieving meaningful insights into program effectiveness",
      "Delivered data-driven recommendations to expand career development services to underserved youth, helping break intergenerational cycles of poverty through early intervention and skills training",
    ],
  },
];

export function Projects() {
  return (
    <section className="relative min-h-screen w-full py-20 px-8">
      {/* Section Title */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-white font-[Comfortaa] text-5xl md:text-7xl font-bold mb-4">
          Featured Projects
        </h2>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl">
          Explore my recent work in AI-powered applications, real-time systems,
          and data-driven solutions.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
