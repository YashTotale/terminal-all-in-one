<h1 align="center">
  <br>
    <a href="https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/images/terminal-icon.jpg"><img src="https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/images/terminal-icon.jpg" alt="Terminal All In One" width="200"></a>
  <br>
  <br>
  <b>Terminal All In One</b>
  <br>
  <br>
  <!-- Version -->
  <a
    href="https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one">
    <img
      src="https://img.shields.io/visual-studio-marketplace/v/yasht.terminal-all-in-one?style=for-the-badge&labelColor=000000&label=Version"
      alt="Version">
  </a>
</h1>

<p align="center">
    <a href="https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one&ssr=false#review-details"><img src="https://img.shields.io/visual-studio-marketplace/r/yasht.terminal-all-in-one?logo=visual-studio-code&style=for-the-badge&labelColor=000000&label=Rating" alt="Rating"></a>&nbsp;
    <a href="https://travis-ci.com/github/YashTotale/terminal-all-in-one"><img src="https://img.shields.io/travis/com/YashTotale/terminal-all-in-one?logo=travis-ci&logoColor=FFFFFF&style=for-the-badge&labelColor=000000&label=Build" alt="Build"></a>&nbsp;
    <a href="https://lgtm.com/projects/g/YashTotale/terminal-all-in-one/context:javascript"><img src="https://img.shields.io/lgtm/grade/javascript/github/YashTotale/terminal-all-in-one?style=for-the-badge&labelColor=000000&logo=lgtm&label=Code%20Quality" alt="Code Quality"></a>&nbsp;
</p>

_Table Of Contents_  
**Featured Content is Bolded**

- [Installation](#installation)
- [Commands](#commands)
  - **[Themes](#themes)**
  - **[Scripts](#scripts)**
  - [Instances](#instances)
  - [Display](#display)
  - [Misc](#misc)
- [Configuration](#configuration)
  - **[Themes](#themes-1)**
  - **[Scripts](#scripts-1)**
  - [Keybindings](#keybindings)
  - [Messages](#messages)
- [Keybindings](#keybindings-1)
- [Demos](#demos)
- [Contribute](#contribute)
- **[More Info](#more-info)**

---

## Installation

1. Open [Terminal All In One - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one)
2. Click "Install"

**OR**

1. Open [Visual Studio Code](https://code.visualstudio.com/)
2. Open the Extensions View -> (`Shift+Cmd+P` or `F1` and type "Extensions: Install Extensions") or (`Shift+Cmd+X`)
3. Type "Terminal All In One"
4. Click "Install"

**OR**

1. Open a command-line prompt
2. Run `code --install-extension yasht.terminal-all-in-one`

---

## Commands

### Themes

- `terminalAllInOne.chooseTerminalTheme` <span id="cmd-choose-theme" name="cmd-choose-theme"><em>(Terminal All In One: Choose Theme)</em></span>

  - Opens a Theme Quick Pick<sup>[1](#quick-pick)</sup> with over **100** Themes to choose from

  - Live Preview in the Terminal
  - Keybinding: `cmd/ctrl+i t`
  - [Demo](#demo-choose-terminal-theme)

### Scripts

- `terminalAllInOne.runScript` <span id="cmd-run-script" name="cmd-run-script"><em>(Terminal All In One: Run Script)</em></span>

  - Opens a Script Quick Pick<sup>[1](#quick-pick)</sup> with [your defined scripts](#scripts-1) **OR** runs a specific script

  - Keybindings: `cmd/ctrl+i enter` for the Script Quick Pick<sup>[1](#quick-pick)</sup> **OR** `cmd/ctrl+i 0-9` for a specific script

### Instances

- `terminalAllInOne.createNewTerminal` <span id="cmd-create-new-terminal" name="cmd-create-new-terminal"><em>(Terminal All In One: Create New Terminal)</em></span>

  - Creates a New Terminal Instance

  - Keybinding: `cmd/ctrl+i c`
  - [Demo](#demo-create-new-terminal)

- `terminalAllInOne.deleteCurrentTerminal` <span id="cmd-delete-current-terminal" name="cmd-delete-current-terminal"><em>(Terminal All In One: Delete Current Terminal)</em></span>

  - Deletes the Current Terminal Instance

  - Keybinding: `cmd/ctrl+i d`
  - [Demo](#demo-delete-current-terminal)

- `terminalAllInOne.renameCurrentTerminal` <span id="cmd-rename-current-terminal" name="cmd-rename-current-terminal"><em>(Terminal All In One: Rename Current Terminal)</em></span>

  - Renames the Current Terminal Instance

  - Keybinding: `cmd/ctrl+i r`
  - [Demo](#demo-rename-current-terminal)

- `terminalAllInOne.focusNextTerminal` <span id="cmd-focus-next-terminal" name="cmd-focus-next-terminal"><em>(Terminal All In One: Focus Next Terminal)</em></span>

  - Focuses the Next Terminal Instance

  - Keybinding: `cmd/ctrl+i .`
  - [Demo](#demo-focus-next-terminal)

- `terminalAllInOne.focusPreviousTerminal` <span id="cmd-focus-previous-terminal" name="cmd-focus-previous-terminal"><em>(Terminal All In One: Focus Previous Terminal)</em></span>

  - Focuses the Previous Terminal Instance

  - Keybinding: `cmd/ctrl+i ,`
  - [Demo](#demo-focus-next-terminal)

### Display

- `workbench.action.terminal.toggleTerminal` <span id="cmd-toggle-terminal" name="cmd-toggle-terminal"><em>(View: Toggle Integrated Terminal)</em></span>

  - Toggles the Terminal

  - Keybinding: `` cmd/ctrl+i `  ``
  - [Demo](#demo-toggle-terminal)

- `terminalAllInOne.toggleMaxTerm` <span id="cmd-toggle-max-term" name="cmd-toggle-max-term"><em>(Terminal All In One: Toggle Maximized Terminal)</em></span>

  - Toggles the Maximized Terminal

  - Keybinding: `cmd/ctrl+i m`
  - [Demo](#demo-toggle-max-term)

- `terminalAllInOne.clearTerminal` <span id="cmd-clear-terminal" name="cmd-clear-terminal"><em>(Terminal All In One: Clear Terminal)</em></span>

  - Clears the Terminal

  - Keybinding: `cmd/ctrl+i backspace`

- `terminalAllInOne.changeCursorWidth` <span id="cmd-change-cursor-width" name="cmd-change-cursor-width"><em>(Terminal All In One: Change Cursor Width)</em></span>

  - Opens a Cursor Width Quick Pick<sup>[1](#quick-pick)</sup>

  - Live Preview in the Terminal
  - Keybinding: `cmd/ctrl+i w`

- `terminalAllInOne.changeCursorStyle` <span id="cmd-change-cursor-style" name="cmd-change-cursor-style"><em>(Terminal All In One: Change Cursor Style)</em></span>

  - Opens a Cursor Style Quick Pick<sup>[1](#quick-pick)</sup>

  - Live Preview in the Terminal
  - Keybinding: `cmd/ctrl+i y`

- `terminalAllInOne.toggleBlinkingCursor` <span id="cmd-toggle-blinking-cursor" name="cmd-toggle-blinking-cursor"><em>(Terminal All In One: Toggle Blinking Cursor)</em></span>

  - Toggles whether the Terminal Cursor is blinking or not

  - Keybinding: `cmd/ctrl+i b`

- `terminalAllInOne.changeFontSize` <span id="cmd-change-font-size" name="cmd-change-font-size"><em>(Terminal All In One: Change Font Size)</em></span>

  - Opens a Font Size Quick Pick<sup>[1](#quick-pick)</sup>

  - Live Preview in the Terminal
  - Keybinding: `cmd/ctrl+i f`

- `terminalAllInOne.decreaseFontSize` <span id="cmd-decrease-font-size" name="cmd-decrease-font-size"><em>(Terminal All In One: Decrease Font Size)</em></span>

  - Decrease the Terminal Font Size by 1-pt

  - Keybinding: `cmd/ctrl+i -`

- `terminalAllInOne.increaseFontSize` <span id="cmd-increase-font-size" name="cmd-increase-font-size"><em>(Terminal All In One: Increase Font Size)</em></span>

  - Increase the Terminal Font Size by 1-pt

  - Keybinding: `cmd/ctrl+i =`

- `terminalAllInOne.changeFontWeight` <span id="cmd-change-font-weight" name="cmd-change-font-weight"><em>(Terminal All In One: Change Font Weight)</em></span>

  - Opens a Font Weight Quick Pick<sup>[1](#quick-pick)</sup>

  - Live Preview in the Terminal
  - Keybinding: `cmd/ctrl+i q`

### Misc

- `terminalAllInOne.selectDefaultShell` <span id="cmd-select-default-shell" name="cmd-select-default-shell"><em>(Terminal All In One: Select Default Shell)</em></span>

  - Select a Default Shell (bash, csh, dash, ksh, sh, tcsh, zsh, etc.)

  - Opens a Shell Quick Pick<sup>[1](#quick-pick)</sup>
  - Keybinding: `cmd/ctrl+i s`
  - [Demo](#demo-select-default-shell)

---

## Configuration

### Themes

- `terminalAllInOne.terminalTheme`

  - A Terminal Theme from [this list](https://glitchbone.github.io/vscode-base16-term/#/)
  - Use the command [`terminalAllInOne.chooseTerminalTheme`](#cmd-choose-theme) or the keybinding `cmd/ctrl+i t` to control this setting.

- Default Configuration :

  ```json
  {
    "terminalAllInOne.terminalTheme": "None"
  }
  ```

### Scripts

- `terminalAllInOne.scripts`

  - Scripts are string representations of [Command Line commands](https://www.codecademy.com/articles/command-line-commands). Scripts can be strings (1 command) or arrays (multiple commands)
  - Use the command [`terminalAllInOne.runScript`](#cmd-run-script) or the keybinding `cmd/ctrl+i enter` to open the Script Quick Pick<sup>[1](#quick-pick)</sup>
  - Alternatively, use the keybindings `cmd/ctrl+i 0-9` to run a specific script whose index corresponds to the number pressed _(Note: Only your first 10 scripts will have corresponding keybindings)_
  - Variables:

    - `${workspaceFolder}` - the path of the folder opened in VS Code

    - `${workspaceFolderBasename}` - the name of the folder opened in VS Code without any slashes (/)
    - `${file}` - the current opened file
    - `${relativeFile}` - the current opened file relative to workspaceFolder
    - `${relativeFileDirname}` - the current opened file's dirname relative to workspaceFolder
    - `${fileBasename}` - the current opened file's basename
    - `${fileBasenameNoExtension}` - the current opened file's basename with no file extension
    - `${fileDirname}` - the current opened file's dirname
    - `${fileExtname}` - the current opened file's extension
    - `${cwd}` - the task runner's current working directory on startup
    - `${lineNumber}` - the current selected line number in the active file
    - `${selectedText}` - the current selected text in the active file
    - `${execPath}` - the path to the running VS Code executable
    - `${defaultBuildTask}` - the name of the default build task
    - You can reference VS Code settings ("configurations") through `${config:Name}` syntax (for example, `${config:editor.fontSize}`).

- `terminalAllInOne.script.disableDescription`

  - Disable the Script Description that is run before the Script Commands

- Sample Configuration:

  ```json
  {
    "terminalAllInOne.scripts": [
      {
        "name": "Greet",
        "script": ["echo hello", "echo How was your day?"]
      },
      {
        "name": "Contents of current workspace folder",
        "script": "ls ${workspaceFolder}"
      },
      {
        "name": "Install Dependencies",
        "script": ["npm i react", "npm i --save-dev mocha"]
      }
    ],
    "terminalAllInOne.script.disableDescription": false
  }
  ```

### Keybindings

- `terminalAllInOne.disableAllKeybindings`
  - Controls whether all keybindings are disabled
- Default Configuration :

  ```json
  {
    "terminalAllInOne.disableAllKeybindings": false
  }
  ```

### Messages

- `terminalAllInOne.messages`
  - Controls which messages should be shown if `terminalAllInOne.disableAllMessages` is set to false
- `terminalAllInOne.disableAllMessages`
  - Controls whether all messages (info, warning, and error) from this extension are disabled
- Default Configuration :

  ```json
  {
    "terminalAllInOne.messages": {
      "shouldShowThemeQuickPickMessage": true,
      "shouldShowSelectedThemeMessage": true,
      "shouldShowFontSizeQuickPickMessage": true,
      "shouldShowSelectedFontSizeMessage": true,
      "shouldShowFontWeightQuickPickMessage": true,
      "shouldShowSelectedFontWeightMessage": true,
      "shouldShowCursorWidthQuickPickMessage": true,
      "shouldShowSelectedCursorWidthMessage": true,
      "shouldShowCursorStyleQuickPickMessage": true,
      "shouldShowSelectedCursorStyleMessage": true,
      "shouldShowBlinkingCursorToggledMessage": true,
      "shouldShowDisableScriptDescriptionMessage": true
    },
    "terminalAllInOne.disableAllMessages": false
  }
  ```

---

## Keybindings

**For each keybinding (except toggling the terminal) , press `cmd+i` (for Macs) or `ctrl+i` (for Windows & Linux), and the corresponding key for the terminal command.**

| Chord          | Shortcut        | Description                                                          | Command                                    |
| -------------- | --------------- | -------------------------------------------------------------------- | ------------------------------------------ |
| _`cmd/ctrl`_   | **`` ` ``**     | [Toggle the Terminal](#cmd-toggle-terminal)                          | `workbench.action.terminal.toggleTerminal` |
| _`cmd/ctrl+i`_ | **`m`**         | [Toggle the Maximized Terminal](#cmd-toggle-max-term)                | `terminalAllInOne.toggleMaxTerm`           |
| _`cmd/ctrl+i`_ | **`s`**         | [Select a Default Shell](#cmd-select-default-shell)                  | `terminalAllInOne.selectDefaultShell`      |
| _`cmd/ctrl+i`_ | **`c`**         | [Create a New Terminal Instance](#cmd-create-new-terminal)           | `terminalAllInOne.createNewTerminal`       |
| _`cmd/ctrl+i`_ | **`d`**         | [Delete the Current Terminal Instance](#cmd-delete-current-terminal) | `terminalAllInOne.deleteCurrentTerminal`   |
| _`cmd/ctrl+i`_ | **`r`**         | [Rename the Current Terminal Instance](#cmd-rename-current-terminal) | `terminalAllInOne.renameCurrentTerminal`   |
| _`cmd/ctrl+i`_ | **`.`**         | [Focus the Next Terminal Instance](#cmd-focus-next-terminal)         | `terminalAllInOne.focusNextTerminal`       |
| _`cmd/ctrl+i`_ | **`,`**         | [Focus the Previous Terminal Instance](#cmd-focus-previous-terminal) | `terminalAllInOne.focusPreviousTerminal`   |
| _`cmd/ctrl+i`_ | **`t`**         | [Choose a Terminal Theme](#cmd-choose-theme)                         | `terminalAllInOne.chooseTerminalTheme`     |
| _`cmd/ctrl+i`_ | **`enter`**     | [Choose a Script](#cmd-run-script)                                   | `terminalAllInOne.runScript`               |
| _`cmd/ctrl+i`_ | **`0-9`**       | [Run a specific Script](#cmd-run-script)                             | `terminalAllInOne.runScript`               |
| _`cmd/ctrl+i`_ | **`w`**         | [Change Terminal Cursor Width](#cmd-change-cursor-width)             | `terminalAllInOne.changeCursorWidth`       |
| _`cmd/ctrl+i`_ | **`y`**         | [Change Terminal Cursor Style](#cmd-change-cursor-style)             | `terminalAllInOne.changeCursorStyle`       |
| _`cmd/ctrl+i`_ | **`b`**         | [Toggle Blinking Terminal Cursor](#cmd-toggle-blinking-cursor)       | `terminalAllInOne.toggleBlinkingCursor`    |
| _`cmd/ctrl+i`_ | **`f`**         | [Change Terminal Font Size](#cmd-change-font-size)                   | `terminalAllInOne.changeFontSize`          |
| _`cmd/ctrl+i`_ | **`-`**         | [Decrease Terminal Font Size](#cmd-decrease-font-size)               | `terminalAllInOne.decreaseFontSize`        |
| _`cmd/ctrl+i`_ | **`=`**         | [Increase Terminal Font Size](#cmd-increase-font-size)               | `terminalAllInOne.increaseFontSize`        |
| _`cmd/ctrl+i`_ | **`q`**         | [Change Terminal Font Weight](#cmd-change-font-weight)               | `terminalAllInOne.changeFontWeight`        |
| _`cmd/ctrl+i`_ | **`backspace`** | [Clear the Terminal](#cmd-clear-terminal)                            | `terminalAllInOne.clearTerminal`           |

---

## Demos

<!-- Toggle the Terminal -->

<details id="demo-toggle-terminal" name="demo-toggle-terminal">
<summary>Toggle the Terminal</summary>

[![Toggle the Terminal](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/ToggleTheTerminal.gif)](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/ToggleTheTerminal.gif)

</details>

<br>

<!-- Toggle the Maximized Terminal -->

<details id="demo-toggle-max-term" name="demo-toggle-max-term">
<summary>Toggle the Maximized Terminal</summary>

[![Toggle the Maximized Terminal](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/ToggleTheMaximizedTerminal.gif)](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/ToggleTheMaximizedTerminal.gif)

</details>

<br>

<!-- Select a Default Shell -->

<details id="demo-select-default-shell" name="demo-select-default-shell">
<summary>Select a Default Shell</summary>

[![Select a Default Shell](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/SelectADefaultShell.gif)](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/SelectADefaultShell.gif)

</details>

<br>

<!-- Create a New Terminal Instance-->

<details id="demo-create-new-terminal" name="demo-create-new-terminal">
<summary>Create a New Terminal Instance</summary>

[![Create A New Terminal Instance](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/CreateANewTerminalInstance.gif)](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/CreateANewTerminalInstance.gif)

</details>

<br>

<!-- Delete the Current Terminal Instance -->

<details id="demo-delete-current-terminal" name="demo-delete-current-terminal">
<summary>Delete the Current Terminal Instance</summary>

[![Delete the Current Terminal Instance](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/DeleteTheCurrentTerminalInstance.gif)](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/DeleteTheCurrentTerminalInstance.gif)

</details>

<br>

<!-- Rename the Current Terminal Instance -->

<details id="demo-rename-current-terminal" name="demo-rename-current-terminal">
<summary>Rename the Current Terminal Instance</summary>

[![Rename the Current Terminal Instance](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/RenameTheCurrentTerminalInstance.gif)](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/RenameTheCurrentTerminalInstance.gif)

</details>

<br>

<!-- Focus the Next Terminal Instance -->

<details id="demo-focus-next-terminal" name="demo-focus-next-terminal">
<summary>Focus the Next Terminal Instance</summary>

[![Focus the Next Terminal Instance](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/FocusTheNextTerminalInstance.gif)](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/FocusTheNextTerminalInstance.gif)

</details>

<br>

<!-- Focus the Previous Terminal Instance -->

<details id="demo-focus-previous-terminal" name="demo-focus-previous-terminal">
<summary>Focus the Previous Terminal Instance</summary>

[![Focus the Previous Terminal Instance](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/FocusThePreviousTerminalInstance.gif)](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/FocusThePreviousTerminalInstance.gif)

</details>

<br>

<!-- Choose a Terminal Theme -->

<details id="demo-choose-terminal-theme" name="demo-choose-terminal-theme">
<summary>Choose a Terminal Theme</summary>

[![Choose a Terminal Theme](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/ChooseATerminalTheme.gif)](https://raw.githubusercontent.com/YashTotale/terminal-all-in-one/master/demos/ChooseATerminalTheme.gif)

</details>

---

## Contribute

**Would you like to contribute?**

- Go to the [github repository](https://github.com/YashTotale/terminal-all-in-one)
- Open a new [issue](https://github.com/YashTotale/terminal-all-in-one/issues/new/choose) or [pull request](https://github.com/YashTotale/terminal-all-in-one/pulls)

_Check out [first contributions](https://github.com/firstcontributions/first-contributions/blob/master/README.md) if you are new to contributing_

---

## More Info

<!-- VS Code Badges -->
<p align="center">
    <a href="https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one"><img src="https://img.shields.io/visual-studio-marketplace/i/yasht.terminal-all-in-one?logo=visual-studio-code&style=for-the-badge&labelColor=000000&label=Installs" alt="Installs"></a>&nbsp;
    <a href="https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one"><img src="https://img.shields.io/visual-studio-marketplace/d/yasht.terminal-all-in-one?logo=visual-studio-code&style=for-the-badge&labelColor=000000&label=Downloads" alt="Downloads"></a>&nbsp;
</p>

---

<!-- Code Alerts/Issues Badges -->

<p align="center">
    <a href="https://codeclimate.com/github/YashTotale/terminal-all-in-one/issues"><img src="https://img.shields.io/codeclimate/issues/YashTotale/terminal-all-in-one.svg?style=for-the-badge&logo=code-climate&labelColor=000000&label=Issues" alt="Issues"></a>&nbsp;
    <a href="https://lgtm.com/projects/g/YashTotale/terminal-all-in-one/alerts/?mode=list"><img src="https://img.shields.io/lgtm/alerts/github/YashTotale/terminal-all-in-one?style=for-the-badge&labelColor=000000&logo=lgtm" alt="Alerts"></a>&nbsp;
</p>

---

<!-- Dependency Badges -->
<p align="center">
    <!-- <a href="https://david-dm.org/YashTotale/terminal-all-in-one"><img src="https://img.shields.io/david/YashTotale/terminal-all-in-one?style=for-the-badge&labelColor=000000&label=Dependencies" alt="Dependencies"></a>&nbsp; -->
    <a href="https://requires.io/github/YashTotale/terminal-all-in-one/requirements/?branch=master"><img src="https://img.shields.io/requires/github/YashTotale/terminal-all-in-one?style=for-the-badge&labelColor=000000&label=Dependencies" alt="Dependencies"></a>&nbsp;
    <a href="https://snyk.io/test/github/YashTotale/terminal-all-in-one"><img src="https://img.shields.io/snyk/vulnerabilities/github/YashTotale/terminal-all-in-one?logo=snyk&style=for-the-badge&labelColor=000000&label=Vulnerabilities" alt="Vulnerabilities"></a>&nbsp;
</p>

---

<!-- Code Maintainability Badges -->

<p align="center">
    <a href="https://codeclimate.com/github/YashTotale/terminal-all-in-one/trends/technical_debt"><img src="https://img.shields.io/codeclimate/tech-debt/YashTotale/terminal-all-in-one.svg?style=for-the-badge&logo=code-climate&labelColor=000000&label=Technical%20Debt" alt="Technical Debt"></a>&nbsp;
    <a href="https://codeclimate.com/github/YashTotale/terminal-all-in-one"><img src="https://img.shields.io/codeclimate/maintainability-percentage/YashTotale/terminal-all-in-one.svg?style=for-the-badge&logo=code-climate&labelColor=000000&label=Maintainability" alt="Maintainability"></a>&nbsp;
</p>

---

<!-- Commit Badges -->
<p align="center">
    <a href="https://github.com/YashTotale/terminal-all-in-one/commits/master"><img src="https://img.shields.io/github/last-commit/YashTotale/terminal-all-in-one?style=for-the-badge&logo=github&labelColor=000000&label=Last%20Commit&color=007EC6" alt="Last Commit"></a>&nbsp;
    <a href="https://github.com/YashTotale/terminal-all-in-one/pulse/monthly"><img src="https://img.shields.io/github/commit-activity/m/YashTotale/terminal-all-in-one?style=for-the-badge&logo=github&labelColor=000000&label=Commit%20Activity&color=007EC6" alt="Commit Activity"></a>&nbsp;
</p>

---

<!-- Misc Badges -->
<p align="center">
    <a href="https://github.com/YashTotale/terminal-all-in-one/search?l=TypeScript&type=Code"><img src="https://img.shields.io/github/languages/top/YashTotale/terminal-all-in-one?logo=typescript&logoColor=007ACC&style=for-the-badge&labelColor=000000&color=FF4500" alt="Top Language"></a>&nbsp;
    <a href="https://github.com/YashTotale/terminal-all-in-one/blob/master/LICENSE.md"><img src="https://img.shields.io/github/license/YashTotale/terminal-all-in-one?style=for-the-badge&labelColor=000000&label=License&color=FF4500" alt="License"></a>&nbsp;
</p>

---

<!-- Keywords Badges -->
<p align="center">
    <a href="https://github.com/YashTotale/terminal-all-in-one/blob/master/package.json#L3-L8"><img src="https://img.shields.io/github/package-json/keywords/YashTotale/terminal-all-in-one?style=for-the-badge&labelColor=000000&label=Keywords&color=6ba6ff" alt="Keywords"></a>&nbsp;
</p>

---

<!-- Released/Updated Badges -->
<p align="center">
    <a href="https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one"><img src="https://img.shields.io/visual-studio-marketplace/release-date/yasht.terminal-all-in-one?style=for-the-badge&labelColor=000000&label=Release%20Date" alt="Release Date"></a>&nbsp;
    <a href="https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one"><img src="https://img.shields.io/visual-studio-marketplace/last-updated/yasht.terminal-all-in-one?style=for-the-badge&labelColor=000000&label=Last%20Updated" alt="Last Updated"></a>&nbsp;
</p>

---

<!-- Footnotes -->

<p id="quick-pick" name="quick-pick">[1] : <a href="https://code.visualstudio.com/api/extension-capabilities/common-capabilities#quick-pick">Quick Pick</a></p>
