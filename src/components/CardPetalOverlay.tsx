"use client"

import clsx from "clsx"
import { RefObject, useEffect, useRef } from "react"

interface CardPetalOverlayProps {
  active?: boolean
  layers?: number
  density?: number
  color?: string
  opacity?: number
  speed?: number
  parentRef?: RefObject<HTMLElement>
  className?: string
}

// Canvas-based sakura petals tailored for card overlays (clipped to parent bounds)
export const CardPetalOverlay = ({
  active = false,
  layers = 3,
  density = 18,
  color = "#f7a8c3",
  opacity = 0.25,
  speed = 1.35,
  parentRef,
  className,
}: CardPetalOverlayProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const runningRef = useRef(false)

  useEffect(() => {
    if (!active) {
      runningRef.current = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const targetEl = parentRef?.current ?? canvas.parentElement ?? canvas
    if (!targetEl) return

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true as any })
    if (!ctx) return

    const cleanupFns: Array<() => void> = []

    const cores = (navigator as any).hardwareConcurrency || 4
    const mem = (navigator as any).deviceMemory || 4
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    const isMobile = window.innerWidth < 768
    const isLowEnd = cores <= 4 || mem <= 4 || isMobile
    const DPR = Math.min(window.devicePixelRatio || 1, isLowEnd ? 1 : 2)

    let width = 0
    let height = 0

    type Petal = {
      x: number
      y: number
      r: number
      rot: number
      rv: number
      vx: number
      vy: number
      a: number
      layer: number
      swayAmp: number
      swayPhase: number
      blur: number
      sprite?: HTMLCanvasElement
      spriteSize?: number
      bitmap?: ImageBitmap
    }

    let petals: Petal[] = []

    const baseLayers = layers
    const baseDensity = density
    const effectiveLayers = reduceMotion
      ? Math.max(1, Math.round(baseLayers * 0.6))
      : isLowEnd
        ? Math.max(1, Math.round(baseLayers * 0.75))
        : baseLayers
    const effectiveDensity = reduceMotion
      ? Math.max(4, Math.round(baseDensity * 0.5))
      : isLowEnd
        ? Math.max(6, Math.round(baseDensity * 0.7))
        : baseDensity
    const maxBlur = isLowEnd ? 1 : 2
    const maxTotalPetals = isLowEnd ? 80 : 180

    const spriteCache = new Map<string, { canvas: HTMLCanvasElement; size: number; bitmap?: ImageBitmap }>()
    const quantize = (v: number, step: number, min: number, max: number) => Math.max(min, Math.min(max, Math.round(v / step) * step))
    const quantizeSize = (r: number) => quantize(r, 2, 6, 24)

    let baselineFps = reduceMotion ? 30 : isLowEnd ? 45 : 60
    const fpsRef = { current: baselineFps }
    const frameIntervalRef = { current: 1000 / fpsRef.current }
    let lastFrameTime = performance.now()
    let scrollRestoreTimer: number | null = null
    let lastScrollY = window.scrollY
    let lastScrollT = performance.now()
    let avgFrameMs = frameIntervalRef.current

    const updateSize = (rect?: DOMRectReadOnly | DOMRect) => {
      const nextWidth = rect?.width ?? targetEl.clientWidth ?? canvas.clientWidth
      const nextHeight = rect?.height ?? targetEl.clientHeight ?? canvas.clientHeight
      width = Math.max(1, nextWidth)
      height = Math.max(1, nextHeight)
      canvas.width = Math.floor(width * DPR)
      canvas.height = Math.floor(height * DPR)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    updateSize(targetEl.getBoundingClientRect())

    if ((window as any).ResizeObserver && targetEl instanceof Element) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === targetEl) {
            updateSize(entry.contentRect)
            break
          }
        }
      })
      resizeObserver.observe(targetEl)
      cleanupFns.push(() => resizeObserver.disconnect())
    } else {
      const handleResize = () => updateSize(targetEl.getBoundingClientRect())
      window.addEventListener("resize", handleResize)
      cleanupFns.push(() => window.removeEventListener("resize", handleResize))
    }

    const rand = (min: number, max: number) => Math.random() * (max - min) + min

    const seed = () => {
      const total = effectiveLayers * effectiveDensity
      petals = []
      const scale = Math.min(1, maxTotalPetals / Math.max(1, total))
      for (let l = 0; l < effectiveLayers; l++) {
        const depth = l / Math.max(effectiveLayers - 1, 1)
        const layerCountBase = Math.max(6, Math.round(effectiveDensity * (1 + depth)))
        const layerCount = Math.max(4, Math.round(layerCountBase * scale))
        for (let i = 0; i < layerCount; i++) {
          const p = makePetal(l)
          buildSprite(p)
          petals.push(p)
        }
      }
    }

    const warmCache = () => {
      const sizes = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
      let idx = 0
      const schedule = () => {
        if (idx >= sizes.length) return
        const k = sizes[idx++]
        const size = Math.ceil(k * 2.2)
        const key = `${size}`
        if (!spriteCache.has(key)) {
          const off = document.createElement("canvas")
          off.width = size
          off.height = size
          const octx = off.getContext("2d")
          if (octx) {
            octx.translate(size / 2, size / 2)
            octx.beginPath()
            octx.moveTo(0, -k)
            octx.bezierCurveTo(-0.4 * k, -1.05 * k, -0.95 * k, -0.1 * k, -0.42 * k, 0.42 * k)
            octx.quadraticCurveTo(-0.22 * k, 0.72 * k, 0, 0.78 * k)
            octx.quadraticCurveTo(0.24 * k, 0.68 * k, 0.36 * k, 0.36 * k)
            octx.bezierCurveTo(0.78 * k, -0.22 * k, 0.38 * k, -0.98 * k, 0, -k)
            octx.closePath()
            const baseRgb = hexToRgb(color)
            const light = mixRgb(baseRgb, { r: 255, g: 255, b: 255 }, 0.45)
            const dark = mixRgb(baseRgb, { r: 0, g: 0, b: 0 }, 0.25)
            const grad = octx.createLinearGradient(0, -k, 0, k)
            grad.addColorStop(0, `rgba(${light.r}, ${light.g}, ${light.b}, 1)`)
            grad.addColorStop(0.55, hexToRgba(color, 1))
            grad.addColorStop(1, `rgba(${dark.r}, ${dark.g}, ${dark.b}, 1)`)
            octx.fillStyle = grad
            octx.fill()
            spriteCache.set(key, { canvas: off, size })
            const anyWindow: any = window as any
            if (anyWindow.createImageBitmap) {
              anyWindow
                .createImageBitmap(off)
                .then((bmp: ImageBitmap) => {
                  const entry = spriteCache.get(key)
                  if (entry) entry.bitmap = bmp
                })
                .catch(() => {})
            }
          }
        }
        ;(window as any).requestIdleCallback?.(schedule, { timeout: 60 }) || setTimeout(schedule, 16)
      }
      schedule()
    }

    const makePetal = (layer: number): Petal => {
      const depth = layer / Math.max(effectiveLayers - 1, 1)
      const baseSize = rand(8, 16) * (0.7 + (1 - depth) * 0.6)
      const sizeQ = quantizeSize(baseSize)
      const mode = Math.random()
      let sx: number, sy: number
      if (mode >= 0.85) {
        sx = rand(width * 0.4, width * 0.65)
        sy = rand(height * -0.1, height * 0.5)
      } else if (mode >= 0.55) {
        sx = rand(width * 0.18, width * 0.36)
        sy = rand(height * 0.08, height * 0.32)
      } else {
        sx = rand(-width * 0.3, width * 0.1)
        sy = rand(-height * 0.6, height * 0.05)
      }
      const alphaRaw = rand(opacity * 0.4, opacity)
      return {
        x: sx,
        y: sy,
        r: sizeQ,
        rot: rand(0, Math.PI * 2),
        rv: rand(-0.014, 0.014) * (0.4 + (1 - depth)),
        vx: rand(0.28, 0.65) * (0.5 + (1 - depth)) * speed,
        vy: rand(1.25, 2.6) * (0.6 + (1 - depth)) * speed,
        a: alphaRaw,
        layer,
        swayAmp: rand(5, 20) * (0.8 + (1 - depth)),
        swayPhase: rand(0, Math.PI * 2),
        blur: Math.round((rand(0, maxBlur) * depth) * 2) / 2,
      }
    }

    const hexToRgb = (hex: string) => {
      let c = hex.replace("#", "")
      if (c.length === 3) c = c.split("").map((ch) => ch + ch).join("")
      return {
        r: parseInt(c.substring(0, 2), 16),
        g: parseInt(c.substring(2, 4), 16),
        b: parseInt(c.substring(4, 6), 16),
      }
    }

    const mixRgb = (
      a: { r: number; g: number; b: number },
      b: { r: number; g: number; b: number },
      t: number,
    ) => ({
      r: Math.round(a.r * (1 - t) + b.r * t),
      g: Math.round(a.g * (1 - t) + b.g * t),
      b: Math.round(a.b * (1 - t) + b.b * t),
    })

    const hexToRgba = (hex: string, a: number) => {
      let c = hex.replace("#", "")
      if (c.length === 3) {
        c = c.split("").map((ch) => ch + ch).join("")
      }
      const r = parseInt(c.substring(0, 2), 16)
      const g = parseInt(c.substring(2, 4), 16)
      const b = parseInt(c.substring(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, ${a})`
    }

    const buildSprite = (p: Petal) => {
      const k = quantizeSize(p.r)
      const size = Math.ceil(k * 2.2)
      const key = `${size}`

      const cached = spriteCache.get(key)
      if (cached) {
        p.sprite = cached.canvas
        p.spriteSize = cached.size
        if (cached.bitmap) p.bitmap = cached.bitmap
        return
      }

      const off = document.createElement("canvas")
      off.width = size
      off.height = size
      const octx = off.getContext("2d")
      if (!octx) return

      octx.translate(size / 2, size / 2)
      octx.beginPath()
      octx.moveTo(0, -k)
      octx.bezierCurveTo(-0.4 * k, -1.05 * k, -0.95 * k, -0.1 * k, -0.42 * k, 0.42 * k)
      octx.quadraticCurveTo(-0.22 * k, 0.72 * k, 0, 0.78 * k)
      octx.quadraticCurveTo(0.24 * k, 0.68 * k, 0.36 * k, 0.36 * k)
      octx.bezierCurveTo(0.78 * k, -0.22 * k, 0.38 * k, -0.98 * k, 0, -k)
      octx.closePath()

      const baseRgb = hexToRgb(color)
      const light = mixRgb(baseRgb, { r: 255, g: 255, b: 255 }, 0.45)
      const dark = mixRgb(baseRgb, { r: 0, g: 0, b: 0 }, 0.25)
      const grad = octx.createLinearGradient(0, -k, 0, k)
      grad.addColorStop(0, `rgba(${light.r}, ${light.g}, ${light.b}, 1)`)
      grad.addColorStop(0.55, hexToRgba(color, 1))
      grad.addColorStop(1, `rgba(${dark.r}, ${dark.g}, ${dark.b}, 1)`)

      octx.fillStyle = grad
      octx.fill()

      p.sprite = off
      p.spriteSize = size
      spriteCache.set(key, { canvas: off, size })

      const anyWindow: any = window as any
      if (anyWindow.createImageBitmap) {
        anyWindow
          .createImageBitmap(off)
          .then((bmp: ImageBitmap) => {
            const entry = spriteCache.get(key)
            if (entry) entry.bitmap = bmp
            p.bitmap = bmp
          })
          .catch(() => {})
      } else {
        p.bitmap = undefined
      }
    }

    const windX = 0.58 * speed
    const windY = 0.2 * speed

    const step = () => {
      if (!runningRef.current) return

      const now = performance.now()
      const elapsed = now - lastFrameTime
      if (elapsed < frameIntervalRef.current) {
        animationRef.current = requestAnimationFrame(step)
        return
      }
      lastFrameTime = now - (elapsed % frameIntervalRef.current)
      avgFrameMs = avgFrameMs * 0.8 + elapsed * 0.2

      ctx.clearRect(0, 0, width, height)

      let lastFilter = "none"
      const targetMs = frameIntervalRef.current
      const stride = elapsed > targetMs * 1.4 ? 2 : elapsed > targetMs * 1.8 ? 3 : 1

      if (avgFrameMs > targetMs * 1.5 && petals.length > Math.max(24, Math.floor(maxTotalPetals * 0.5))) {
        const removeCount = Math.max(4, Math.floor(petals.length / 8))
        petals.splice(0, removeCount)
      } else if (avgFrameMs < targetMs * 0.9 && petals.length < maxTotalPetals) {
        const addCount = Math.min(3, maxTotalPetals - petals.length)
        for (let i = 0; i < addCount; i++) {
          const layer = Math.floor(Math.random() * effectiveLayers)
          const p = makePetal(layer)
          buildSprite(p)
          petals.push(p)
        }
      }

      for (let l = 0; l < effectiveLayers; l++) {
        let skipIdx = 0
        for (let i = 0; i < petals.length; i++) {
          const p = petals[i]
          if (p.layer !== l) continue

          skipIdx++
          if (stride > 1 && skipIdx % stride !== 0) {
            p.swayPhase += 0.01 + p.vy * 0.0005
            const swaySkip = Math.sin(p.swayPhase) * p.swayAmp
            p.x += p.vx + windX + swaySkip * 0.02
            p.y += p.vy + windY
            p.rot += p.rv
            continue
          }

          p.swayPhase += 0.01 + p.vy * 0.0005
          const sway = Math.sin(p.swayPhase) * p.swayAmp
          p.x += p.vx + windX + sway * 0.02
          p.y += p.vy + windY
          p.rot += p.rv

          if (p.y - p.r > height + 10 || p.x - p.r > width + 10) {
            const depth = p.layer / Math.max(effectiveLayers - 1, 1)
            const baseSize = Math.max(6, Math.min(24, p.r * rand(0.8, 1.2)))
            const sizeQ = quantizeSize(baseSize)
            const mode = Math.random()
            if (mode >= 0.5) {
              p.x = rand(width * 0.18, width * 0.36)
              p.y = rand(-height * 0.05, height * 0.1)
            } else {
              p.x = rand(-width * 0.25, width * 0.1)
              p.y = -rand(20, 160)
            }

            const traj = Math.random()
            if (traj < 0.34) {
              p.vx = rand(0.18, 0.32) * (0.5 + (1 - depth)) * speed
              p.vy = rand(1.4, 2.3) * (0.6 + (1 - depth)) * speed
            } else if (traj < 0.72) {
              p.vx = rand(0.35, 0.6) * (0.5 + (1 - depth)) * speed
              p.vy = rand(1.1, 1.8) * (0.6 + (1 - depth)) * speed
            } else {
              p.vx = rand(0.55, 1.0) * (0.5 + (1 - depth)) * speed
              p.vy = rand(1.0, 1.6) * (0.6 + (1 - depth)) * speed
            }

            p.r = sizeQ
            p.rot = rand(0, Math.PI * 2)
            p.rv = rand(-0.012, 0.012) * (0.4 + (1 - depth))
            const alphaRaw = rand(opacity * 0.4, opacity)
            p.a = alphaRaw
            p.swayAmp = rand(4, 18) * (0.8 + (1 - depth))
            p.swayPhase = rand(0, Math.PI * 2)
            p.blur = Math.round((rand(0, maxBlur) * depth) * 2) / 2
            buildSprite(p)
          }

          const applyBlur = Math.round((p.blur || 0) * 2) / 2 > 0
          const enableBlur = applyBlur && stride === 1 && avgFrameMs < targetMs * 1.25
          const applyFilter = enableBlur ? `blur(${Math.round((p.blur || 0) * 2) / 2}px)` : "none"
          if (applyFilter !== lastFilter) {
            ctx.filter = applyFilter
            lastFilter = applyFilter
          }

          const w = p.spriteSize || 0
          if (!w) continue
          const hw = w / 2
          const margin = 24
          if (p.x + hw < -margin || p.x - hw > width + margin || p.y + hw < -margin || p.y - hw > height + margin) {
            continue
          }

          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          ctx.globalAlpha = p.a
          if (p.bitmap) {
            ctx.drawImage(p.bitmap as any, -hw, -hw, w, w)
          } else if (p.sprite) {
            ctx.drawImage(p.sprite, -hw, -hw, w, w)
          }
          ctx.restore()
        }
      }

      if (lastFilter !== "none") ctx.filter = "none"

      animationRef.current = requestAnimationFrame(step)
    }

    const onScroll = () => {
      const now = performance.now()
      const dy = Math.abs(window.scrollY - lastScrollY)
      const dt = Math.max(1, now - lastScrollT)
      const v = dy / dt
      lastScrollY = window.scrollY
      lastScrollT = now
      if (v > 1.2) {
        if (fpsRef.current !== 30) {
          fpsRef.current = 30
          frameIntervalRef.current = 1000 / fpsRef.current
        }
        if (scrollRestoreTimer) window.clearTimeout(scrollRestoreTimer)
        scrollRestoreTimer = window.setTimeout(() => {
          fpsRef.current = baselineFps
          frameIntervalRef.current = 1000 / fpsRef.current
        }, 400)
      }
    }

    const handleVisibility = () => {
      runningRef.current = !document.hidden
      if (runningRef.current) {
        animationRef.current = requestAnimationFrame(step)
      } else if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }

    seed()
    warmCache()
    runningRef.current = true
    animationRef.current = requestAnimationFrame(step)
    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("visibilitychange", handleVisibility)
    cleanupFns.push(() => window.removeEventListener("scroll", onScroll))
    cleanupFns.push(() => document.removeEventListener("visibilitychange", handleVisibility))

    return () => {
      runningRef.current = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      cleanupFns.forEach((fn) => fn())
    }
  }, [active, layers, density, color, opacity, speed, parentRef])

  return (
    <canvas
      ref={canvasRef}
      className={clsx(
        "pointer-events-none absolute inset-0 w-full h-full will-change-transform transform-gpu [contain:paint]",
        className,
      )}
      aria-hidden="true"
    />
  )
}

export default CardPetalOverlay
