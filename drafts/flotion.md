# Building Flotion

## Motivation

I like Notion's nested pages and blocks. I wanted something faster, though, and I wanted AI agents to be able to edit my notes without much friction.

I wasn't happy with Google Docs and Gemini. I wanted agents to edit specific blocks through a small, predictable interface. Building that myself gave me control over how edits were applied and how errors were reported.

I also tried working through Notion's MCP, but couldn't get the animated diagrams I wanted into my notes. Claude and Codex have the abiility to make interactive artifacts, but Notion supported mainly only mermaid/svg-style diagrams. I also tried having Claude/Codex generate images, the result ended up being ai-slop due to a lack of consistency/structure/scope. 

So I started building Flotion: a native Mac notes app with a block editor, local SQLite storage, and an MCP server. Building an app yourself gives you the ability to constantly iterate and implement/test a variety of agentic capabilities. 

## AppKit vs. Electron

[Electron](https://www.electronjs.org/docs/latest/) would've let me use web technologies and support multiple platforms. I went with SwiftUI and AppKit because I wanted to build a Mac app and have control over how the editor felt. SwiftUI handles the surrounding interface; the editor uses AppKit's text views inside a table.

There was still a lot to figure out. In an [early test](https://github.com/andrewv426/Flotion/blob/main/Spikes/ScrollSpike.swift), a page with 5,000 blocks took 236 ms to open. Just measuring the row heights took 162 ms.

That test exposed a bottleneck in my AppKit implementation: I was measuring every row before showing the page. I didn't build an Electron version to compare. A [web-based editor also has to manage large lists and variable row heights](https://web.dev/articles/virtualize-long-lists-react-window), so changing frameworks wouldn't automatically remove that work.

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

Here are two frames from a larger Flow diagram in Flotion: the cache miss, then the response.

![Flow's cache-miss step: the API checks Redis, which is marked with a warning and a miss tag.](https://raw.githubusercontent.com/andrewv426/Flotion/main/docs/images/flow-cache-miss.png)

![Flow's response step: a 200 OK message returns to the browser while Redis keeps its miss tag.](https://raw.githubusercontent.com/andrewv426/Flotion/main/docs/images/flow-cache-response.png)

The nodes stay in place while messages animate between them. Tags carry over to the next step. Flotion handles positioning and colors, so the agent can edit the explanation without also writing the drawing code.

Parsing and layout happen in Swift. A small SVG player runs in an embedded web view. I ended up using web rendering for this part even though the editor itself is native. 

## Interesting Issues

An agent might edit a page while I'm typing in it. The app and MCP server share the same storage code, and incoming changes get merged block by block. Unsaved local edits are preserved, and agent changes are logged so I can undo a turn.

With Flow, I also had to make errors useful. If an agent references a node that doesn't exist, it gets a line number and a suggestion where possible. It can use that context to fix the source directly, saving the cost of taking a screenshot and using vision to figure out what's wrong.

A lot of this project has been working through details like those: what happens to my text during an agent edit, or why the page moves when a row gets taller. I wanted a faster notes app, and that ended up involving much more scrolling code than I'd have guessed.
