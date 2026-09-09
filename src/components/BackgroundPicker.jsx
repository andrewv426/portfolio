import { useEffect, useRef, useState } from "react";
import "./BackgroundPicker.css";

const options = [
  { value: "glow", label: "soft glow" },
  { value: "plain", label: "plain" },
  { value: "grid", label: "fine grid" },
  { value: "dots", label: "dots" },
];

function BackgroundPicker() {
  const [background, setBackground] = useState(() => {
    const saved = document.documentElement.getAttribute("data-background");
    return options.some((option) => option.value === saved) ? saved : "glow";
  });
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  const trigger = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-background", background);
    try {
      localStorage.setItem("background", background);
    } catch { /* Preferences still work when storage is unavailable. */ }
  }, [background]);

  useEffect(() => {
    if (!open) return;

    function dismissOutside(event) {
      if (!container.current?.contains(event.target)) setOpen(false);
    }
    function dismissOnEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("focusin", dismissOutside);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("focusin", dismissOutside);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [open]);

  return (
    <div className="background-picker" ref={container}>
      <button
        className="background-trigger"
        type="button"
        ref={trigger}
        aria-expanded={open}
        aria-controls="background-options"
        onClick={() => setOpen(!open)}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" />
          <rect x="10" y="1" width="5" height="5" rx="1" stroke="currentColor" />
          <rect x="1" y="10" width="5" height="5" rx="1" stroke="currentColor" />
          <rect x="10" y="10" width="5" height="5" rx="1" stroke="currentColor" />
        </svg>
        background
      </button>
      {open && (
        <div id="background-options" className="background-panel" role="group" aria-label="background options">
          <p className="background-panel-title">choose a background</p>
          <div className="background-options">
            {options.map(({ value, label }) => (
              <button
                type="button"
                className="background-option"
                key={value}
                aria-pressed={background === value}
                onClick={() => setBackground(value)}
              >
                <span className="background-swatch" data-background={value} aria-hidden="true" />
                <span className="background-option-label">
                  {label}
                  {background === value && <span aria-hidden="true">✓</span>}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BackgroundPicker;
