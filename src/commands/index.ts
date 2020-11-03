import ChooseTerminalTheme from "./chooseTerminalTheme";
import ClearTerminal from "./clearTerminal";
import RunScript from "./runScript";
import SelectDefaultShell from "./selectDefaultShell";
import ToggleMaxTerm from "./toggleMaxTerm";
import CreateNewTerminal from "./createNewTerminal";
import ChangeFontSize from "./fontSize/changeFontSize";
import AdjustFontSizeByOne from "./fontSize/adjustFontSizeByOne";
import { ExtensionContext } from "vscode";

export default (context: ExtensionContext) => [
  new SelectDefaultShell(context),
  new CreateNewTerminal(context),
  new ChooseTerminalTheme(context),
  new ClearTerminal(context),
  new RunScript(context),
  new ToggleMaxTerm(context),
  new ChangeFontSize(context),
  new AdjustFontSizeByOne(context, "decrease"),
  new AdjustFontSizeByOne(context, "increase"),
];
