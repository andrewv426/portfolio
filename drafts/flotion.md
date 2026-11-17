# Building Flotion

## Motivation

I like Notion's nested pages and blocks. I wanted something faster, though, and I wanted AI agents to be able to edit my notes without much friction.

I wasn't happy with Google Docs and Gemini. I wanted agents to edit specific blocks through a small, predictable interface. Building that myself gave me control over how edits were applied and how errors were reported.

I also tried working through Notion's MCP, but couldn't get the animated diagrams I wanted into my notes. Claude and Codex have the abiility to make interactive artifacts, but Notion supported mainly only mermaid/svg-style diagrams. I also tried having Claude/Codex generate images, the result ended up being ai-slop due to a lack of consistency/structure/scope. 

So I started building Flotion: a native Mac notes app with a block editor, local SQLite storage, and an MCP server. Building an app yourself gives you the ability to constantly iterate and implement/test a variety of agentic capabilities. 

## AppKit vs. Electron

[Electron](https://www.electronjs.org/docs/latest/) lets you build a desktop app with web technologies and share the interface across Mac, Windows, and Linux. It bundles Chromium and Node.js, which adds runtime overhead, but also gives you access to web libraries for things like rich-text editing.

AppKit uses macOS's own controls. I went with it for Flotion's editor because most of the app is typing, selecting text, and scrolling through notes. I wanted those interactions to feel like a Mac app, with less runtime overhead around them. SwiftUI handles the rest of the interface.

The tradeoff is that Flotion's interface is tied to macOS, and I have to handle more of the block editor myself. Native controls also don't make an app fast automatically. I still have to manage how many views exist and when layout work happens. For Flotion, choosing AppKit gives me control over that work, while giving up Electron's easier route to other platforms.

## Flow, inspired by Mermaid

The diagram part became its own project. I liked [Mermaid's](https://mermaid.js.org/intro/index.html) idea of describing a diagram in text. I wanted to add steps so I could follow something happening, like an agent editing a note and the app picking up the change.

Here's how Flotion shares storage between the app and an agent. Both use FlotionCore to access SQLite in [WAL mode](https://sqlite.org/wal.html):

```text
flow down
app: Flotion app {shape: pill}
mcp: MCP server
wal: Write-ahead log {shape: database}
db: flotion.sqlite {shape: database}

app -> db
app -> wal
mcp -> wal
mcp -> app {style: dashed}
wal -> db

step "Read a page": SQLite reads a snapshot from the database and WAL.
  focus app, wal, db
  send app -> db: read page
  send app -> wal: check WAL

step "Agent edits": The MCP server commits the edit through FlotionCore.
  focus mcp, wal
  send mcp -> wal: commit edit
  tag wal: committed
  mark wal: good

step "Refresh the app": A notification prompts Flotion to reload and merge the page.
  send mcp -> app: workspace changed
  send wal -> app: updated snapshot
  tag app: page updated
  mark app: good

step "Checkpoint": SQLite copies committed WAL pages into the main database.
  focus wal, db
  send wal -> db: checkpoint
  tag db: checkpointed
  mark db: good
```

```flow-demo
flotion-storage
```

The nodes stay in place while messages animate between them. Tags carry over to the next step. Flotion handles positioning and colors, so the agent can edit the explanation without also writing the drawing code.

Parsing and layout happen in Swift. A small SVG player runs in an embedded web view. I ended up using web rendering for this part even though the editor itself is native. 

## Interesting Issues

An agent might edit a page while I'm typing in it. The app and MCP server share the same storage code, and incoming changes get merged block by block. 

With Flow, I also had to make errors useful. If an agent references a node that doesn't exist, it gets a line number and a suggestion where possible. It can use that context to fix the source directly, saving the cost of taking a screenshot and using vision to figure out what's wrong.

A lot of this project has been working through details like those. 

I hope to combine my understanding of NLP to optimize tokens spent on tool calling and maximizing performance & accuracy of agent tasks. 
