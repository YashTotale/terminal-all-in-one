import {
  changeFontSize,
  increaseFontSize,
  decreaseFontSize,
} from "./changeFontSize";
import { chooseTerminalTheme } from "./chooseTerminalTheme";
import { clearTerminal } from "./clearTerminal";
import { runScript } from "./runScript";
import { toggleMaxTerm } from "./toggleMaxTerm";

export default [
  chooseTerminalTheme,
  clearTerminal,
  runScript,
  toggleMaxTerm,
  changeFontSize,
  increaseFontSize,
  decreaseFontSize,
];
