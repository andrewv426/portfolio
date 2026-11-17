"""Export the post's Flow example using Flotion's actual Swift renderer.

Run on macOS: python3 scripts/export-flotion-demo.py /path/to/Flotion
The generated HTML is checked in, so the website build does not need Swift.
"""

import json
from pathlib import Path
import re
import subprocess
import sys
import tempfile


root = Path(__file__).resolve().parents[1]
flotion = Path(sys.argv[1]).resolve()
core = flotion / "Packages/FlotionKit/Sources/FlotionCore"
post = (root / "drafts/flotion.md").read_text()
source = re.search(r"```(?:text|flow)\n(.*?)\n```", post, re.S).group(1)

with tempfile.TemporaryDirectory(prefix="flotion-export-") as temp:
    temp = Path(temp)
    (temp / "example.flow").write_text(source)
    (temp / "main.swift").write_text('''
import Foundation

func encodeJSON<T: Encodable>(_ value: T) throws -> String {
    let encoder = JSONEncoder()
    encoder.outputFormatting = [.sortedKeys]
    return String(decoding: try encoder.encode(value), as: UTF8.self)
}
func decodeJSON<T: Decodable>(_ type: T.Type, _ string: String) throws -> T {
    try JSONDecoder().decode(type, from: Data(string.utf8))
}
let source = try String(contentsOfFile: CommandLine.arguments[1], encoding: .utf8)
let scene = try FlowScene(source: source)
print(DiagramTemplate.flowDocument(scene))
''')
    swift_files = [core / "Models/Models.swift", core / "Diagrams/DiagramTemplate.swift"]
    swift_files += sorted((core / "Diagrams/Flow").glob("*.swift"))
    executable = temp / "export"
    subprocess.run([
        "swiftc", "-module-cache-path", str(temp / "cache"),
        *map(str, swift_files), str(temp / "main.swift"), "-o", str(executable),
    ], check=True)
    html = subprocess.check_output([str(executable), str(temp / "example.flow")], text=True)

revision = subprocess.check_output(
    ["git", "-C", str(flotion), "rev-parse", "HEAD"], text=True
).strip()
html = html.replace("<html>", '<html lang="en">', 1)
html = html.replace("<head>", '''<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Flotion storage and write-ahead logging</title>
''', 1)
# Keep the app's scene and player; adapt the surrounding controls for a web page.
html = html.replace('<svg class="stage" id="stage" role="img"></svg>',
                    '<div class="stage-scroll"><svg class="stage" id="stage" role="img"></svg></div>', 1)
html = html.replace("stage.style.maxWidth = S.w + 'px';",
                    "stage.style.maxWidth = S.w + 'px'; stage.style.minWidth = Math.min(S.w, 560) + 'px';", 1)
html = html.replace("</head>", '''<style>
html, body { height: auto; }
body { padding: 8px; }
.stage-scroll { overflow-x: auto; scrollbar-width: thin; }
.controls { height: 48px; }
.controls .nav { opacity: 1; width: 44px; height: 44px; }
.controls .dot { position: relative; }
.controls .dot::after { content: ''; position: absolute; inset: -16px -2px; }
.controls button:focus-visible { outline: 2px solid var(--fl-accent); outline-offset: 4px; }
.fig:focus-visible { outline: 2px solid var(--fl-accent); outline-offset: -2px; }
</style></head>''', 1)
html = html.replace('<svg class="stage" id="stage" role="img">',
                    '<svg class="stage" id="stage" role="img" aria-label="Flotion app and MCP server sharing SQLite storage through a write-ahead log">')
html = html.replace('id="caption"', 'id="caption" aria-live="polite" aria-atomic="true"', 1)
html = html.replace("</body>", '''<script>
// The parent validates the sending frame before accepting these height updates.
const reportHeight = () => parent.postMessage({
  type: 'flotion:resize', height: Math.ceil(document.body.getBoundingClientRect().height)
}, '*');
new ResizeObserver(reportHeight).observe(document.body);
const updateStepLabels = () => {
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.setAttribute('aria-label', 'Step ' + (i + 1) + ': ' +
      JSON.parse(document.getElementById('scene').textContent).steps[i].title);
    dot.setAttribute('aria-pressed', String(i === window.flotion.index()));
  });
};
new MutationObserver(updateStepLabels).observe(document.getElementById('dots'), {
  subtree: true, attributes: true, attributeFilter: ['class']
});
updateStepLabels();
reportHeight();
</script></body>''', 1)
html = html.replace("<!doctype html>",
                    f"<!doctype html>\n<!-- Exported from andrewv426/Flotion at {revision}; regenerate with scripts/export-flotion-demo.py. -->", 1)
output = root / "public/demos/flotion-flow.html"
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(html)
print(json.dumps({"output": str(output), "flotion_revision": revision}))
