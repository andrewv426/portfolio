import svgPaths from "./imports/svg-paths";
import PetalCanvas from "./components/PetalCanvas";

export default function App() {
  const scrollToSection = (section: string) => {
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
  };

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
          />
        </div>

        {/* Navigation Links */}
        <div className="absolute left-[138px] top-[17px] group z-10">
          <div className="absolute h-[12px] left-0 top-[23px] w-[15px] transition-opacity duration-300 group-hover:opacity-100 opacity-40">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 15 12"
            >
              <ellipse
                cx="7.5"
                cy="6"
                fill="white"
                id="Ellipse 2"
                rx="7.5"
                ry="6"
              />
            </svg>
          </div>
          <button
            onClick={() => scrollToSection("work")}
            className="font-['Inter:Regular',sans-serif] font-normal h-[45px] leading-[normal] ml-[42px] not-italic text-[40px] text-white cursor-pointer group-hover:-translate-y-2 transition-transform duration-300 ease-out block font-[Comfortaa]"
          >
            work
          </button>
        </div>

        <div className="absolute left-[388px] top-[17px] group z-10">
          <div className="absolute h-[12px] left-0 top-[23px] w-[15px] transition-opacity duration-300 group-hover:opacity-100 opacity-40">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 15 12"
            >
              <ellipse
                cx="7.5"
                cy="6"
                fill="white"
                id="Ellipse 2"
                rx="7.5"
                ry="6"
              />
            </svg>
          </div>
          <button
            onClick={() => scrollToSection("about")}
            className="font-['Inter:Regular',sans-serif] font-normal h-[45px] leading-[normal] ml-[42px] not-italic text-[40px] text-white cursor-pointer group-hover:-translate-y-2 transition-transform duration-300 ease-out block font-[Comfortaa]"
          >
            about
          </button>
        </div>

        <div className="absolute left-[668px] top-[17px] group z-10">
          <div className="absolute h-[12px] left-0 top-[23px] w-[14px] transition-opacity duration-300 group-hover:opacity-100 opacity-40">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 14 12"
            >
              <ellipse
                cx="7"
                cy="6"
                fill="white"
                id="Ellipse 1"
                rx="7"
                ry="6"
              />
            </svg>
          </div>
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
        <p className="absolute leading-[normal] left-[40px] not-italic text-[clamp(80px,11.5vw,220px)] text-white top-[250px] tracking-[0.05em] z-20" style={{ fontFamily: '"Font Awesome 6 Brands", sans-serif' }}>
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
          <div className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
            <div className="p-8 md:p-12">
              {/* Project Title - Always Visible (left-aligned) */}
              <h3 className="font-['Comfortaa',sans-serif] text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                HackTX
              </h3>

              {/* Project Details - Revealed on Hover */}
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-96 opacity-0 group-hover:opacity-100" style={{ transitionProperty: 'max-height, opacity' }}>
                <div className="pt-4 space-y-4">
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    Built a real-time presentation platform with live voice transcription and AI-powered summaries, enabling synchronized slide navigation and interactive Q&A for multiple concurrent users.
                  </p>

                  <div className="pt-2">
                    <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-3">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Next.js</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Socket.IO</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Node.js</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Firebase</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">AssemblyAI</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Gemini API</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-1.5 md:space-y-2">
                    <p className="text-gray-400 text-sm">• Architected Socket.IO infrastructure for real-time communication</p>
                    <p className="text-gray-400 text-sm">• Integrated AssemblyAI for live speech-to-text transcription</p>
                    <p className="text-gray-400 text-sm">• Implemented Google Gemini API for AI-generated slide summaries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* JPMC DataForGood Project */}
          <div className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
            <div className="p-8 md:p-12">
              {/* Project Title - Always Visible (left-aligned) */}
              <h3 className="font-['Comfortaa',sans-serif] text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                JPMC DataForGood
              </h3>

              {/* Project Details - Revealed on Hover */}
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-96 opacity-0 group-hover:opacity-100" style={{ transitionProperty: 'max-height, opacity' }}>
                <div className="pt-4 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                      Winner
                    </span>
                  </div>

                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    Partnered with NGO to analyze domestic violence survivor program data, identifying a critical service gap affecting adolescent children (ages 12-18) excluded from both childcare and adult workforce programs.
                  </p>

                  <div className="pt-2">
                    <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-3">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Python</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Pandas</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Logistic Regression</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Data Analysis</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-1.5 md:space-y-2">
                    <p className="text-gray-400 text-sm">• Built logistic regression model to predict employment outcomes</p>
                    <p className="text-gray-400 text-sm">• Delivered data-driven recommendations to expand career development services</p>
                    <p className="text-gray-400 text-sm">• Helped break intergenerational cycles of poverty through early intervention</p>
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
          <div className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
            <div className="p-8 md:p-12">
              {/* Education Title - Always Visible (left-aligned) */}
              <h3 className="font-['Comfortaa',sans-serif] text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                Education
              </h3>

              {/* Education Details - Revealed on Hover */}
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-96 opacity-0 group-hover:opacity-100" style={{ transitionProperty: 'max-height, opacity' }}>
                <div className="pt-4 space-y-4">
                  <div>
                    <h4 className="font-['Comfortaa',sans-serif] text-white text-2xl md:text-3xl font-semibold mb-1">
                      Texas A&M University
                    </h4>
                    <p className="text-gray-300 text-lg md:text-xl mb-2">College Station, TX</p>
                    <p className="text-gray-300 text-base md:text-lg mb-2">
                      B.S. in Computer Science, Minor in Mathematics
                    </p>
                    <p className="text-gray-400 text-sm md:text-base">May 2027</p>
                  </div>

                  <div className="pt-2">
                    <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-3">Relevant Coursework</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Analysis of Algorithms</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Data Structures & Algorithms</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Computer Architecture</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Probability & Statistics</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Discrete Math</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Linear Algebra</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Multivariable Calculus</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Card */}
          <div className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
            <div className="p-8 md:p-12">
              {/* Experience Title - Always Visible (left-aligned) */}
              <h3 className="font-['Comfortaa',sans-serif] text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                Experience
              </h3>

              {/* Experience Details - Revealed on Hover */}
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-[600px] opacity-0 group-hover:opacity-100" style={{ transitionProperty: 'max-height, opacity' }}>
                <div className="pt-4 space-y-6">
                  {/* LegacAI */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-['Comfortaa',sans-serif] text-white text-xl md:text-2xl font-semibold mb-1">
                          Software Engineer Intern
                        </h4>
                        <p className="text-gray-300 text-base md:text-lg mb-1">
                          LegacAI <span className="text-gray-400">•</span> Remote
                        </p>
                      </div>
                      <p className="text-gray-400 text-sm md:text-base whitespace-nowrap ml-4">June 2025 - September 2025</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">JavaScript</span>
                        <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">TypeScript</span>
                        <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">React</span>
                        <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Node.js</span>
                        <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">AWS</span>
                        <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Whisper</span>
                      </div>
                    </div>
                    <div className="pt-2 space-y-1.5 md:space-y-2">
                      <p className="text-gray-400 text-sm">• Engineered and deployed a full-stack AI note-taking platform using React, Node.js, and OpenAI Whisper, reducing meeting documentation time by 30% and increasing beta user engagement by 25%</p>
                      <p className="text-gray-400 text-sm">• Architected secure authentication with Google OAuth and AWS Cognito, designing a DynamoDB schema for role-based access control that achieved 99.99% uptime</p>
                      <p className="text-gray-400 text-sm">• Accelerated feature delivery by optimizing UI workflows and implementing CI/CD pipelines, enabling early launch of 3 major features within an agile, cross-functional team</p>
                    </div>
                  </div>

                  {/* medEaze */}
                  <div className="pt-2 border-t border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-['Comfortaa',sans-serif] text-white text-xl md:text-2xl font-semibold mb-1">
                          App Development Intern
                        </h4>
                        <p className="text-gray-300 text-base md:text-lg mb-1">
                          medEaze <span className="text-gray-400">•</span> Remote
                        </p>
                      </div>
                      <p className="text-gray-400 text-sm md:text-base whitespace-nowrap ml-4">Aug 2024 - Oct 2024</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Swift</span>
                        <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">React Native</span>
                        <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Figma</span>
                        <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Jest</span>
                      </div>
                    </div>
                    <div className="pt-2 space-y-1.5 md:space-y-2">
                      <p className="text-gray-400 text-sm">• Refactored Swift components to resolve UI lag and reduce mobile load times by 20% across core app modules</p>
                      <p className="text-gray-400 text-sm">• Integrated Gemini AI to create a prescription reminder chatbot, increasing daily user engagement by 15%</p>
                      <p className="text-gray-400 text-sm">• Established a testing framework using Jest with unit and integration tests in a CI/CD pipeline, decreasing post-deployment bugs by 40%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Awards Card */}
          <div className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
            <div className="p-8 md:p-12">
              {/* Awards Title - Always Visible (left-aligned) */}
              <h3 className="font-['Comfortaa',sans-serif] text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                Awards
              </h3>

              {/* Awards Details - Revealed on Hover */}
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-96 opacity-0 group-hover:opacity-100" style={{ transitionProperty: 'max-height, opacity' }}>
                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                      Winner
                    </span>
                    <p className="text-gray-300 text-base md:text-lg">Winner of JPMC DataForGood Hackathon</p>
                  </div>
                  
                  <p className="text-gray-300 text-base md:text-lg">1st Place NorthMark Quantitative Trading Competition</p>
                  
                  <p className="text-gray-300 text-base md:text-lg">Craig and Galen Brown Engineering Honors Program</p>
                  
                  <p className="text-gray-300 text-base md:text-lg">National Merit Commended Scholar</p>
                  
                  <p className="text-gray-300 text-base md:text-lg">The George Foundation Higher Education Scholarship</p>
                  
                  <p className="text-gray-300 text-base md:text-lg">Youth In Philanthropy Scholarship</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interests Card */}
          <div className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
            <div className="p-8 md:p-12">
              {/* Interests Title - Always Visible (left-aligned) */}
              <h3 className="font-['Comfortaa',sans-serif] text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                Interests
              </h3>

              {/* Interests Details - Revealed on Hover */}
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-96 opacity-0 group-hover:opacity-100" style={{ transitionProperty: 'max-height, opacity' }}>
                <div className="pt-4 space-y-4">
                  {/* Technical Interests */}
                  <div>
                    <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-3">Technical Interests</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">UI Design & Animations</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Web Development</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Machine Learning</span>
                      <span className="px-3 md:px-4 py-1.5 bg-[#2a2a2a] text-gray-200 rounded-lg text-xs md:text-sm font-medium">Embedded Systems</span>
                    </div>
                  </div>

                  {/* Fun Interests */}
                  <div className="pt-2">
                    <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-3">Fun Interests</p>
                    <div className="space-y-2">
                      <p className="text-gray-300 text-base md:text-lg">🏀 Basketball (Houston Rockets!)</p>
                      <p className="text-gray-300 text-base md:text-lg">🎮 Video Games: Valorant, League of Legends, Counter-Strike</p>
                      <p className="text-gray-300 text-base md:text-lg">🎵 Music: Daniel Caesar, Bryson Tiller, Drake</p>
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
      </section>
    </div>
  );
}