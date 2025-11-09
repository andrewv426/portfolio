import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface ProjectImage {
  image: string;
  label: string;
  demoUrl?: string;
  devpostUrl?: string;
}

const projectImages: ProjectImage[] = [
  {
    image: '/hacktx/home.webp',
    label: 'Homepage!',
    devpostUrl: 'https://devpost.com/software/project-ishaan?ref_content=my-projects-tab&ref_feature=my_projects'
  },
  {
    image: '/hacktx/create_join.webp',
    label: 'Create & Join Rooms',
    devpostUrl: 'https://devpost.com/software/project-ishaan?ref_content=my-projects-tab&ref_feature=my_projects'
  },
  {
    image: '/hacktx/roomDemo.webp',
    label: 'Room Demo',
    devpostUrl: 'https://devpost.com/software/project-ishaan?ref_content=my-projects-tab&ref_feature=my_projects'
  },
  {
    image: '/hacktx/demolecture.webp',
    label: 'Live Lecture Demo',
    devpostUrl: 'https://devpost.com/software/project-ishaan?ref_content=my-projects-tab&ref_feature=my_projects'
  },
  {
    image: '/hacktx/questionRoom.webp',
    label: 'Question Room',
    devpostUrl: 'https://devpost.com/software/project-ishaan?ref_content=my-projects-tab&ref_feature=my_projects'
  }
];

interface HackTXCarouselProps {
  parentHovered?: boolean;
}

export const HackTXCarousel: React.FC<HackTXCarouselProps> = ({ parentHovered = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (parentHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projectImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [parentHovered]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projectImages.length);
  }, []);

  const currentProject = useMemo(() => projectImages[currentIndex], [currentIndex]);

  return (
    <div
      className="relative w-full max-w-sm mx-auto"
      role="region"
      aria-label="HackTX project carousel"
    >
      {/* Project Image Display */}
      <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 hover:shadow-lg transition-all duration-300">
        {projectImages.map((project, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== currentIndex}
          >
            <img
              src={project.image}
              alt={project.label}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                index === currentIndex
                  ? 'scale-100 group-hover:scale-[1.03]'
                  : 'scale-95'
              }`}
              loading={index === currentIndex ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Navigation Buttons with Invisible Padding */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-800/70 backdrop-blur-md border border-gray-600/70 flex items-center justify-center transition-all duration-300 hover:bg-gray-700/90 z-10"
          aria-label="Previous project"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-800/70 backdrop-blur-md border border-gray-600/70 flex items-center justify-center transition-all duration-300 hover:bg-gray-700/90 z-10"
          aria-label="Next project"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Project Info */}
      <div className="mt-4 text-center mb-4">
        <h4 className="text-gray-900 font-semibold text-lg md:text-xl transition-all duration-700">
          {currentProject.label}
        </h4>
      </div>

      {/* Action Links */}
      <div className="flex gap-3 justify-center mb-4">
        <a
          href="https://hacktx25-production.up.railway.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-900/70 backdrop-blur-md border border-gray-700/70 text-white rounded-lg font-medium text-sm md:text-base transition-all duration-300 hover:bg-gray-800/90 hover:border-gray-600/90"
        >
          Demo Link
        </a>
        <a
          href={currentProject.devpostUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-900/70 backdrop-blur-md border border-gray-700/70 text-white rounded-lg font-medium text-sm md:text-base transition-all duration-300 hover:bg-gray-800/90 hover:border-gray-600/90"
        >
          Devpost Link
        </a>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2">
        {projectImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-6 bg-gray-900'
                : 'w-1.5 bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to project ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>
    </div>
  );
};
