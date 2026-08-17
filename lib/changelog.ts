export type ChangeKind = "Added" | "Changed" | "Fixed"

export interface ChangelogEntry {
  version: string
  date?: string
  highlight?: string
  /** One-line rename / migration callout, shown under the highlight. */
  note?: string
  groups: { kind: ChangeKind; items: string[] }[]
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "0.2.6",
    date: "18.08.2026",
    highlight:
      "npm install now ships cli-ck-branded desktop binaries instead of leftover Oz artifacts.",
    note: "Oz is now cli-ck. Uninstall `@codecollab.co/oz` and Oz.app, then `npm install -g @codecollab.co/cli-ck`.",
    groups: [
      {
        kind: "Changed",
        items: [
          "Renamed from Oz to cli-ck: package `@codecollab.co/cli-ck`, GitHub `cli-ck/cli-ck`, bundle ID `app.cli-ck.cli-ck`.",
        ],
      },
      {
        kind: "Fixed",
        items: [
          "npm launcher and GitHub release zips no longer use `oz_*` artifact names. `npm install -g @codecollab.co/cli-ck` now looks for `cli-ck_*` binaries.",
          'Settings → About always shows cli-ck branding (name, bundle ID, GitHub, website) instead of whatever `getName()` returns from an old Oz binary, and surfaces failed external-link opens.',
        ],
      },
    ],
  },
  {
    version: "0.2.5",
    date: "27.07.2026",
    highlight:
      "Full Language Server Protocol (LSP) support - diagnostics, hover, go-to-definition, completion, and formatting across 20 languages.",
    groups: [
      {
        kind: "Added",
        items: [
          "LSP: in-editor diagnostics, hover, go-to-definition, completion, format, references, and rename, with 20 built-in server presets (TypeScript, rust-analyzer, Pyright, Ruff, gopls, clangd, zls, and more) plus custom server support and a status indicator.",
          "Settings → Agents: click anywhere on a tile to activate it, plus a new details view (eye icon) showing an agent's name, description, and instructions - read-only for built-in agents, with an edit hand-off for custom ones.",
        ],
      },
      {
        kind: "Changed",
        items: [
          "AI model catalog refreshed: added GPT-5.6, Claude Sonnet 5, and Grok 4.5; dropped deprecated/redirected models.",
          "Settings: voice-input and autocomplete model dropdowns now only show providers you've actually connected, matching the chat-model picker; local whisper.cpp support now has its own setup row with a live reachability check.",
        ],
      },
      {
        kind: "Fixed",
        items: [
          'AI chat no longer masks real errors behind a generic "An error occurred." message - the actual provider/model/tool error is now shown.',
          'Settings → About: the "Build" field no longer shows a stale hardcoded version; the "Website" link no longer reads "(Coming soon)" and now opens the real site.',
        ],
      },
    ],
  },
  {
    version: "0.2.4",
    date: "13.07.2026",
    highlight:
      "New emerald brand identity, working auto-update, and a faster native TypeScript toolchain.",
    groups: [
      {
        kind: "Changed",
        items: [
          'Brand: new flat emerald "prompt-caret" logo across the app, installers, and mobile icon sets, replacing the old glossy mark.',
          'Settings: the chat-model picker now shows "Add a provider to choose a model" while no provider is configured, instead of a locked-looking default.',
        ],
      },
      {
        kind: "Fixed",
        items: [
          "Auto-update: releases now publish a signed `latest.json` (updater signing key configured), so in-app update checks work instead of failing to fetch a manifest.",
        ],
      },
    ],
  },
  {
    version: "0.2.3",
    date: "12.07.2026",
    highlight:
      "Friction-free install for unsigned test builds on macOS, Windows, and Linux.",
    groups: [
      {
        kind: "Added",
        items: [
          "`cli-ck install` and `cli-ck uninstall` subcommands.",
          "README guidance for installing unsigned test builds across all three platforms.",
        ],
      },
      {
        kind: "Fixed",
        items: [
          "npm launcher (`@codecollab.co/cli-ck`) now installs cli-ck where the OS expects it: `/Applications` (macOS), a Start Menu shortcut (Windows), and a `.desktop` entry (Linux), so cli-ck appears as a normally installed app.",
          'macOS: strip the `com.apple.quarantine` flag and repair the ad-hoc signature on install, resolving the "cli-ck is damaged" Gatekeeper error on Apple Silicon.',
          "Windows: clear the mark-of-the-web (`Unblock-File`) to avoid SmartScreen prompts.",
          "Launcher now starts cli-ck detached via `open` / spawn, freeing the terminal instead of holding it open until quit.",
        ],
      },
    ],
  },
  {
    version: "0.2.2",
    date: "25.06.2026",
    highlight:
      "Command palette, block-mode terminal, spaces, document viewers, and agent notifications.",
    groups: [
      {
        kind: "Added",
        items: [
          "Command palette: fuzzy launcher for every quick action, with in-file content search and command history.",
          "Block-mode terminal: GPU-accelerated, Warp-style command blocks with a unified shell/AI input bar and editor-like input panel.",
          "Spaces: persisted tab groups you can create, rename, and drag to organize.",
          "Media and document viewers: images, audio, video, PDF, and rendered or raw markdown.",
          "Explorer: drag-and-drop support and git decorations on the file tree.",
          "Zen mode to hide the header and status bar.",
          "Editor auto-save with a configurable delay.",
          "Multiple OpenAI-compatible endpoints; LaTeX and Astro syntax highlighting.",
          "Terminal: macOS readline bindings (Cmd+Arrow, Cmd/Opt+Backspace), Cmd+K to clear scrollback, rename tabs via right-click, middle-click to close.",
          "Drop file paths into the active pane with bracketed-paste and DPI-correct hit detection.",
          "Confirm before closing a tab with a running process.",
          "Official Nix/NixOS support with an auto-update workflow.",
          "Agent notifications and management - one bell, one router for the built-in agent and every terminal coding agent.",
          "Live filesystem watcher for the explorer tree and open editors.",
          "/claude-code slash command to orchestrate agents via cli-ck AI.",
        ],
      },
      {
        kind: "Changed",
        items: [
          "UI/UX polish across tabs, panels, header, and sidebar, with native CSS animations replacing the motion library.",
          "Dynamic window title from the project folder and active terminal.",
          "Source control: right-click context menu on changed files.",
          "Terminal perf: static cursor default, WebGL slot reaping, and TUI keep-alive.",
        ],
      },
      {
        kind: "Fixed",
        items: [
          "Ctrl+B reaches the terminal/Claude; sidebar toggle moved to Ctrl+Shift+B.",
          "Explorer highlights the active file.",
          "Editor: correct cursor positioning on macOS at non-100% zoom; language reconfiguration when the document becomes ready.",
          "macOS: settings window no longer hides behind the main window; press-and-hold character popup disabled.",
          "Terminal: block IME composition keydown events from reaching the PTY.",
          "Linux: strip bundled Wayland libs from the AppImage to fix the EGL crash on newer Mesa.",
          "Editor: preserve original file permissions on atomic-write rename.",
          "PTY: authorize the CLI launch directory in the workspace registry on startup.",
          "Settings window is resizable, with a larger default size.",
          "Terminal: cwd above home, Windows verbatim paths, CI/test hardening.",
          "Windows: System32 launch dir, PTY reload reap, paste + stale-render fixes.",
        ],
      },
    ],
  },
  {
    version: "0.2.1",
    highlight:
      "Themes and customization, MLX + Ollama local LLMs, source control panel + git graph, and security hardening.",
    groups: [
      {
        kind: "Added",
        items: [
          "Custom themes and presets - build in-app, save, switch between bundled and your own. Covers terminal palette and surrounding UI together.",
          "Background images with adjustable opacity and blur.",
          "Editor-based custom theme editor - edit tokens inline rather than hand config.",
          "Full ANSI terminal palette in the theme model.",
          "MLX and Ollama as local AI providers, with autocomplete via local models.",
          "Source control panel with hunk staging, commit, and a real commit graph.",
          "Open in cli-ck shell integration on Windows.",
          "Mistral AI provider.",
          "Ruby syntax highlighting in the editor.",
          "Markdown preview tab via explorer right-click.",
          "Configurable context limit for OpenAI-compatible providers.",
          "Configurable terminal font family.",
          "Workspace file picker in AI chat - type @ to insert a file reference.",
        ],
      },
      {
        kind: "Changed",
        items: [
          "Reasoning / thinking blocks stripped from history before the model call (Cerebras/others).",
          "Composer keeps focus and accepts typing while the agent is streaming.",
          "Models settings tab redesigned, model picker scroll fixed.",
          "AI mini-window: todo panel sizes to content, caps at 35% for long lists.",
          "Security pass: AI tool deny-list hardening, SSRF guard, terminal OSC trust boundary, preview iframe sandbox, WSL distro validation.",
          "RendererPool capacity bumped from K=4 to K=5 for smoother multi-tab terminals.",
          "Fish shell support: more reliable startup and prompt rendering.",
        ],
      },
      {
        kind: "Fixed",
        items: [
          "Windows ConPTY lifecycle race - CreatePseudoConsole and ClosePseudoConsole now share one lock.",
          "Console window no longer flashes when cli-ck spawns subprocesses (shell init, git).",
          "New terminals no longer try to launch into the install directory.",
          "Shortcut changes made in Settings propagate to the main window without a restart.",
          "Agent and snippet editor dialogs scroll their body so Save/Cancel cannot get pushed off screen.",
          "Selection rendering across themes; Linux clipboard handling.",
          "WSL: git and shells honor the workspace env.",
          "Explorer: file tree stays static across InlineInput open/cancel cycles.",
          "AI mini-window: responsive, scrollable todo list.",
          "Terminal: Option+arrow word navigation.",
          "Terminal: TUIs repaint on resume instead of replaying dormant bytes.",
          "Search: terminal refocuses after dismissing find.",
          "Editor: files auto-reload when the AI modifies them.",
          "Editor undo/redo wired and surfaced in the shortcuts dialog.",
          "Security: shell command guard now blocks CR/LF and C0 controls.",
          "Security: O_EXCL random tempfile for atomic writes.",
          "TUI apps no longer freeze when a tab is hibernated and restored.",
          "Tabs with unsaved edits are preserved when the underlying file is deleted on disk.",
        ],
      },
    ],
  },
  {
    version: "0.2.0",
    highlight:
      "Cross-platform releases (Windows & Linux), terminal split-panes, lazy-loaded AI modules, and security releases.",
    groups: [
      {
        kind: "Added",
        items: [
          "First Windows release (NSIS installer).",
          "oz_open shell command - open files into a cli-ck editor tab from any terminal.",
          "Contributor docs and templates.",
          "Split panes in the terminal.",
          "Transient preview tabs with pinning behavior.",
          "DeepSeek provider.",
          "Customizable keyboard shortcuts in Settings.",
          "Ctrl-Backspace deletes the previous word in the terminal.",
          "Editor language support: Go, C, C++, Java, C#.",
          "Terminal: WebGL toggle and persistent font-size preferences.",
          "Explorer: show-hidden-folders toggle.",
          "AI: Gemini 2.5 Flash, Gemma 3 27B, and searchable model picker.",
          "Styled confirm dialog for closing tabs with unsaved changes.",
          "WSL workspaces are detected and supported on Windows.",
          "Window management for linux.",
          "Auto-updater wired into release builds.",
          "GitHub Actions workflow for cross-platform builds and releases.",
        ],
      },
      {
        kind: "Changed",
        items: [
          "Optimized the WebGL renderer pool - lower memory and steadier frame times across many tabs.",
          "Search focus and keyboard handling refined for explorer and file search.",
          "Secrets (keyring) redesign; auto updater stabilization.",
          "New sessions now open in $HOME by default.",
          "Stabilized zsh / bash / pwsh init scripts.",
          "Editor and AI modules now lazy-load - smaller install, faster cold start.",
          "ProductDemo assets and updated README screenshots.",
          "Dependency version sweep.",
          "Snippets and commands merged into a single palette.",
        ],
      },
      {
        kind: "Fixed",
        items: [
          "Critical security fix: removed the OSC 8888 escape sequence handler to prevent remote SSH host arbitrary file reads.",
          "Settings model dropdowns are now scrollable on small windows.",
          "Inactive terminal tabs no longer bleed across the split divider.",
          "Explorer tree names and inline inputs clip cleanly inside the sidebar.",
          "Windows: main window title now set correctly.",
          "Windows PTY: Tauri worker no longer blocks on close.",
          "Terminal: UTF-8 locale forced for PowerShell sessions.",
          "Terminal: respawn cleans up pending-exit and pty-opening state.",
          "Explorer: rename/create inputs no longer blur when the context menu opens.",
          "LM Studio and other keyless providers work in the model picker and chat send.",
          "Settings window stays above the main app and broadcasts preference changes across windows.",
          "AI mini-window no longer overshadows the input bar.",
          "Explorer inline input survives the context menu open path.",
          "Explorer create / rename input no longer disappears before you can type.",
          "TabBar padding and alignment.",
          "Gemini model IDs updated to use the -preview suffix.",
          "Linux window initialization on first launch.",
          "Bumped Node and pnpm in the release pipeline.",
        ],
      },
    ],
  },
  {
    version: "0.1.5",
    highlight:
      "Vim mode in the editor, explorer keyboard navigation, and full agentic workflows (plans, sub-agents, tasks).",
    groups: [
      {
        kind: "Added",
        items: [
          "Vim mode in the editor (motions, registers, marks).",
          "Keyboard navigation across the file explorer.",
          "Full agentic workflow: plans, sub-agents, tasks, project init.",
          "Improved shell tool for the agent.",
          "Skills and multi-agent support.",
          "Settings UI improvements.",
        ],
      },
      {
        kind: "Changed",
        items: [
          "UI polish across AI and agent views.",
          "AI mini-window UI/UX improvements.",
          "Cleanup pass: dependencies, UI, icons.",
          "Optimized PTY resize, session lifecycle, and AI context handling.",
          "Agents UI/UX improvements.",
        ],
      },
    ],
  },
  {
    version: "0.1.4",
    highlight:
      "Web preview tab, editor tabs split, local LLM support, AI autocomplete.",
    groups: [
      {
        kind: "Added",
        items: [
          "Web preview tab with auto-detection of local dev servers.",
          "Workspace-wide file search.",
          "Editor tabs decoupled from terminal tabs.",
          "AI Edit Diffs - preview and approve agent edits before applying.",
          "Local LLM support via LM Studio.",
          "Groq and Cerebras providers.",
          "AI autocomplete in the editor.",
        ],
      },
      {
        kind: "Changed",
        items: ["AI autocomplete: improved latency and accuracy."],
      },
    ],
  },
  {
    version: "0.1.3",
    highlight: "Tauri keyring credentials and initial AI agents.",
    groups: [
      {
        kind: "Added",
        items: [
          "Tauri keyring - API keys now stored in the OS keychain.",
          "AI agents (initial implementation).",
          "Apache-2.0 license.",
          "New AI mini-window.",
          "Text selection handling and session persistence.",
          "Standalone settings window.",
          "Autostart and window-state persistence.",
        ],
      },
      {
        kind: "Changed",
        items: [
          "Icon set and theme refresh.",
          "Internal renaming pass.",
          "Internal refactor.",
          "Settings UI improvements.",
        ],
      },
    ],
  },
  {
    version: "0.1.1",
    highlight: "File explorer and CodeMirror 6 editor.",
    groups: [
      {
        kind: "Added",
        items: [
          "File explorer (first version).",
          "Code editor based on CodeMirror 6.",
          "File explorer context menu.",
        ],
      },
      {
        kind: "Changed",
        items: ["General refactor; editor improvements."],
      },
      {
        kind: "Fixed",
        items: ["Various bug fixes."],
      },
    ],
  },
  {
    version: "0.1.0",
    highlight:
      "First prototype: AI side panel, status bar, and WebGL terminal support.",
    groups: [
      {
        kind: "Added",
        items: [
          "AI side panel, status bar, and keyboard shortcuts.",
          "Logging.",
          "AI SDK and AI Elements integration.",
          "New app logo.",
          "Configurable window size.",
          "Multi-tab support.",
          "Basic layout UI.",
          "Custom font and theme.",
          "Tauri window management.",
          "xterm.js WebGL renderer, search, and link plugins.",
          "shadcn/ui component set and supporting deps.",
          "Child process lifecycle handling.",
          "Per-session locking.",
          "Initial Rust PTY backend with xterm.js in React.",
        ],
      },
      {
        kind: "Changed",
        items: [
          "New UI shell.",
          "Internal refactor; fixed render/resize race.",
          "Rendering and resize improvements.",
          "Header and tabs UI polish.",
          "Switched icon library from Lucide to HugeIcons.",
        ],
      },
      {
        kind: "Fixed",
        items: ["Shell script handling and session edge cases."],
      },
    ],
  },
]
