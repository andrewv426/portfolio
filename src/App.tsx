import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PetalCanvas from "./components/PetalCanvas";
import { MusicCarousel } from "./components/MusicCarousel";
import { HackTXCarousel } from "./components/HackTXCarousel";
import { DFGCarousel } from "./components/DFGCarousel";
import { InterestIcon } from "./components/InterestIcon";
import { NavDot } from "./components/NavDot";
import { TechTag } from "./components/TechTag";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const PAGE_SCALE = 0.8;

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLParagraphElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLElement>(null);
  const workContentRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'work', target: 'work' },
    { label: 'about', target: 'about' },
    { label: 'connect', target: 'connect' },
  ];

  const scaledWrapperStyle = useMemo(() => ({
    transform: `scale(${PAGE_SCALE})`,
    transformOrigin: 'top left',
    width: `${(1 / PAGE_SCALE) * 100}%`
  }), []);


  // Hover states for carousel parent cards
  const [hackTXHovered, setHackTXHovered] = useState(false);
  const [dfgHovered, setDfgHovered] = useState(false);
  const [interestsHovered, setInterestsHovered] = useState(false);

  // Card expanded states for mobile tap functionality
  const [cardStates, setCardStates] = useState({
    hacktx: false,
    dfg: false,
    education: false,
    experience: false,
    awards: false,
    interests: false,
  });

  const toggleCard = (cardName: keyof typeof cardStates) => {
    setCardStates(prev => ({
      ...prev,
      [cardName]: !prev[cardName],
    }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      const heroText = heroTextRef.current;
      const nav = navBarRef.current;
      const workSection = workSectionRef.current;
      const workContent = workContentRef.current;

      if (hero) {
        const heroScrollConfig = {
          trigger: hero,
          start: 'top top',
          end: () => `+=${(hero.offsetHeight || window.innerHeight) * 0.85}`,
          scrub: 0.3,
          invalidateOnRefresh: true,
        } as ScrollTrigger.Vars;

        gsap.to(hero, {
          scale: 0.9,
          transformOrigin: 'center top',
          ease: 'power1.out',
          scrollTrigger: heroScrollConfig,
        });

        if (heroText) {
          gsap.to(heroText, {
            opacity: 0,
            scale: 0.7,
            ease: 'power1.out',
            scrollTrigger: heroScrollConfig,
          });
        }

        if (nav) {
          gsap.to(nav, {
            opacity: 0.15,
            ease: 'power1.out',
            scrollTrigger: heroScrollConfig,
          });
        }
      }

      if (workSection && workContent) {
        gsap.set(workContent, {
          willChange: 'transform, filter, opacity',
          transformOrigin: 'center center'
        });

        gsap.fromTo(
          workContent,
          {
            opacity: 0,
            scale: 0.7,
            filter: 'blur(18px)',
            yPercent: 25
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            yPercent: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: workSection,
              start: 'top bottom',
              end: 'top 25%',
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

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
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[#d9d9d9]">
      {/* Background */}
      <div className="absolute inset-0 w-full min-h-screen bg-[#d9d9d9] z-0" />
      {/* Falling cherry blossom overlay (kept behind content) */}
      <PetalCanvas />

      <div className="relative z-20" style={scaledWrapperStyle}>
        {/* Navigation Bar */}
        <div
          ref={navBarRef}
          className="absolute bg-white/20 backdrop-blur-md h-[clamp(60px,10vh,80px)] left-1/2 -translate-x-1/2 rounded-[clamp(15px,2.5vw,25px)] w-[min(1000px,92vw)] max-w-[1000px] border border-white/30 shadow-lg z-50 flex items-center justify-center"
          style={{ willChange: 'opacity, transform', top: 'max(clamp(24px, 6vh, 60px), env(safe-area-inset-top, 24px))', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          {/* Smiley Icon */}
          <div
            className="absolute flex items-center"
            style={{ left: 'clamp(12px,3vw,32px)', top: '50%', transform: 'translateY(-50%)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <img
              src="/smiley.png"
              alt="Smiley"
              className="w-[clamp(36px,6vw,45px)] h-[clamp(36px,6vw,45px)] object-contain brightness-0 invert"
              loading="lazy"
            />
          </div>

          {/* Navigation Links */}
          <div
            className="flex items-center"
            style={{ gap: 'clamp(20px,6vw,140px)', paddingLeft: 'clamp(0px,8vw,60px)', transition: 'gap 0.3s ease-out, padding 0.3s ease-out' }}
          >
            {navItems.map(({ label, target }) => (
              <div key={label} className="relative group">
                <NavDot />
                <button
                  onClick={() => scrollToSection(target)}
                  className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[clamp(16px,4vw,38px)] text-white cursor-pointer group-hover:-translate-y-2 transition-all duration-300 ease-out hover:text-white/90 block font-[Comfortaa] pl-[clamp(28px,4.5vw,42px)]"
                >
                  {label}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <div
          ref={heroRef}
          id="hero"
          className="relative min-h-screen"
          style={{ zIndex: 10, willChange: 'transform' }}
        >
        <p
          ref={heroTextRef}
          className="absolute leading-[normal] left-[40px] not-italic text-[clamp(64px,11.8vw,220px)] text-white top-[250px] tracking-[0.05em] z-20 font-medium"
          style={{
            fontFamily: '"Font Awesome 6 Brands", sans-serif',
            willChange: 'transform, opacity'
          }}
        >
          ANDREW
          <br />
          VONG
        </p>
        </div>

        {/* Work/Projects Section */}
        <section
          ref={workSectionRef}
          id="work"
          className="relative min-h-screen"
        >
        <div ref={workContentRef} className="relative z-20">
          <h2
            className="font-['Comfortaa',sans-serif] text-left pl-[40px] pt-[80px] font-bold text-white"
            style={{ fontSize: 'clamp(25px, 5vw, 100px)' }}
          >
            work
          </h2>

          {/* Projects Container */}
          <div className="px-[40px] pt-[40px] pb-[80px] space-y-6 w-full">
            {/* HackTX Project */}
            <div
              data-work-card="true"
              className={`card-container group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-700 ease-in-out cursor-pointer border border-white/50 origin-top ${cardStates.hacktx ? 'card-expanded' : ''}`}
              onClick={() => {
                toggleCard('hacktx');
                setHackTXHovered(!cardStates.hacktx);
              }}
            >
              <div className="p-8 md:p-12">
                {/* Project Title - Animates to center on hover when closed */}
                <div className="card-title-wrapper">
                  <h3 className="card-title font-['Comfortaa',sans-serif] text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                    HackTX
                  </h3>
                </div>

                {/* Project Details - Revealed on Click */}
                <div className={`card-expanded-content transition-all duration-700 ease-in-out max-h-0 opacity-0 overflow-hidden ${cardStates.hacktx ? 'max-h-[85vh] md:max-h-[950px] lg:max-h-[850px] opacity-100 overflow-y-auto scrollbar-hide touch-pan-y' : ''}`} style={{ transitionProperty: 'max-height, opacity' }}>
                  <div className="pt-4">
                    {/* Responsive Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column - Project Details */}
                      <div className="space-y-4">
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

                      {/* Right Column - HackTX Carousel */}
                      <div className="flex items-center justify-center lg:justify-end">
                        <HackTXCarousel parentHovered={hackTXHovered} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* JPMC DataForGood Project */}
            <div
              data-work-card="true"
              className={`card-container group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-700 ease-in-out cursor-pointer border border-white/50 origin-top ${cardStates.dfg ? 'card-expanded' : ''}`}
              onClick={() => {
                toggleCard('dfg');
                setDfgHovered(!cardStates.dfg);
              }}
            >
              <div className="p-8 md:p-12">
                {/* Project Title - Animates to center on hover when closed */}
                <div className="card-title-wrapper">
                  <h3 className="card-title font-['Comfortaa',sans-serif] text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                    JPMC DataForGood
                  </h3>
                </div>

                {/* Project Details - Revealed on Click */}
                <div className={`card-expanded-content transition-all duration-700 ease-in-out max-h-0 opacity-0 overflow-hidden ${cardStates.dfg ? 'max-h-[85vh] md:max-h-[950px] lg:max-h-[850px] opacity-100 overflow-y-auto scrollbar-hide touch-pan-y' : ''}`} style={{ transitionProperty: 'max-height, opacity' }}>
                  <div className="pt-4">
                    {/* Responsive Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column - Project Details */}
                      <div className="space-y-4">
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

                      {/* Right Column - DFG Carousel */}
                      <div className="flex items-center justify-center lg:justify-end">
                        <DFGCarousel parentHovered={dfgHovered} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative min-h-screen">
        <h2 className="font-['Comfortaa',sans-serif] text-left pl-[40px] pt-[80px] font-bold text-white relative z-20" style={{ fontSize: 'clamp(25px, 5vw, 100px)' }}>
          about
        </h2>

        {/* Education Card */}
        <div className="px-[40px] pt-[40px] pb-[80px] space-y-6 w-full relative z-20">
          <div className={`card-container group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-700 ease-in-out cursor-pointer border border-white/50 origin-top ${cardStates.education ? 'card-expanded' : ''}`} onClick={() => toggleCard('education')}>
            <div className="p-8 md:p-12">
              {/* Education Title - Animates to center on hover when closed */}
              <div className="card-title-wrapper">
                <h3 className="card-title font-['Comfortaa',sans-serif] text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                  Education
                </h3>
              </div>

              {/* Education Details - Revealed on Click */}
              <div className={`card-expanded-content transition-all duration-700 ease-in-out max-h-0 opacity-0 overflow-hidden ${cardStates.education ? 'max-h-[70vh] md:max-h-[500px] lg:max-h-96 opacity-100 overflow-y-auto scrollbar-hide touch-pan-y' : ''}`} style={{ transitionProperty: 'max-height, opacity' }}>
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
          <div className={`card-container group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-700 ease-in-out cursor-pointer border border-white/50 origin-top ${cardStates.experience ? 'card-expanded' : ''}`} onClick={() => toggleCard('experience')}>
            <div className="p-8 md:p-12">
              {/* Experience Title - Animates to center on hover when closed */}
              <div className="card-title-wrapper">
                <h3 className="card-title font-['Comfortaa',sans-serif] text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                  Experience
                </h3>
              </div>

              {/* Experience Details - Revealed on Click */}
              <div className={`card-expanded-content transition-all duration-700 ease-in-out max-h-0 opacity-0 overflow-hidden ${cardStates.experience ? 'max-h-[85vh] md:max-h-[1000px] lg:max-h-[900px] opacity-100 overflow-y-auto scrollbar-hide touch-pan-y' : ''}`} style={{ transitionProperty: 'max-height, opacity' }}>
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

                  {/* Dau International */}
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-['Comfortaa',sans-serif] text-gray-900 text-xl md:text-2xl font-semibold mb-1">
                          Data Analyst Intern
                        </h4>
                        <p className="text-gray-700 text-base md:text-lg mb-1">
                          Dau International <span className="text-gray-600">•</span> Austin, TX
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base whitespace-nowrap ml-4">Dec 2024 - Mar 2025</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-gray-600 text-xs md:text-sm uppercase tracking-wider mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <TechTag>Python</TechTag>
                        <TechTag>SQL</TechTag>
                        <TechTag>Web Scraping</TechTag>
                      </div>
                    </div>
                    <div className="pt-2 space-y-1.5 md:space-y-2">
                      <p className="text-gray-600 text-sm">• Built a Python-based resume parser that extracted structured data from LinkedIn profiles, improving match accuracy by 27%</p>
                      <p className="text-gray-600 text-sm">• Automated SQL pipelines for resume data validation, reducing import errors by 35% and streamlining recruiter workflows</p>
                      <p className="text-gray-600 text-sm">• Developed sourcing tools to identify senior engineers for a pre-IPO $1B cybersecurity client, enhancing targeting precision and increasing qualified lead generation by 30%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Awards Card */}
          <div className={`card-container group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-700 ease-in-out cursor-pointer border border-white/50 origin-top ${cardStates.awards ? 'card-expanded' : ''}`} onClick={() => toggleCard('awards')}>
            <div className="p-8 md:p-12">
              {/* Awards Title - Animates to center on hover when closed */}
              <div className="card-title-wrapper">
                <h3 className="card-title font-['Comfortaa',sans-serif] text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                  Awards
                </h3>
              </div>

              {/* Awards Details - Revealed on Click */}
              <div className={`card-expanded-content transition-all duration-700 ease-in-out max-h-0 opacity-0 overflow-hidden ${cardStates.awards ? 'max-h-[70vh] md:max-h-[500px] lg:max-h-96 opacity-100 overflow-y-auto scrollbar-hide touch-pan-y' : ''}`} style={{ transitionProperty: 'max-height, opacity' }}>
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
          <div
            className={`card-container group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-700 ease-in-out cursor-pointer border border-white/50 origin-top ${cardStates.interests ? 'card-expanded' : ''}`}
            onClick={() => {
              toggleCard('interests');
              setInterestsHovered(!cardStates.interests);
            }}
          >
            <div className="p-8 md:p-12">
              {/* Interests Title - Animates to center on hover when closed */}
              <div className="card-title-wrapper">
                <h3 className="card-title font-['Comfortaa',sans-serif] text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                  Interests
                </h3>
              </div>

              {/* Interests Details - Revealed on Click */}
              <div className={`card-expanded-content transition-all duration-700 ease-in-out max-h-0 opacity-0 overflow-hidden ${cardStates.interests ? 'max-h-[85vh] md:max-h-[750px] lg:max-h-[650px] opacity-100 overflow-y-auto scrollbar-hide touch-pan-y' : ''}`} style={{ transitionProperty: 'max-height, opacity' }}>
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
                          <div className="flex items-center gap-2 text-gray-700 text-base md:text-lg">
                            <InterestIcon type="basketball" size={32} />
                            <span>Basketball (Houston Rockets!)</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 text-base md:text-lg">
                            <InterestIcon type="videogames" size={32} />
                            <span>Video Games: Valorant, League of Legends, Counter-Strike</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 text-base md:text-lg">
                            <InterestIcon type="music" size={32} />
                            <span>Music: Daniel Caesar, keshi, Drake</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Music Carousel */}
                    <div className="flex items-center justify-center lg:justify-end">
                      <MusicCarousel parentHovered={interestsHovered} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* Connect Section */}
        <section id="connect" className="relative min-h-screen">
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
            className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-700 ease-in-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer border border-white/50 block origin-top"
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
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
            className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-700 ease-in-out hover:scale-[1.02] hover:shadow-2xl cursor-pointer border border-white/50 block origin-top"
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
    </div>
  );
}
