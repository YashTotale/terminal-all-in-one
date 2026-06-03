## _Terminal All In One_ Change Log

All notable changes to this extension will be documented in this file.
The format of this Change Log is based on [Keep a Changelog](http://keepachangelog.com/).

---

### [Unreleased]

#### Added

- Option to insert a script's command into the terminal without running it (`terminalAllInOne.script.disableAutoRun`).

#### Changed

- **v2.0.0 modernization** — simplified the extension's internals, refreshed the docs, and modernized the toolchain. Saved scripts, terminal themes, and keybindings all work exactly as before; only a few rarely-used message and description settings were removed (see Removed below).
- Running a script no longer force-interrupts a command already running in the terminal.

#### Fixed

- **Clear Terminal** (`cmd/ctrl+i backspace`) now clears the active terminal instead of killing and relaunching it.
- Font, cursor, and theme live-previews now reliably restore your previous value (at its original settings scope) when you cancel or press Escape.

#### Removed

- The `terminalAllInOne.messages` per-message toggles and the `terminalAllInOne.script.disableDescription` setting (`terminalAllInOne.disableAllMessages` still silences everything).

---

### [1.12.2] - (2024-03-17)

#### Changed

- README header

---

### [1.12.1] - (2024-03-17)

#### Fixed

- README badges

---

### [1.12.0] - (2021-06-30)

#### Added

- _New Command_: Split Terminal

---

### [1.11.17] - (2021-05-24)

#### Changed

- Cleaned up dependencies

---

### [1.11.16] - (2021-01-04)

#### Fixed

- CHANGELOG formatting

---

### [1.11.15] - (2020-11-19)

#### Changed

- Clear Terminal relaunches the active terminal

---

### [1.11.13] - (2020-11-10)

#### Fixed

- README reflects recent changes to the extension

---

### [1.11.12] - (2020-11-10)

#### Added

- _New Command_: Change Font Weight

---

### [1.11.11] - (2020-11-09)

#### Added

- _New Command_: Toggle Blinking Cursor

---

### [1.11.10] - (2020-11-09)

#### Added

- _New Command_: Change Cursor Style

---

### [1.11.9] - (2020-11-09)

#### Added

- _New Command_: Change Cursor Width

---

### [1.11.8] - (2020-11-09)

#### Fixed

- Disable Script Description works

---

### [1.11.7] - (2020-11-03)

#### Added

- _New Command_: Focus Previous Terminal

---

### [1.11.6] - (2020-11-03)

#### Added

- _New Command_: Focus Next Terminal

---

### [1.11.5] - (2020-11-03)

#### Added

- _New Command_: Rename Current Terminal

---

### [1.11.4] - (2020-11-03)

#### Added

- _New Command_: Delete Current Terminal

---

### [1.11.3] - (2020-11-03)

#### Added

- _New Command_: Create New Terminal

---

### [1.11.2] - (2020-11-03)

#### Fixed

- Minor date fixes in Changelog

---

### [1.11.1] - (2020-11-03)

#### Fixed

- Fixed Toggle Terminal Keybinding on Macs

---

### [1.11.0] - (2020-11-02)

#### Added

- _New Command_: Toggle Terminal
- _New Command_: Select Default Shell

---

### [1.10.8] - (2020-10-21)

#### Fixed

- Minor fixes to Follow Up Messages

---

### [1.10.7] - (2020-08-31)

#### Changed

- Links to Demos added to some commands

---

### [1.10.6] - (2020-08-23)

#### Fixed

- Links in README and messages

---

### [1.10.5] - (2020-08-21)

#### Fixed

- Demos in README

---

### [1.10.4] - (2020-08-18)

#### Added

- Follow Up Messages

---

### [1.10.3] - (2020-08-12)

#### Fixed

- Minor fixes to Run Script

---

### [1.10.2] - (2020-08-12)

#### Fixed

- Bugs in Choose Terminal Theme

---

### [1.10.1] - (2020-08-10)

#### Changed

- JavaScript files have been changed to TypeScript

#### Fixed

- Bugs in Run Script

---

### [1.10.0] - (2020-08-09)

#### Changed

- Extension bundled with Webpack making it faster to install and load

---

### [1.9.0] - (2020-08-08)

#### Added

- _New Configuration_: Disable Script Description

---

### [1.8.0] - (2020-08-07)

#### Added

- Scripts can be arrays with commands that are run in order

#### Fixed

- `%ext...%` messages showing instead of command/config descriptions

---

### [1.7.0] - (2020-08-06)

#### Added

- _New Command_: Run Script
- _New Configuration_: Scripts

---

### [1.6.1] - (2020-08-06)

#### Fixed

- Commands not found

---

### [1.6.0] - (2020-08-06)

#### Added

- _New Command_: Clear Terminal

---

### [1.5.0] - (2020-08-06)

#### Added

- _New Command_: Change Font Size

---

### [1.4.1] - (2020-08-05)

#### Fixed

- Logo and Demos in README not showing

---

### [1.4.0] - (2020-08-05)

#### Added

- _New Command_: Increase Font Size
- _New Command_: Decrease Font Size

---

### [1.3.0] - (2020-08-05)

#### Added

- _New Configuration_: Disable All Keybindings

---

### [1.2.0] - (2020-08-04)

#### Added

- _New Configuration_: Disable all messages

---

### [1.1.1] - (2020-08-03)

#### Fixed

- Removed blue line after badges

---

### [1.1.0] - (2020-08-02)

#### Changed

- Messages Config is now one object
- Terminal Theme Quick Pick can be closed by focusing out of it

#### Fixed

- Inconsistent badges in README
- Links in TOC in README

---

### [1.0.3] - (2020-07-30)

#### Added

- _New Configuration_: Messages

#### Changed

- Changed all relative URLS of demos and images to absolute urls to the raw github demos and images

---

### [1.0.1] - (2020-07-30)

#### Added

- _New Theme_: "None" which removes all terminal styling

---

### [1.0.0] - (2020-07-29)

#### Added

- Initial Release

---
