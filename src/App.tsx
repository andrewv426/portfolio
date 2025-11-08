import { useCallback } from 'react';
import PetalCanvas from "./components/PetalCanvas";
import { MusicCarousel } from "./components/MusicCarousel";
import { NavDot } from "./components/NavDot";
import { TechTag } from "./components/TechTag";

export default function App() {
  const scrollToSection = useCallback((section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const offset = 100; // Offset to account for navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <div className="bg-white relative w-full">
      {/* Background */}
      <div className="absolute bg-[#d9d9d9] min-h-screen left-0 top-0 w-full z-0" />
      {/* Falling cherry blossom overlay (kept behind content) */}
      <PetalCanvas />

      {/* Navigation Bar */}
      <div className="absolute bg-white/20 backdrop-blur-md h-[80px] left-1/2 -translate-x-1/2 rounded-[25px] top-[60px] w-[min(1000px,85vw)] max-w-[1000px] border border-white/30 shadow-lg z-50">
        {/* Smiley Icon */}
        <div className="absolute left-[35px] top-[17px]">
          <img
            src="/smiley.png"
            alt="Smiley"
            className="w-[45px] h-[45px] object-contain brightness-0 invert"
            loading="lazy"
          />
        </div>

        {/* Navigation Links */}
        <div className="absolute left-[138px] top-[17px] group z-10">
          <NavDot />
          <button
            onClick={() => scrollToSection("work")}
            className="font-['Inter:Regular',sans-serif] font-normal h-[45px] leading-[normal] ml-[42px] not-italic text-[40px] text-white cursor-pointer group-hover:-translate-y-2 transition-transform duration-300 ease-out block font-[Comfortaa]"
          >
            work
          </button>
        </div>

        <div className="absolute left-[388px] top-[17px] group z-10">
          <NavDot />
          <button
            onClick={() => scrollToSection("about")}
            className="font-['Inter:Regular',sans-serif] font-normal h-[45px] leading-[normal] ml-[42px] not-italic text-[40px] text-white cursor-pointer group-hover:-translate-y-2 transition-transform duration-300 ease-out block font-[Comfortaa]"
          >
            about
          </button>
        </div>

        <div className="absolute left-[668px] top-[17px] group z-10">
          <NavDot />
          <button
            onClick={() => scrollToSection("connect")}
            className="font-['Inter:Regular',sans-serif] font-normal h-[45px] leading-[normal] ml-[41px] not-italic text-[40px] text-white cursor-pointer group-hover:-translate-y-2 transition-transform duration-300 ease-out block font-[Comfortaa]"
          >
            connect
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div id="hero" className="relative min-h-screen">
        <p className="absolute leading-[normal] left-[40px] not-italic text-[clamp(80px,11.5vw,220px)] text-white top-[250px] tracking-[0.05em] z-20 font-medium" style={{ fontFamily: '"Font Awesome 6 Brands", sans-serif' }}>
          ANDREW
          <br />
          VONG
        </p>
      </div>

      {/* Work/Projects Section */}
      <section id="work" className="relative min-h-screen bg-[#d9d9d9]">
        <h2 className="font-['Comfortaa',sans-serif] text-left pl-[40px] pt-[80px] font-bold text-white relative z-20" style={{ fontSize: 'clamp(25px, 5vw, 100px)' }}>
          work
        </h2>

        {/* Projects Container */}
        <div className="px-[40px] pt-[40px] pb-[80px] space-y-6 w-full relative z-20">
          {/* HackTX Project */}
          <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer border border-white/50">
            <div className="p-8 md:p-12">
              {/* Project Title - Always Visible (left-aligned) */}
              <h3 className="font-['Comfortaa',sans-serif] text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                HackTX
              </h3>

              {/* Project Details - Revealed on Hover */}
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-96 opacity-0 group-hover:opacity-100" style={{ transitionProperty: 'max-height, opacity' }}>
                <div className="pt-4 space-y-4">
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Built a real-time presentation platform with live voice transcription and AI-powered summaries, enabling synchronized slide navigation and interactive Q&A for multiple concurrent users.
                  </p>

                  <div className="pt-2">
                    <p className="text-gray-600 text-xs md:text-sm uppercase tracking-wider mb-3">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      <TechTag>Next.js</TechTag>
                      <TechTag>Socket.IO</TechTag>
                      <TechTag>Node.js</TechTag>
                      <TechTag>Firebase</TechTag>
                      <TechTag>AssemblyAI</TechTag>
                      <TechTag>Gemini API</TechTag>
                    </div>
                  </div>

                  <div className="pt-2 space-y-1.5 md:space-y-2">
                    <p className="text-gray-600 text-sm">• Architected Socket.IO infrastructure for real-time communication</p>
                    <p className="text-gray-600 text-sm">• Integrated AssemblyAI for live speech-to-text transcription</p>
                    <p className="text-gray-600 text-sm">• Implemented Google Gemini API for AI-generated slide summaries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* JPMC DataForGood Project */}
          <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer border border-white/50">
            <div className="p-8 md:p-12">
              {/* Project Title - Always Visible (left-aligned) */}
              <h3 className="font-['Comfortaa',sans-serif] text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                JPMC DataForGood
              </h3>

              {/* Project Details - Revealed on Hover */}
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-96 opacity-0 group-hover:opacity-100" style={{ transitionProperty: 'max-height, opacity' }}>
                <div className="pt-4 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-yellow-600/20 text-yellow-700 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                      Winner
                    </span>
                  </div>

                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    Partnered with NGO to analyze domestic violence survivor program data, identifying a critical service gap affecting adolescent children (ages 12-18) excluded from both childcare and adult workforce programs.
                  </p>

                  <div className="pt-2">
                    <p className="text-gray-600 text-xs md:text-sm uppercase tracking-wider mb-3">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      <TechTag>Python</TechTag>
                      <TechTag>Pandas</TechTag>
                      <TechTag>Logistic Regression</TechTag>
                      <TechTag>Data Analysis</TechTag>
                    </div>
                  </div>

                  <div className="pt-2 space-y-1.5 md:space-y-2">
                    <p className="text-gray-600 text-sm">• Built logistic regression model to predict employment outcomes</p>
                    <p className="text-gray-600 text-sm">• Delivered data-driven recommendations to expand career development services</p>
                    <p className="text-gray-600 text-sm">• Helped break intergenerational cycles of poverty through early intervention</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen bg-[#d9d9d9]">
        <h2 className="font-['Comfortaa',sans-serif] text-left pl-[40px] pt-[80px] font-bold text-white relative z-20" style={{ fontSize: 'clamp(25px, 5vw, 100px)' }}>
          about
        </h2>

        {/* Education Card */}
        <div className="px-[40px] pt-[40px] pb-[80px] space-y-6 w-full relative z-20">
          <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer border border-white/50">
            <div className="p-8 md:p-12">
              {/* Education Title - Always Visible (left-aligned) */}
              <h3 className="font-['Comfortaa',sans-serif] text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                Education
              </h3>

              {/* Education Details - Revealed on Hover */}
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-96 opacity-0 group-hover:opacity-100" style={{ transitionProperty: 'max-height, opacity' }}>
                <div className="pt-4 space-y-4">
                  <div>
                    <h4 className="font-['Comfortaa',sans-serif] text-gray-900 text-2xl md:text-3xl font-semibold mb-1">
                      Texas A&M University
                    </h4>
                    <p className="text-gray-700 text-lg md:text-xl mb-2">College Station, TX</p>
                    <p className="text-gray-700 text-base md:text-lg mb-2">
                      B.S. in Computer Science, Minor in Mathematics
                    </p>
                    <p className="text-gray-600 text-sm md:text-base">May 2027</p>
                  </div>

                  <div className="pt-2">
                    <p className="text-gray-600 text-xs md:text-sm uppercase tracking-wider mb-3">Relevant Coursework</p>
                    <div className="flex flex-wrap gap-2">
                      <TechTag>Analysis of Algorithms</TechTag>
                      <TechTag>Data Structures & Algorithms</TechTag>
                      <TechTag>Computer Architecture</TechTag>
                      <TechTag>Probability & Statistics</TechTag>
                      <TechTag>Discrete Math</TechTag>
                      <TechTag>Linear Algebra</TechTag>
                      <TechTag>Multivariable Calculus</TechTag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Card */}
          <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer border border-white/50">
            <div className="p-8 md:p-12">
              {/* Experience Title - Always Visible (left-aligned) */}
              <h3 className="font-['Comfortaa',sans-serif] text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                Experience
              </h3>

              {/* Experience Details - Revealed on Hover */}
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-[600px] opacity-0 group-hover:opacity-100" style={{ transitionProperty: 'max-height, opacity' }}>
                <div className="pt-4 space-y-6">
                  {/* LegacAI */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-['Comfortaa',sans-serif] text-gray-900 text-xl md:text-2xl font-semibold mb-1">
                          Software Engineer Intern
                        </h4>
                        <p className="text-gray-700 text-base md:text-lg mb-1">
                          LegacAI <span className="text-gray-600">•</span> Remote
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base whitespace-nowrap ml-4">June 2025 - September 2025</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-gray-600 text-xs md:text-sm uppercase tracking-wider mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <TechTag>JavaScript</TechTag>
                        <TechTag>TypeScript</TechTag>
                        <TechTag>React</TechTag>
                        <TechTag>Node.js</TechTag>
                        <TechTag>AWS</TechTag>
                        <TechTag>Whisper</TechTag>
                      </div>
                    </div>
                    <div className="pt-2 space-y-1.5 md:space-y-2">
                      <p className="text-gray-600 text-sm">• Engineered and deployed a full-stack AI note-taking platform using React, Node.js, and OpenAI Whisper, reducing meeting documentation time by 30% and increasing beta user engagement by 25%</p>
                      <p className="text-gray-600 text-sm">• Architected secure authentication with Google OAuth and AWS Cognito, designing a DynamoDB schema for role-based access control that achieved 99.99% uptime</p>
                      <p className="text-gray-600 text-sm">• Accelerated feature delivery by optimizing UI workflows and implementing CI/CD pipelines, enabling early launch of 3 major features within an agile, cross-functional team</p>
                    </div>
                  </div>

                  {/* medEaze */}
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-['Comfortaa',sans-serif] text-gray-900 text-xl md:text-2xl font-semibold mb-1">
                          App Development Intern
                        </h4>
                        <p className="text-gray-700 text-base md:text-lg mb-1">
                          medEaze <span className="text-gray-600">•</span> Remote
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base whitespace-nowrap ml-4">Aug 2024 - Oct 2024</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-gray-600 text-xs md:text-sm uppercase tracking-wider mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <TechTag>Swift</TechTag>
                        <TechTag>React Native</TechTag>
                        <TechTag>Figma</TechTag>
                        <TechTag>Jest</TechTag>
                      </div>
                    </div>
                    <div className="pt-2 space-y-1.5 md:space-y-2">
                      <p className="text-gray-600 text-sm">• Refactored Swift components to resolve UI lag and reduce mobile load times by 20% across core app modules</p>
                      <p className="text-gray-600 text-sm">• Integrated Gemini AI to create a prescription reminder chatbot, increasing daily user engagement by 15%</p>
                      <p className="text-gray-600 text-sm">• Established a testing framework using Jest with unit and integration tests in a CI/CD pipeline, decreasing post-deployment bugs by 40%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Awards Card */}
          <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer border border-white/50">
            <div className="p-8 md:p-12">
              {/* Awards Title - Always Visible (left-aligned) */}
              <h3 className="font-['Comfortaa',sans-serif] text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                Awards
              </h3>

              {/* Awards Details - Revealed on Hover */}
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-96 opacity-0 group-hover:opacity-100" style={{ transitionProperty: 'max-height, opacity' }}>
                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-yellow-600/20 text-yellow-700 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                      Winner
                    </span>
                    <p className="text-gray-700 text-base md:text-lg">Winner of JPMC DataForGood Hackathon</p>
                  </div>

                  <p className="text-gray-700 text-base md:text-lg">1st Place NorthMark Quantitative Trading Competition</p>

                  <p className="text-gray-700 text-base md:text-lg">Craig and Galen Brown Engineering Honors Program</p>

                  <p className="text-gray-700 text-base md:text-lg">National Merit Commended Scholar</p>

                  <p className="text-gray-700 text-base md:text-lg">The George Foundation Higher Education Scholarship</p>

                  <p className="text-gray-700 text-base md:text-lg">Youth In Philanthropy Scholarship</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interests Card */}
          <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer border border-white/50">
            <div className="p-8 md:p-12">
              {/* Interests Title - Always Visible (left-aligned) */}
              <h3 className="font-['Comfortaa',sans-serif] text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                Interests
              </h3>

              {/* Interests Details - Revealed on Hover */}
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-[600px] opacity-0 group-hover:opacity-100" style={{ transitionProperty: 'max-height, opacity' }}>
                <div className="pt-4">
                  {/* Responsive Grid Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Interests List */}
                    <div className="space-y-4">
                      {/* Technical Interests */}
                      <div>
                        <p className="text-gray-600 text-xs md:text-sm uppercase tracking-wider mb-3">Technical Interests</p>
                        <div className="flex flex-wrap gap-2">
                          <TechTag>UI Design & Animations</TechTag>
                          <TechTag>Web Development</TechTag>
                          <TechTag>Machine Learning</TechTag>
                          <TechTag>Embedded Systems</TechTag>
                        </div>
                      </div>

                      {/* Fun Interests */}
                      <div className="pt-2">
                        <p className="text-gray-600 text-xs md:text-sm uppercase tracking-wider mb-3">Fun Interests</p>
                        <div className="space-y-2">
                          <p className="text-gray-700 text-base md:text-lg">🏀 Basketball (Houston Rockets!)</p>
                          <p className="text-gray-700 text-base md:text-lg">🎮 Video Games: Valorant, League of Legends, Counter-Strike</p>
                          <p className="text-gray-700 text-base md:text-lg">🎵 Music: Daniel Caesar, Bryson Tiller, Drake</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Music Carousel */}
                    <div className="flex items-center justify-center lg:justify-end">
                      <MusicCarousel />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="relative min-h-screen bg-[#d9d9d9]">
        <h2 className="font-['Comfortaa',sans-serif] text-left pl-[40px] pt-[80px] font-bold text-white relative z-20" style={{ fontSize: 'clamp(25px, 5vw, 100px)' }}>
          connect
        </h2>

        {/* Contact Links Container */}
        <div className="px-[40px] pt-[40px] pb-[80px] space-y-6 w-full relative z-20">
          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/andrew-vong-codes/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer border border-white/50 block"
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
                <div>
                  <h3 className="font-['Comfortaa',sans-serif] text-gray-900 text-2xl md:text-3xl font-bold">
                    LinkedIn
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mt-1">andrew-vong-codes</p>
                </div>
              </div>
            </div>
          </a>

          {/* Email Card */}
          <a
            href="mailto:andrewvong426@gmail.com"
            className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer border border-white/50 block"
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="font-['Comfortaa',sans-serif] text-gray-900 text-2xl md:text-3xl font-bold">
                    Email
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mt-1">andrewvong426@gmail.com</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}