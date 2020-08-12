import ChooseTerminalTheme from "./chooseTerminalTheme";
import ClearTerminal from "./clearTerminal";
import RunScript from "./runScript";
import ToggleMaxTerm from "./toggleMaxTerm";
import ChangeFontSize from "./fontSize/changeFontSize";
import IncreaseFontSize from "./fontSize/increaseFontSize";
import DecreaseFontSize from "./fontSize/decreaseFontSize";
import { ExtensionContext } from "vscode";

export default (context: ExtensionContext) => [
  new ChooseTerminalTheme(context),
  new ClearTerminal(context),
  new RunScript(context),
  new ToggleMaxTerm(context),
  new ChangeFontSize(context),
  new IncreaseFontSize(context),
  new DecreaseFontSize(context),
];
