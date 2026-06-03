import { commands, ConfigurationChangeEvent } from "vscode";

import replacements from "./replacements.json";
import {
  chooseTerminalTheme,
  onTerminalThemeChange,
} from "./chooseTerminalTheme";
import { runScript } from "./runScript";
import { changeFontWeight } from "./changeFontWeight";
import {
  changeCursorWidth,
  changeCursorStyle,
  toggleBlinkingCursor,
} from "./cursor";
import { changeFontSize, decreaseFontSize, increaseFontSize } from "./fontSize";

export interface Command {
  name: string;
  handler: (...args: any[]) => any;
  config?: (e: ConfigurationChangeEvent) => any;
}

// Re-run one or more built-in VS Code commands under our own command ID/keybinding.
const passthrough = (cmd: string | string[]) => () =>
  (Array.isArray(cmd) ? cmd : [cmd]).forEach((c) => commands.executeCommand(c));

const commandList: Command[] = [
  ...replacements.map(({ name, cmd }) => ({ name, handler: passthrough(cmd) })),
  {
    name: "chooseTerminalTheme",
    handler: chooseTerminalTheme,
    config: onTerminalThemeChange,
  },
  { name: "runScript", handler: runScript },
  { name: "changeCursorWidth", handler: changeCursorWidth },
  { name: "changeCursorStyle", handler: changeCursorStyle },
  { name: "toggleBlinkingCursor", handler: toggleBlinkingCursor },
  { name: "changeFontWeight", handler: changeFontWeight },
  { name: "changeFontSize", handler: changeFontSize },
  { name: "decreaseFontSize", handler: decreaseFontSize },
  { name: "increaseFontSize", handler: increaseFontSize },
];

export default commandList;
