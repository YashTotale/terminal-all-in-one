# Contributing to Terminal All In One

Thanks for your interest in contributing!

## Development Setup

You'll need [Node.js](https://nodejs.org/) and [VS Code](https://code.visualstudio.com/). The extension targets VS Code `^1.84.0`. This project uses [pnpm](https://pnpm.io/) — enable it with `corepack enable`.

1. Fork and clone the repository:

   ```bash
   git clone https://github.com/<your-username>/terminal-all-in-one.git
   cd terminal-all-in-one
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build the extension once, or rebuild on every change:

   ```bash
   pnpm run build:dev   # one-off development build
   pnpm run watch       # rebuild on file changes
   ```

4. Press **F5** in VS Code to launch an Extension Development Host with the extension loaded. Try the commands via `cmd/ctrl+i` or the Command Palette (**Terminal All In One**).

5. Run the tests:

   ```bash
   pnpm run test:compile   # compile the tests to ./out
   pnpm test
   ```

6. Lint before opening a pull request:

   ```bash
   pnpm run lint
   ```

### Running in Conductor

[Conductor](https://conductor.build/) reads `conductor.json` to set up each workspace, then clicking **Run** builds the extension and opens an isolated Extension Development Host with it loaded, watching for changes. This requires the `code` CLI on your PATH (in VS Code: **Shell Command: Install 'code' command in PATH**). After editing, reload the dev host with **Cmd+R** to pick up the rebuilt extension.

## Reporting Bugs & Requesting Features

Search [existing issues](https://github.com/YashTotale/terminal-all-in-one/issues) first. If nothing matches, open a [new issue](https://github.com/YashTotale/terminal-all-in-one/issues/new/choose) and include:

- Your OS and VS Code version
- Steps to reproduce
- What you expected versus what actually happened
- A screenshot or recording, if relevant

## Asking Questions

For usage questions, start a thread in [Discussions Q&A](https://github.com/YashTotale/terminal-all-in-one/discussions/categories/q-a) rather than opening an issue.
