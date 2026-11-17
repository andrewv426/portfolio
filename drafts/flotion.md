# Designing a macOS-native Notion

I started Flotion because I wanted a faster alternative to Notion that AI agents could move around and edit easily. I liked organizing notes into nested pages and blocks, and I wanted that structure in a small native Mac app.

I was also frustrated with the AI tools around my documents. Google Docs with Gemini wasn't giving me the editing experience I wanted. My Notion MCP workflow let an agent interact with notes, but I couldn't get it to create the animated diagrams I wanted inside a page. I liked the interactive explanations I could get through artifacts in Claude and Codex. I wanted something like that to live alongside the notes it explained.

Those frustrations shaped Flotion: a block editor built with SwiftUI and AppKit, a local SQLite workspace, and an MCP server that gives agents access to the same data operations as the app. Along the way, I built Flow, a small diagram language inspired by Mermaid, with steps for showing how a system changes over time.

The agent interface affected the architecture from the beginning. Pages, blocks, search, and diagram validation live in a shared Swift package called FlotionCore. The app and the MCP server both call into it. An agent can edit a particular block or insert a diagram through a structured tool call, and those changes go through the same storage code the app uses.

That arrangement also exposed a problem I had to handle: an agent can change the page while I'm typing. The app and MCP server share a SQLite database in WAL mode. After an external write, the server notifies the app, which merges the updated page block by block. Blocks with unsaved local edits keep their local version. Agent writes also go into a change log grouped by turn, so a turn can be undone. Giving an agent write access meant thinking through what happens when its work overlaps with mine.

For the interface, I chose SwiftUI for the app's surrounding views and AppKit for the editor. The editor uses an NSTableView with reusable NSTextView cells for text blocks. That gives me direct control over text input, focus, and row layout, which became useful as the editor grew.

[Electron](https://www.electronjs.org/docs/latest/) would have given me a web UI and a route to Windows and Linux from one JavaScript codebase. It embeds Chromium and Node.js; choosing AppKit meant committing the interface to macOS. For this project, I cared enough about how typing and scrolling felt on my Mac to accept that tradeoff.

AppKit still required a lot of work. An [early experiment](https://github.com/andrewv426/Flotion/blob/main/Spikes/ScrollSpike.swift) tested a page with 5,000 blocks. Its recorded p95 keystroke time was about 0.7 ms, including measuring the edited row and drawing it, but opening the page took 236 ms. Measuring all the row heights up front accounted for 162 ms of that. The text views were responsive; preparing the whole document was delaying the first paint.

The editor now uses estimated heights where needed and refines them in small batches, prioritizing rows near the screen. That introduced another issue: changing a row's height above the viewport moves the text you're reading. I had to preserve the visible position as measurements settled. Later fixes dealt with cell reuse and trackpad momentum over diagrams. Working on Flotion made me pay much closer attention to these ordinary interactions. A notes app can have the right features and still feel unpleasant if the page jumps while you're reading.

The diagram system grew out of the same concern for the editing experience. [Mermaid](https://mermaid.js.org/intro/index.html) was the inspiration for describing diagrams in text. A text representation fits naturally into notes and gives an agent something it can read and revise. With Flow, I wanted to keep that approach and add a way to walk through events on the diagram.

A picture of a browser connected to an API tells you which components exist. To explain a request, I also want to show the message going out, the server doing work, and the response coming back. Flow declares the structure first, then uses steps to describe those changes:

```text
flow right
browser: Browser {shape: pill}
api: API
browser -> api

step "Request": The browser asks for its feed.
  send browser -> api: GET /feed
  tag api: loading

step "Response": The API returns the feed.
  send api -> browser: 200 OK
  tag api: ready
  mark api: good
```

The arrow is declared once, and a message can travel along it in either direction. Tags and status marks carry forward between steps; a message animation or a focus effect belongs to one step. That distinction lets the source describe both lasting state and events that happen along the way.

Flow deliberately leaves coordinates, sizes, and arbitrary colors out of the language. The source describes the components and their behavior; Flotion handles their appearance. An agent can ask for a warning state with `mark api: warn` without choosing a color or writing rendering code. The parser reports problems by line and suggests fixes where it can, so an invalid tool call gives the agent something specific to correct.

The layout also has to account for later steps. Flotion computes it once across everything the diagram will show, including later labels and status tags. Nodes keep their positions as you move between steps. That leaves the reader free to follow the changing state without having to find the same component again after every transition.

The parser, state calculation, and layout all run in Swift. The resulting scene goes to a small SVG player in a sandboxed WKWebView. I found that combination useful: AppKit handles the document editor, while an embedded web view handles diagram drawing and transitions. Flow source stays data, and Flotion supplies the rendering code. The web view blocks network requests and navigation.

Building Flow changed how I think about designing tools for agents. A constrained format gives the app more responsibility: it has to choose the layout, define useful operations, and explain errors clearly. In return, an agent can work at the level of the explanation. It can add a cache-miss step or change a response label without rebuilding a whole interactive artifact. The source for that explanation stays stored with the diagram in the same workspace as the surrounding notes.
