# Andrew Vong's Portfolio Website

A modern, responsive portfolio website showcasing projects, experience, and interests. Built with React, TypeScript, and Tailwind CSS, featuring smooth animations and an elegant cherry blossom theme.

## Tech Stack

### Core Technologies
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript with strict mode
- **Vite 6.4.1** - Fast build tool with HMR
- **Tailwind CSS v4** - Utility-first CSS framework

### Key Libraries
- **GSAP 3.13** - Professional-grade animations with ScrollTrigger
- **clsx** - Conditional className utility
- **tailwind-merge** - Merge Tailwind classes intelligently

### Development Tools
- **SWC** - Fast TypeScript/JavaScript compiler
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting

## Features

### Responsive Design
- **Mobile-first** approach with Tailwind breakpoints
- **Fluid typography** using CSS clamp() for smooth scaling across devices
- Tested across viewports: 360px (mobile) to 1920px (desktop)
- Touch-optimized interactions for mobile devices

### Animations
- Custom **falling cherry blossom petals** canvas animation
- Smooth scroll-triggered animations using GSAP ScrollTrigger
- Interactive carousels with auto-rotation
- Butter-smooth transitions (700ms ease-in-out)

### Components

#### Carousels
Three specialized carousel implementations with shared hook:
- **Music Carousel** - Album showcase with cover art
- **HackTX Carousel** - Project screenshots with demo/Devpost links
- **DFG Carousel** - DataForGood project images with LinkedIn post

Features:
- Auto-rotation on parent hover (3s interval)
- Manual navigation (prev/next buttons)
- Dot indicators with click-to-navigate
- Lazy loading for performance

#### Interactive Cards
- Expandable project cards with click/tap
- Scrollable content areas
- Glass-morphism design with backdrop blur
- Hover effects and smooth transitions

#### Custom Icons
- Hand-crafted SVG icons for interests
- Basketball, videogames, and music note designs
- Scalable and color-customizable

### Performance Optimizations
- Code splitting (React vendor chunk)
- Image lazy loading
- WebP format for photos
- Minification and tree shaking
- React.memo for small components
- useMemo/useCallback for expensive operations
- Fixed DPR canvas rendering for PetalCanvas

## Project Structure

```
portfolio/
├── public/                    # Static assets
│   ├── albums/               # Album cover images (WebP)
│   ├── dfg/                  # DataForGood project images
│   ├── hacktx/               # HackTX project screenshots
│   ├── smiley.png            # Navigation icon
│   └── unnamed.webp          # Cherry blossom petal sprite
├── src/
│   ├── components/           # React components
│   │   ├── DFGCarousel.tsx
│   │   ├── HackTXCarousel.tsx
│   │   ├── InterestIcon.tsx
│   │   ├── MusicCarousel.tsx
│   │   ├── NavDot.tsx
│   │   ├── PetalCanvas.tsx   # Canvas animation
│   │   └── TechTag.tsx
│   ├── hooks/                # Custom React hooks
│   │   └── useCarousel.ts    # Reusable carousel logic
│   ├── App.tsx               # Main component (646 lines)
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── eslint.config.js          # ESLint configuration
├── .prettierrc               # Prettier configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration
├── vercel.json               # Vercel deployment config
├── TESTING_CHECKLIST.md      # Comprehensive testing guide
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Available Scripts

```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production (output: dist/)
npm run preview  # Preview production build locally
```

## Development

### Code Quality
- **TypeScript Strict Mode** - Enabled for maximum type safety
- **ESLint** - Configured with TypeScript and React rules
- **Prettier** - Consistent code formatting

### Responsive Breakpoints
```
Mobile:  < 768px   (sm: default)
Tablet:  ≥ 768px   (md:)
Desktop: ≥ 1024px  (lg:)
Large:   ≥ 1280px  (xl:)
```

### Typography Scaling
Uses CSS clamp() for fluid typography:
```css
Hero name:       clamp(64px, 11.8vw, 220px)
Navigation:      clamp(16px, 4vw, 38px)
Section heads:   clamp(25px, 5vw, 100px)
```

## Recent Improvements (2025-11-09)

### Code Cleanup
- ✅ Removed unused Tailwind custom classes
- ✅ Removed unused Playfair Display font
- ✅ Removed dead code from InterestIcon component
- ✅ Locked package versions for stability

### Refactoring
- ✅ Created reusable `useCarousel` hook
- ✅ Refactored all three carousels to use shared logic
- ✅ Reduced code duplication by ~200 lines

### Tooling
- ✅ Added ESLint with TypeScript rules
- ✅ Added Prettier for code formatting
- ✅ Created comprehensive testing checklist

### Scaling Fixes (Previous Commits)
- ✅ Removed artificial 0.8x page scaling
- ✅ Fixed touch interaction issues on mobile
- ✅ Improved viewport calculations
- ✅ Implemented fluid typography with clamp()

## Testing

See [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for comprehensive testing guidelines covering:
- Desktop viewports (1920x1080, 1366x768)
- Tablet viewports (768x1024, 820x1180)
- Mobile viewports (390x844, 414x896, 360x740)
- Functional testing for all components
- Performance benchmarks
- Accessibility checks

## Deployment

### Vercel (Recommended)
The project is configured for Vercel deployment:

```bash
vercel deploy
```

Configuration in `vercel.json`:
- Build command: `vite build`
- Output directory: `dist`
- SPA routing enabled

### Manual Deployment
1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` folder to any static hosting service:
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront
   - Any static file server

## Browser Support

### Fully Supported
- Chrome/Edge (Chromium) - Latest
- Firefox - Latest
- Safari - Latest (macOS 12+, iOS 15+)
- Samsung Internet - Latest

### Key Feature Requirements
- CSS clamp() support (all modern browsers)
- ES6+ JavaScript
- WebP image format
- CSS backdrop-filter (optional enhancement)

## Performance Metrics

Target metrics:
- Time to Interactive: < 3s on 3G
- First Contentful Paint: < 1.5s
- Lighthouse Score: > 90
- Bundle size: ~327 KB (gzipped: ~106 KB)

## Architecture Decisions

### Why Vite?
- Extremely fast HMR during development
- Modern ESM-based build
- Built-in TypeScript support
- Optimized production builds with Rollup

### Why Tailwind CSS v4?
- Utility-first approach for rapid development
- Excellent responsive design utilities
- Small production bundle (unused styles purged)
- Native @tailwindcss/postcss plugin

### Why GSAP?
- Industry-standard animation library
- Excellent performance
- ScrollTrigger for scroll-based animations
- Cross-browser consistency

### Custom Canvas Animation
- Direct canvas rendering for maximum performance
- GPU-accelerated transforms
- Early culling of off-screen elements
- Fixed DPR for consistent FPS

## Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## License

Private - All Rights Reserved

## Contact

- **GitHub**: [Link from website]
- **LinkedIn**: [Link from website]
- **Email**: [From contact section]

---

**Designed with Figma** | **Built with React & TypeScript** | **Deployed on Vercel**

Last Updated: 2025-11-09
