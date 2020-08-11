import {
  changeFontSize,
  increaseFontSize,
  decreaseFontSize,
} from "./changeFontSize";
import { chooseTerminalTheme } from "./chooseTerminalTheme";
import { clearTerminal } from "./clearTerminal";
import RunScript from "./runScript";
import ToggleMaxTerm from "./toggleMaxTerm";

export default [
  chooseTerminalTheme,
  clearTerminal,
  new RunScript(),
  new ToggleMaxTerm(),
  changeFontSize,
  increaseFontSize,
  decreaseFontSize,
];
