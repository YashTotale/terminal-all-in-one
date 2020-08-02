<h1 align="center">
  <br>
    <img src="https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/src/images/terminal-icon.jpg" alt="logo" width="200">
  <br>
  <br>
  <b>Terminal All In One</b>
  <br>
  <br>
  <!-- Version -->
  <a
    href="https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one">
    <img
      src="https://img.shields.io/visual-studio-marketplace/v/yasht.terminal-all-in-one?logo=visual-studio-code&style=for-the-badge&labelColor=000000&label=Version"
      alt="Version">
  </a>
</h1>

<p align="center">
  <!-- Build -->
  <a
    href="https://travis-ci.org/github/YashTotale/terminal-all-in-one">
    <img
      src="https://img.shields.io/travis/YashTotale/terminal-all-in-one?logo=travis-ci&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Build"
      alt="Build">
  </a>
  &nbsp;
  <!-- Code Quality -->
  <a
    href="https://scrutinizer-ci.com/g/YashTotale/terminal-all-in-one/?branch=master">
    <img
      src="https://img.shields.io/scrutinizer/quality/g/YashTotale/terminal-all-in-one?style=for-the-badge&labelColor=000000&logo=scrutinizer-ci&label=Code%20Quality"
      alt="Code Quality">
  </a>
  &nbsp;
  <!-- Vulnerabilities -->
  <a
    href="https://snyk.io/test/github/YashTotale/terminal-all-in-one">
    <img
      src="https://img.shields.io/snyk/vulnerabilities/github/YashTotale/terminal-all-in-one?logo=snyk&style=for-the-badge&labelColor=000000&label=vulnerabilities"
      alt="Vulnerabilities">
  </a>
  &nbsp;
</p>

**Table Of Contents**  
_Featured Content is Italicized_

- [Installation](#installation)
- [Commands](#commands)
  - _[Choose Theme](#terminal-all-in-one-choose-theme)_
  - [Toggle Maximized Terminal](#terminal-all-in-one-toggle-maximized-terminal)
- [Keybindings](#keybindings)
  - [Mac](#mac)
  - [Windows and Linux](#windows-and-linux)
- [Configuration](#configuration)
  - _[Terminal Theme](#terminal-theme)_
  - [Messages](#messages)
- [Demos](#demos)
- [Contribute](#contribute)

---

## Installation

1. Open [Terminal All In One - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one)
2. Click "Install"

OR

1. Open [Visual Studio Code](https://code.visualstudio.com/)
2. Open the Extensions View -> (`Shift+Cmd+P` or `F1` and type "Extensions: Install Extensions") or (`Shift+Cmd+X`)
3. Type "Terminal All In One"
4. Click "Install"

OR

1. Open a command-line prompt
2. Run `code --install-extension yasht.terminal-all-in-one`

---

## Commands

### Terminal All In One: Choose Theme

- `terminalAllInOne.chooseTerminalTheme`

- Opens a Theme Quick Pick with over **100** Themes to choose from
- Live Preview in the Terminal when focusing a theme
- Keybinding: `cmd/ctrl+i t`

### Terminal All In One: Toggle Maximized Terminal

- `terminalAllInOne.toggleMaxTerm`

- Keybinding: `cmd/ctrl+i m`

---

## Keybindings

**For each keybinding, press `cmd+i` (for Macs) or `ctrl+i` (for Windows & Linux), and the corresponding key for the terminal command.**

### Mac

| Shortcut    | Description                          | Command                                        |
| ----------- | ------------------------------------ | ---------------------------------------------- |
| `` cmd+` `` | Toggle the Terminal                  | `workbench.action.terminal.toggleTerminal`     |
| `cmd+i m`   | Toggle the Maximized Terminal        | `terminalAllInOne.toggleMaxTerm`               |
| `cmd+i s`   | Select a Default Shell               | `workbench.action.terminal.selectDefaultShell` |
| `cmd+i c`   | Create a New Terminal Instance       | `workbench.action.terminal.new`                |
| `cmd+i d`   | Remove the Current Terminal Instance | `workbench.action.terminal.kill`               |
| `cmd+i r`   | Rename the Current Terminal Instance | `workbench.action.terminal.rename`             |
| `cmd+i .`   | Focus the Next Terminal Instance     | `workbench.action.terminal.focusNext`          |
| `cmd+i ,`   | Focus the Previous Terminal Instance | `workbench.action.terminal.focusPrevious`      |
| `cmd+i t`   | Choose a Terminal Theme              | `terminalAllInOne.chooseTerminalTheme`         |

### Windows and Linux

| Shortcut     | Description                          | Command                                        |
| ------------ | ------------------------------------ | ---------------------------------------------- |
| `` ctrl+` `` | Toggle the Terminal                  | `workbench.action.terminal.toggleTerminal`     |
| `ctrl+i m`   | Toggle the Maximized Terminal        | `terminalAllInOne.toggleMaxTerm`               |
| `ctrl+i s`   | Select a Default Shell               | `workbench.action.terminal.selectDefaultShell` |
| `ctrl+i c`   | Create a New Terminal Instance       | `workbench.action.terminal.new`                |
| `ctrl+i d`   | Remove the Current Terminal Instance | `workbench.action.terminal.kill`               |
| `ctrl+i r`   | Rename the Current Terminal Instance | `workbench.action.terminal.rename`             |
| `ctrl+i .`   | Focus the Next Terminal Instance     | `workbench.action.terminal.focusNext`          |
| `ctrl+i ,`   | Focus the Previous Terminal Instance | `workbench.action.terminal.focusPrevious`      |
| `ctrl+i t`   | Choose a Terminal Theme              | `terminalAllInOne.chooseTerminalTheme`         |

---

## Configuration

### Terminal Theme

- `terminalAllInOne.terminalTheme`
- Choose a Terminal Theme from a [list of themes](https://glitchbone.github.io/vscode-base16-term/#/).
- Use the command [`terminalAllInOne.chooseTerminalTheme`](#terminal-all-in-one-choose-theme) or the keybinding `cmd/ctrl+i t` to control this setting.
- Default Configuration :

  ```json
  {
    "terminalAllInOne.terminalTheme": "None"
  }
  ```

### Messages

- `terminalAllInOne.messages`
- Controls which messages should be shown when certain actions occur
- Default Configuration :

  ```json
  {
    "terminalAllInOne.messages": {
      "shouldShowSelectedThemeMessage": true,
      "shouldShowThemeQuickPickMessage": true
    }
  }
  ```

---

## Demos

<!-- Toggle the Terminal -->

<details>

<summary>Toggle the Terminal</summary>

![Toggle the Terminal](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/src/demos/ToggleTerminal.gif)

</details>

<br>

<!-- Toggle the Maximized Terminal -->

<details>
<summary>Toggle the Maximized Terminal</summary>

![Toggle the Maximized Terminal](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/src/demos/ToggleMaximizedTerminal.gif)

</details>

<br>

<!-- Select a Default Shell -->

<details>
<summary>Select a Default Shell</summary>

![Select a Default Shell](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/src/demos/SelectDefaultShell.gif)

</details>

<br>

<!-- Create a New Terminal Instance-->

<details>
<summary>Create a New Terminal Instance</summary>

![Create A New Terminal Instance](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/src/demos/CreateNewTerminal.gif)

</details>

<br>

<!-- Remove the Current Terminal Instance -->

<details>
<summary>Remove the Current Terminal Instance</summary>

![Remove the Current Terminal Instance](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/src/demos/RemoveCurrentTerminal.gif)

</details>

<br>

<!-- Rename the Current Terminal Instance -->

<details>
<summary>Rename the Current Terminal Instance</summary>

![Rename the Current Terminal Instance](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/src/demos/RenameCurrentTerminal.gif)

</details>

<br>

<!-- Focus the Next Terminal Instance -->

<details>
<summary>Focus the Next Terminal Instance</summary>

![Focus the Next Terminal Instance](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/src/demos/FocusNextTerminal.gif)

</details>

<br>

<!-- Focus the Previous Terminal Instance -->

<details>
<summary>Focus the Previous Terminal Instance</summary>

![Focus the Previous Terminal Instance](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/src/demos/FocusPreviousTerminal.gif)

</details>

<br>

<!-- Choose a Terminal Theme -->

<details>
<summary>Choose a Terminal Theme</summary>

![Choose a Terminal Theme](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/src/demos/ChooseATerminalTheme.gif)

</details>

---

## Contribute

**Would you like to contribute?**

- Go to the [github repository](https://github.com/YashTotale/terminal-all-in-one)
- Open a new issue or pull request

_Check out [first contributions](https://github.com/firstcontributions/first-contributions) if you are new to contributing_

---

<p align="center">
<!-- Installs -->
  <a
    href="https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one">
    <img
      src="https://img.shields.io/visual-studio-marketplace/i/yasht.terminal-all-in-one?logo=visual-studio-code&style=for-the-badge&labelColor=000000&label=Installs"
      alt="Installs">
  </a>
  &nbsp;
<!-- Rating -->
  <a
    href="https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one&ssr=false#review-details">
    <img
      src="https://img.shields.io/visual-studio-marketplace/r/yasht.terminal-all-in-one?logo=visual-studio-code&style=for-the-badge&labelColor=000000&label=Rating"
      alt="Rating">
  </a>
  &nbsp;
  <!-- Downloads -->
  <a
    href="https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one">
    <img
      src="https://img.shields.io/visual-studio-marketplace/d/yasht.terminal-all-in-one?logo=visual-studio-code&style=for-the-badge&labelColor=000000&label=Downloads"
      alt="Downloads">
  </a>
  &nbsp;
</p>

---

<!-- <p align="center"> -->
  <!-- Dependencies -->

<!-- <a
    href="https://david-dm.org/YashTotale/terminal-all-in-one">
<img
      src="https://img.shields.io/david/YashTotale/terminal-all-in-one?style=for-the-badge&labelColor=000000&label=Dependencies"
      alt="Dependencies">
</a>
&nbsp; -->

<!-- Dev Dependencies -->
<!-- <a
    href="https://david-dm.org/YashTotale/terminal-all-in-one?type=dev">
<img
      src="https://img.shields.io/david/dev/YashTotale/terminal-all-in-one?style=for-the-badge&labelColor=000000&label=Dev Dependencies"
      alt="Dev Dependencies">
</a>
&nbsp;
</p> -->

<!-- --- -->

<p align="center">
<!-- Last Commit -->
  <a
    href="https://github.com/YashTotale/terminal-all-in-one/commits/master">
    <img
      src="https://img.shields.io/github/last-commit/YashTotale/terminal-all-in-one?style=for-the-badge&logo=github&labelColor=000000&label=Last%20Commit"
      alt="Last Commit">
  </a>
  &nbsp;
<!-- Commit Activity -->
  <a
    href="https://github.com/YashTotale/terminal-all-in-one/pulse/monthly">
    <img
      src="https://img.shields.io/github/commit-activity/m/YashTotale/terminal-all-in-one?style=for-the-badge&logo=github&labelColor=000000&label=Commit%20Activity"
      alt="Commit Activity">
  </a>
  &nbsp;
</p>

---

<p align="center">
<!-- Top Language -->
  <a
    href="https://github.com/YashTotale/terminal-all-in-one/search?l=JavaScript&type=Code">
    <img
      src="https://img.shields.io/github/languages/top/YashTotale/terminal-all-in-one?logo=javascript&style=for-the-badge&labelColor=000000"
      alt="Top Language">
  </a>
  &nbsp;
<!-- License -->
  <a
    href="https://github.com/YashTotale/terminal-all-in-one/blob/master/LICENSE.md">
    <img
      src="https://img.shields.io/github/license/YashTotale/terminal-all-in-one?style=for-the-badge&labelColor=000000&label=License"
      alt="License">
  </a>
  &nbsp;
</p>

---

<p align="center">
<!-- Keywords -->
  <a
    href="https://github.com/YashTotale/terminal-all-in-one/blob/master/package.json#L3-L7">
    <img
      src="https://img.shields.io/github/package-json/keywords/YashTotale/terminal-all-in-one?style=for-the-badge&labelColor=000000&label=Keywords"
      alt="Keywords">
  </a>
  &nbsp;
</p>

---

<p align="center">
<!-- Released On -->
  <a
    href="https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one">
    <img
      src="https://img.shields.io/static/v1?label=Released%20On&message=Jul%2029%202020&style=for-the-badge&color=FF4500&labelColor=000000"
      alt="Released On">
  </a>
  &nbsp;
</p>

---
