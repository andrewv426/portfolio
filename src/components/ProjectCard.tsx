import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "./ui/utils";

export interface ProjectData {
  title: string;
  subtitle: string;
  description: string[];
  techStack: string[];
  year: string;
  award?: string;
  links?: {
    github?: string;
    live?: string;
  };
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "opacity-0 translate-y-10 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0"
      )}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <Card
        className={cn(
          "group relative overflow-hidden",
          "bg-white/20 backdrop-blur-md border-white/30",
          "hover:bg-white/30 hover:shadow-2xl hover:-translate-y-2",
          "transition-all duration-500 ease-out",
          "hover:scale-[1.02]"
        )}
      >
        <CardHeader className="pb-3 pt-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-2xl font-bold text-white font-[Comfortaa]">
                  {project.title}
                </CardTitle>
                {project.award && (
                  <span className="bg-yellow-400/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {project.award}
                  </span>
                )}
              </div>
              <CardDescription className="text-white/80 text-base font-medium">
                {project.subtitle}
              </CardDescription>
            </div>
            <span className="text-white/60 text-sm font-semibold whitespace-nowrap">
              {project.year}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20 hover:bg-white/30 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description Points */}
          <ul className="space-y-2 text-white/90 text-sm">
            {project.description.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-white/60 mt-1">•</span>
                <span className="flex-1">{point}</span>
              </li>
            ))}
          </ul>

          {/* Links */}
          {project.links && (
            <div className="flex gap-3 pt-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium underline decoration-white/30 hover:decoration-white"
                >
                  GitHub
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium underline decoration-white/30 hover:decoration-white"
                >
                  Live Demo
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
