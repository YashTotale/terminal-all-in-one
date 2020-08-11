import {
  changeFontSize,
  increaseFontSize,
  decreaseFontSize,
} from "./changeFontSize";
import { chooseTerminalTheme } from "./chooseTerminalTheme";
import ClearTerminal from "./clearTerminal";
import RunScript from "./runScript";
import ToggleMaxTerm from "./toggleMaxTerm";

export default [
  chooseTerminalTheme,
  new ClearTerminal(),
  new RunScript(),
  new ToggleMaxTerm(),
  changeFontSize,
  increaseFontSize,
  decreaseFontSize,
];
