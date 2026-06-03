<h1 align="center">
  <img src="https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/images/terminal-icon.jpg" alt="Terminal All In One" width="200">
  <br>
  <b>Terminal All In One</b>
</h1>

<p align="center"><strong>Save and run terminal scripts, apply 100+ terminal themes, and control your terminal with keybindings</strong></p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one"><img src="https://vsmarketplacebadges.dev/version-short/yasht.terminal-all-in-one.svg?style=for-the-badge&labelColor=000000&label=Version&color=007ACC&logo=gnometerminal&logoColor=FFFFFF" alt="Version"></a>&nbsp;
  <a href="https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one"><img src="https://vsmarketplacebadges.dev/installs-short/yasht.terminal-all-in-one.svg?style=for-the-badge&labelColor=000000&label=Installs&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI%2BPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTUgMjBoMTR2LTJINXYyek0xMiA0djguMTdsMy41OS0zLjU4TDE3IDEwbC01IDUtNS01IDEuNDEtMS40MUwxMSAxMi4xN1Y0aDJ6Ii8%2BPC9zdmc%2B" alt="Installs"></a>&nbsp;
  <a href="https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one&ssr=false#review-details"><img src="https://vsmarketplacebadges.dev/rating-short/yasht.terminal-all-in-one.svg?style=for-the-badge&labelColor=000000&label=Rating&color=FE7D37&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI%2BPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJsMy4wOSA2LjI2TDIyIDkuMjdsLTUgNC44NyAxLjE4IDYuODhMMTIgMTcuNzdsLTYuMTggMy4yNUw3IDE0LjE0IDIgOS4yN2w2LjkxLTEuMDF6Ii8%2BPC9zdmc%2B" alt="Rating"></a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/ChooseATerminalTheme.gif" alt="Choosing a terminal theme" width="600">
</p>

## Contents <!-- omit in toc -->

- [Commands \& Keybindings](#commands--keybindings)
- [Configuration](#configuration)
  - [Themes](#themes)
  - [Scripts](#scripts)
  - [Keybindings](#keybindings)
  - [Messages](#messages)
- [Contributing](#contributing)

## Commands & Keybindings

Press `cmd+i` (macOS) or `ctrl+i` (Windows/Linux), then the key below — toggling the terminal is the one exception (no `i`). Every command is also available from the Command Palette under **Terminal All In One**. Set `terminalAllInOne.disableAllKeybindings` to `true` to turn the keybindings off.

| Keybinding             | Command                   | Description                                        |
| ---------------------- | ------------------------- | -------------------------------------------------- |
| `cmd/ctrl+i t`         | Choose Theme              | Live-preview and apply one of 100+ terminal themes |
| `cmd/ctrl+i enter`     | Run Script                | Pick a saved script to run                         |
| `cmd/ctrl+i 0`–`9`     | Run Script                | Run one of your first 10 saved scripts directly    |
| `` cmd/ctrl+` ``       | Toggle Terminal           | Show or hide the integrated terminal               |
| `cmd/ctrl+i m`         | Toggle Maximized Terminal | Maximize or restore the terminal panel             |
| `cmd/ctrl+i c`         | Create New Terminal       | Open a new terminal instance                       |
| `cmd/ctrl+i d`         | Delete Current Terminal   | Close the active terminal                          |
| `cmd/ctrl+i r`         | Rename Current Terminal   | Rename the active terminal                         |
| `cmd/ctrl+i .`         | Focus Next Terminal       | Switch to the next terminal                        |
| `cmd/ctrl+i ,`         | Focus Previous Terminal   | Switch to the previous terminal                    |
| `cmd/ctrl+i ]`         | Split Terminal            | Split the active terminal                          |
| `cmd/ctrl+i backspace` | Clear Terminal            | Clear the active terminal                          |
| `cmd/ctrl+i s`         | Select Default Shell      | Choose the default shell (bash, zsh, etc.)         |
| `cmd/ctrl+i w`         | Change Cursor Width       | Live-preview and set the cursor width              |
| `cmd/ctrl+i y`         | Change Cursor Style       | Live-preview and set the cursor style              |
| `cmd/ctrl+i b`         | Toggle Blinking Cursor    | Turn cursor blinking on or off                     |
| `cmd/ctrl+i f`         | Change Font Size          | Live-preview and set the terminal font size        |
| `cmd/ctrl+i -`         | Decrease Font Size        | Decrease the terminal font size by 1pt             |
| `cmd/ctrl+i =`         | Increase Font Size        | Increase the terminal font size by 1pt             |
| `cmd/ctrl+i q`         | Change Font Weight        | Live-preview and set the terminal font weight      |

## Configuration

### Themes

`terminalAllInOne.terminalTheme` — the active terminal theme, from [this list](https://glitchbone.github.io/vscode-base16-term/#/). Set it with the **Choose Theme** command (`cmd/ctrl+i t`). Defaults to `"None"` (no styling).

### Scripts

`terminalAllInOne.scripts` — your saved scripts. Each entry has a `name` and a `script`, which is either a single command (string) or multiple commands run in order (array). Run them with **Run Script** (`cmd/ctrl+i enter`), or `cmd/ctrl+i 0`–`9` for your first 10.

```json
{
  "terminalAllInOne.scripts": [
    { "name": "Greet", "script": ["echo hello", "echo How was your day?"] },
    { "name": "List workspace", "script": "ls ${workspaceFolder}" },
    {
      "name": "Install deps",
      "script": ["npm i react", "npm i --save-dev mocha"]
    }
  ]
}
```

Scripts support [VS Code variables](https://code.visualstudio.com/docs/editor/variables-reference) such as `${workspaceFolder}`, `${file}`, `${relativeFile}`, `${lineNumber}`, `${selectedText}`, and `${config:Name}`. Set `terminalAllInOne.script.disableAutoRun` to `true` to insert a script's command into the terminal without running it.

### Keybindings

`terminalAllInOne.disableAllKeybindings` — set to `true` to disable every keybinding listed above. Defaults to `false`.

### Messages

`terminalAllInOne.disableAllMessages` — set to `true` to silence all info, warning, and error messages from the extension.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](https://github.com/YashTotale/terminal-all-in-one?tab=contributing-ov-file#readme) for local development setup. To report a bug or request a feature, open an [issue](https://github.com/YashTotale/terminal-all-in-one/issues/new/choose); for usage questions, start a thread in [Discussions](https://github.com/YashTotale/terminal-all-in-one/discussions/categories/q-a).

Licensed under [MIT](https://github.com/YashTotale/terminal-all-in-one?tab=MIT-1-ov-file#readme).
