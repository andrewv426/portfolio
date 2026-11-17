import { useEffect, useRef } from "react";
import { columns, rows, snowdriftFrame } from "./snowdrift.js";

const desktopQuery = "(min-width: 960px) and (hover: hover) and (pointer: fine)";
const cellWidth = 5.5;
const cellHeight = 9.4;
const width = columns * cellWidth;
const height = rows * cellHeight;

const light = {
  shade: "#748b80", pine: "#536f61", green: "#345f4e", snow: "#507a8f",
  ice: "#7796a5", wood: "#876f59", flake: "#879eaa", ground: "#a3b5b9",
};
const dark = {
  shade: "#688075", pine: "#8aa899", green: "#b0c9b9", snow: "#e1f4f8",
  ice: "#a1c5d2", wood: "#b6a087", flake: "#8ca5af", ground: "#4f6876",
};

export default function Snowdrift() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const desktop = window.matchMedia(desktopQuery);
    const theme = window.matchMedia("(prefers-color-scheme: dark)");
    let elapsed = 0;
    let frameId;
    let lastPaint;

    function paint() {
      const palette = theme.matches ? dark : light;
      context.clearRect(0, 0, width, height);
      for (const [y, row] of snowdriftFrame(elapsed).entries()) {
        for (const [x, cell] of row.entries()) {
          if (!cell) continue;
          context.fillStyle = palette[cell.tone];
          context.fillText(cell.glyph, (x + 0.5) * cellWidth, (y + 0.5) * cellHeight);
        }
      }
    }

    function animate(now) {
      lastPaint ??= now;
      const delta = now - lastPaint;
      if (delta >= 50) {
        elapsed += Math.min(delta, 100) / 1000;
        lastPaint = now;
        paint();
      }
      frameId = requestAnimationFrame(animate);
    }

    function sync() {
      cancelAnimationFrame(frameId);
      lastPaint = undefined;
      if (!desktop.matches) return;

      const scale = Math.min(window.devicePixelRatio || 1, 3);
      const pixelWidth = Math.round(width * scale);
      const pixelHeight = Math.round(height * scale);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      context.setTransform(pixelWidth / width, 0, 0, pixelHeight / height, 0, 0);
      context.font = '11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
      context.textAlign = "center";
      context.textBaseline = "middle";
      paint();

      if (!document.hidden) {
        frameId = requestAnimationFrame(animate);
      }
    }

    for (const query of [desktop, theme]) query.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      cancelAnimationFrame(frameId);
      for (const query of [desktop, theme]) query.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <canvas className="snowdrift" ref={canvasRef} aria-hidden="true" />;
}
