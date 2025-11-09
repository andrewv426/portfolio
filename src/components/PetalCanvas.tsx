import { useEffect, useRef, useState } from "react";

// Petal sprite image - served from public folder
const PETAL_IMAGE_PATH = "/unnamed.webp";
let cachedPetalImage: HTMLImageElement | null = null;
let petalImagePromise: Promise<HTMLImageElement> | null = null;

function loadPetalImage() {
  if (cachedPetalImage) {
    return Promise.resolve(cachedPetalImage);
  }

  if (!petalImagePromise) {
    petalImagePromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        cachedPetalImage = img;
        resolve(img);
      };
      img.onerror = (err) => {
        reject(err);
      };
      img.src = PETAL_IMAGE_PATH;
    });
  }

  return petalImagePromise;
}

type Petal = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  rotationSpeed: number;
  vy: number; // vertical speed
  vx: number; // horizontal speed for diagonal flow
  driftAmp: number; // horizontal drift amplitude
  driftFreq: number; // horizontal drift frequency
  driftPhase: number; // initial phase for drift
  opacity: number;
  blur: number;
};

// Soft overlay of falling petals drawn on a single GPU-accelerated canvas.
// - pointer-events: none ensures content remains interactive
// - zIndex is kept low so content stays above by default
// Optimized for performance with reduced petal count and smaller sizes
export default function PetalCanvas({
  minCount = 15,
  maxCount = 25,
}: {
  minCount?: number;
  maxCount?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Load image first (cached across mounts)
  useEffect(() => {
    let isMounted = true;

    loadPetalImage()
      .then((img) => {
        if (!isMounted) return;
        imageRef.current = img;
        setImageLoaded(true);
      })
      .catch((error) => {
        console.error("Failed to load petal image from:", PETAL_IMAGE_PATH, error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!imageLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Optimize context for performance - disable willReadFrequently for better GPU acceleration
    const ctx = canvas.getContext("2d", { 
      alpha: true,
      willReadFrequently: false,
      desynchronized: true // Allow async rendering for better performance
    });
    if (!ctx) return;

    // Limit DPR to 1 for better performance (can increase if needed for quality)
    const resize = () => {
      const dpr = 1; // Fixed DPR for performance
      const { innerWidth: w, innerHeight: h } = window;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Create or recreate the petal field
    const createPetals = () => {
      const count =
        Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
      const petals: Petal[] = [];
      for (let i = 0; i < count; i++) {
        petals.push(spawnPetal(window.innerWidth, window.innerHeight, true));
      }
      petalsRef.current = petals;
    };

    let isRunning = true;
    const loop = (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const deltaTime = (currentTime - lastTimeRef.current) / 1000; // Convert to seconds
      lastTimeRef.current = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const petals = petalsRef.current;
      const sprite = imageRef.current;
      
      if (sprite && sprite.complete && sprite.naturalWidth > 0) {
        // Batch operations for better performance
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "low"; // Faster rendering
        
        for (let i = 0; i < petals.length; i++) {
          const p = petals[i];

          // Time-based movement for smooth animation regardless of frame rate
          // Diagonal flow: combine base horizontal velocity with sinusoidal drift
          const driftX = Math.sin(currentTime * 0.001 * p.driftFreq + p.driftPhase) * p.driftAmp;
          p.x += p.vx * deltaTime; // Horizontal movement for diagonal flow
          p.y += p.vy * deltaTime; // Vertical movement
          p.rotation += p.rotationSpeed * deltaTime;
          const x = p.x + driftX;
          const y = p.y;

          // Recycle petal when it leaves the viewport (bottom or right edge)
          if (y > h + 100 || x > w + 150) {
            petals[i] = spawnPetal(w, h, false);
            continue;
          }

          // Skip drawing if petal is outside viewport (early culling)
          if (x < -100 || x > w + 100 || y < -100 || y > h + 100) {
            continue;
          }

          // Optimized drawing - removed blur for better performance
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(x, y);
          ctx.rotate(p.rotation);
          const s = p.scale;
          const iw = sprite.width * s;
          const ih = sprite.height * s;
          // Draw centered around its local origin
          ctx.drawImage(sprite, -iw / 2, -ih / 2, iw, ih);
          ctx.restore();
        }
      }

      if (isRunning) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const start = () => {
      createPetals();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(loop);
    };

    start();

    return () => {
      isRunning = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [minCount, maxCount, imageLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[5]"
      aria-hidden="true"
    />
  );
}

function spawnPetal(viewW: number, viewH: number, initial = false): Petal {
  // Spawn from outside screen edges for natural entry
  // Distribute spawn points across top and left edges for diagonal flow
  let startX: number;
  let startY: number;
  
  if (initial) {
    // Initial spawn: distribute across top edge (left to right) and left edge (top to bottom)
    const spawnEdge = Math.random();
    if (spawnEdge < 0.6) {
      // Spawn from top edge, distributed across width
      startX = Math.random() * viewW * 0.6 - 100; // Start from left 60% of screen, extend beyond left edge
      startY = -rand(50, 200); // Start above viewport
    } else {
      // Spawn from left edge, distributed across height
      startX = -rand(50, 200); // Start to the left of viewport
      startY = Math.random() * viewH * 0.4 - 50; // Top 40% of screen
    }
  } else {
    // Recycled spawn: spawn from top-left region outside viewport
    const spawnEdge = Math.random();
    if (spawnEdge < 0.7) {
      // Mostly from top edge
      startX = Math.random() * viewW * 0.5 - 100;
      startY = -rand(50, 150);
    } else {
      // Some from left edge
      startX = -rand(50, 150);
      startY = Math.random() * viewH * 0.3 - 50;
    }
  }

  // Even smaller scale range for more subtle petals (0.1 to 0.35)
  const scale = rand(0.1, 0.35);
  
  // Vertical speed in pixels per second
  const vy = lerp(55, 130, scale);
  
  // Horizontal speed for diagonal flow (top-left to bottom-right)
  // Vary the angle slightly for natural dispersion
  const diagonalRatio = rand(0.25, 0.55); // Slight diagonals without drifting too far sideways
  const vx = vy * diagonalRatio; // Horizontal speed proportional to vertical
  
  const rotation = rand(0, Math.PI * 2);
  // Rotation speed in radians per second - slower for more natural movement
  const rotationSpeed = rand(-0.6, 0.6) * (0.1 + scale * 0.2);
  // Horizontal drift amplitude - subtle breeze effect
  const driftAmp = rand(10, 30) * (0.5 + (1 - scale));
  const driftFreq = rand(0.2, 0.6); // Hz - slower frequency for smoother drift
  const driftPhase = rand(0, Math.PI * 2);
  // Opacity - ensure petals are visible but subtle
  const opacity = rand(0.4, 0.85) * (0.6 + scale * 0.4);
  // Blur removed for performance - using opacity for depth instead
  const blur = 0;
  
  return {
    x: startX,
    y: startY,
    scale,
    rotation,
    rotationSpeed,
    vy, // pixels per second - will be multiplied by deltaTime in animation loop
    vx, // horizontal speed for diagonal flow
    driftAmp,
    driftFreq,
    driftPhase,
    opacity,
    blur,
  };
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
