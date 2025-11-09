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

export const HackTXCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projectImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projectImages.length);
  }, []);

  const currentProject = useMemo(() => projectImages[currentIndex], [currentIndex]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isModalOpen]);

  return (
    <div
      className="relative w-full max-w-sm mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="HackTX project carousel"
    >
      {/* Project Image Display */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => setIsModalOpen(true)}>
        {projectImages.map((project, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
            aria-hidden={index !== currentIndex}
          >
            <img
              src={project.image}
              alt={project.label}
              className="w-full h-full object-cover"
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

      {/* Expanded Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Expanded image view"
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-white/95 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/50 flex items-center justify-center transition-all duration-300 hover:bg-white z-10"
              aria-label="Close expanded image"
            >
              <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="relative w-full h-full bg-gray-100 rounded-t-2xl overflow-hidden">
              <img
                src={currentProject.image}
                alt={currentProject.label}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Label and Navigation */}
            <div className="p-6 bg-white border-t border-gray-200">
              <h3 className="text-gray-900 font-semibold text-xl mb-4 text-center">
                {currentProject.label}
              </h3>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center">
                <button
                  onClick={goToPrevious}
                  className="px-4 py-2 bg-gray-900/70 backdrop-blur-md border border-gray-700/70 text-white rounded-lg font-medium text-sm transition-all duration-300 hover:bg-gray-800/90 hover:border-gray-600/90"
                  aria-label="Previous project"
                >
                  ← Previous
                </button>

                <div className="flex gap-2 justify-center">
                  {projectImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'w-6 bg-gray-900'
                          : 'w-2 bg-gray-400 hover:bg-gray-600'
                      }`}
                      aria-label={`Go to project ${index + 1}`}
                      aria-current={index === currentIndex}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  className="px-4 py-2 bg-gray-900/70 backdrop-blur-md border border-gray-700/70 text-white rounded-lg font-medium text-sm transition-all duration-300 hover:bg-gray-800/90 hover:border-gray-600/90"
                  aria-label="Next project"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
