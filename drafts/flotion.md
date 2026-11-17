# Designing a macOS-native Notion

## Why I built it

I wanted a faster Notion with notes that AI agents could navigate and edit easily. Google Docs with Gemini wasn't working well for me, and my Notion MCP workflow couldn't create the animated diagrams I wanted. I liked the interactive explanations in Claude and Codex artifacts and wanted them alongside my notes.

Flotion keeps the nested pages and block editor I like, stores them locally in SQLite, and exposes them to agents through MCP. It's built with SwiftUI and AppKit.

## AppKit vs. Electron

I used SwiftUI for the surrounding interface and AppKit for the editor: an NSTableView with reusable NSTextView cells. That gives me control over text input, focus, and layout.

[Electron](https://www.electronjs.org/docs/latest/) offers a shared web codebase across macOS, Windows, and Linux. I accepted a Mac-only interface because I wanted to build around native text editing and scrolling. That choice still left plenty to fix.

In an [early experiment](https://github.com/andrewv426/Flotion/blob/main/Spikes/ScrollSpike.swift), opening 5,000 blocks took 236 ms. Measuring row heights accounted for 162 ms. The editor now starts with estimates where needed and refines them in small batches. I also had to keep those corrections from shifting the text on screen and get trackpad scrolling to behave over embedded diagrams.

## Editing alongside an agent

The app and MCP server use the same core for storage and editing operations. An agent can target a block or insert a diagram through a tool call.

The awkward part is handling changes while I'm typing. External writes notify the app, which merges updates block by block and preserves unsaved local edits. Agent changes are logged by turn so they can be undone. An editing tool needs to account for overlapping work, too.

## Flow: diagrams with steps

[Mermaid](https://mermaid.js.org/intro/index.html) inspired Flow's text-based approach. I wanted an agent to describe a system and then walk through what happens inside it. Flow declares nodes and arrows, followed by steps:

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

Messages animate along the arrows. Tags and status marks persist between steps, while message animations and focus effects last one step. The layout accounts for every step in advance, so nodes stay put as the explanation progresses.

Flow leaves layout and styling to Flotion. An agent can write `mark api: warn` without picking a color or placing a box. Invalid source gets line-specific errors with suggested fixes where possible.

Swift handles parsing and layout; a sandboxed WKWebView draws the SVG and plays transitions. Using AppKit for the editor still leaves room for web rendering where it's useful.

## What I learned

Much of the editor work came down to details I usually take for granted: keeping a page still while rows resize, preserving text during an external edit, and handling scroll momentum.

Flow taught me how useful a small language can be for agent editing. The app takes responsibility for presentation, so the agent can change the explanation directly. Adding a cache-miss step becomes an edit to a few lines of source stored with the notes.
