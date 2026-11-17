# Building Flotion

## Why I started

I like Notion's nested pages and blocks. I wanted something faster, though, and I wanted AI agents to be able to edit my notes without much friction.

I wasn't happy with Google Docs and Gemini. I also tried working through Notion's MCP, but couldn't get the animated diagrams I wanted into my notes. Claude and Codex could make interactive artifacts, and I wanted that kind of explanation inside the document I was working on.

So I started building Flotion: a native Mac notes app with a block editor, local SQLite storage, and an MCP server.

## Why AppKit?

[Electron](https://www.electronjs.org/docs/latest/) would've let me use web technologies and support multiple platforms. I went with SwiftUI and AppKit because I wanted to build a Mac app and have control over how the editor felt. SwiftUI handles the surrounding interface; the editor uses AppKit's text views inside a table.

There was still a lot to figure out. In an [early test](https://github.com/andrewv426/Flotion/blob/main/Spikes/ScrollSpike.swift), a page with 5,000 blocks took 236 ms to open. Just measuring the row heights took 162 ms.

The editor now estimates heights and measures them in batches. Then I had to fix the page shifting as those estimates changed. Scrolling over embedded diagrams caused its own problems with trackpad momentum. These are things I barely notice in other apps until they stop working.

## Flow, inspired by Mermaid

The diagram part became its own project. I liked [Mermaid's](https://mermaid.js.org/intro/index.html) idea of describing a diagram in text. I wanted to add steps so I could follow something happening, like a request going from a browser to a server and back.

That's what Flow does:

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

The nodes stay in place while messages animate between them. Tags carry over to the next step. Flotion handles positioning and colors, so the agent can edit the explanation without also writing the drawing code.

Parsing and layout happen in Swift. A small SVG player runs in an embedded web view. I ended up using web rendering for this part even though the editor itself is native.

## The parts I had to think through

An agent might edit a page while I'm typing in it. The app and MCP server share the same storage code, and incoming changes get merged block by block. Unsaved local edits are preserved, and agent changes are logged so I can undo a turn.

With Flow, I also had to make errors useful. If an agent references a node that doesn't exist, it gets a line number and a suggestion where possible. That gives it a way to fix the diagram.

A lot of this project has been working through details like those: what happens to my text during an agent edit, or why the page moves when a row gets taller. I wanted a faster notes app, and that ended up involving much more scrolling code than I'd have guessed.
