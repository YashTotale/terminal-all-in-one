import ChooseTerminalTheme from "./chooseTerminalTheme";
import ClearTerminal from "./clearTerminal";
import RunScript from "./runScript";
import ToggleMaxTerm from "./toggleMaxTerm";
import ChangeFontSize from "./fontSize/changeFontSize";
import IncreaseFontSize from "./fontSize/increaseFontSize";
import DecreaseFontSize from "./fontSize/decreaseFontSize";

export default [
  new ChooseTerminalTheme(),
  new ClearTerminal(),
  new RunScript(),
  new ToggleMaxTerm(),
  new ChangeFontSize(),
  new IncreaseFontSize(),
  new DecreaseFontSize(),
];
