import ChooseTerminalTheme from "./chooseTerminalTheme";
import ClearTerminal from "./clearTerminal";
import RunScript from "./runScript";
import ToggleMaxTerm from "./toggleMaxTerm";
import ChangeFontSize from "./fontSize/changeFontSize";
import AdjustFontSizeByOne from "./fontSize/adjustFontSizeByOne";
import { ExtensionContext } from "vscode";

export default (context: ExtensionContext) => [
  new ChooseTerminalTheme(context),
  new ClearTerminal(context),
  new RunScript(context),
  new ToggleMaxTerm(context),
  new ChangeFontSize(context),
  new AdjustFontSizeByOne(context, "decrease"),
  new AdjustFontSizeByOne(context, "increase"),
];
