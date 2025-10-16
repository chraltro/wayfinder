# Wayfinder

A portfolio hub for developer tools and utilities, featuring Norse mythology-inspired applications built with modern web technologies.

## Overview

Wayfinder serves as a central navigation point for a collection of productivity tools designed to enhance developer workflows. Each application maintains a consistent design language while serving distinct purposes, from code analysis to presentation creation.

## Projects

### [Ansuz](../ansuz) - Code Explainer
Analyzes code files and generates detailed explanations using the Gemini API. Upload individual files or entire projects to receive block-by-block breakdowns with deep-dive capabilities for understanding design patterns and architectural decisions.

**Stack:** React, TypeScript, Vite, Tailwind CSS

### [Glosa](../glosa) - Article Summarizer
Processes articles and generates concise summaries with cross-device synchronization via GitHub Gists. Supports batch processing and maintains a browsable history of analyzed content.

**Stack:** Vanilla JavaScript, HTML, CSS

### [Hvila](../hvila) - Rest Timer
Progressive Web App implementing the Pomodoro technique with guided exercise breaks focused on preventing strain during extended work sessions. Includes offline functionality and session tracking.

**Stack:** Vanilla JavaScript, PWA

### [Munin](../munin) - Knowledge Base
Note-taking application with natural language processing for automatic organization. Uses private GitHub Gists for storage and supports full Markdown with live preview.

**Stack:** Vanilla JavaScript, Markdown

### [Saga](../saga) - Book Summarizer
Chapter-by-chapter book summarization tool supporting TXT and EPUB formats. Generates summaries and chapter images via Gemini and Imagen APIs with cross-device library sync.

**Stack:** React, TypeScript, Vite

### [Vedr](../vedr) - Presentation Builder
Markdown-to-HTML slide generator with Vim keybindings and live preview. Exports self-contained offline presentations with embedded fonts and syntax highlighting.

**Stack:** Next.js, TypeScript, Tailwind CSS, CodeMirror

## Design Philosophy

All applications follow a consistent approach:

- **Offline-first:** Minimize external dependencies where practical
- **Privacy-focused:** User data stays in browser storage or user-controlled cloud services
- **Minimal UI:** Clean interfaces that prioritize functionality
- **No accounts:** Self-hosted or client-side only, no authentication servers

## Theme System

Projects share a unified theme system (`shared/theme.css`) with Norse-inspired accent colors:

- Ansuz: Fjord Blue (`#00B4D8`)
- Glosa: Bronze Amber (`#D4A373`)
- Hvila: Forest Jade (`#06FFA5`)
- Munin: Blood Red (`#E63946`)
- Saga: Autumn Fire (`#FF8C42`)
- Vedr: Sky Blue (`#7DCFFF`)

## Local Development

Each project includes its own development setup. See individual README files for specific instructions.

## License

Projects are licensed individually. See each project's LICENSE file for details.
