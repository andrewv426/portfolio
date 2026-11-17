import { useEffect, useRef, useState } from "react";

export default function FlowDemo() {
  const frame = useRef(null);
  const [height, setHeight] = useState(260);

  useEffect(() => {
    function resize(event) {
      if (
        event.source === frame.current?.contentWindow &&
        event.data?.type === "flotion:resize" &&
        Number.isFinite(event.data.height)
      ) {
        setHeight(Math.min(800, Math.max(160, event.data.height + 4)));
      }
    }
    window.addEventListener("message", resize);
    return () => window.removeEventListener("message", resize);
  }, []);

  return (
    <figure className="flow-demo">
      <iframe
        ref={frame}
        src="/demos/flotion-flow.html"
        title="Interactive Flow diagram: browser request and API response"
        sandbox="allow-scripts"
        style={{ height }}
      />
      <figcaption className="ui">
        Try the arrows or press play. You can also focus the diagram and use the arrow keys.
      </figcaption>
    </figure>
  );
}
