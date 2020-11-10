import ChooseTerminalTheme from "./chooseTerminalTheme";
import ClearTerminal from "./clearTerminal";
import RunScript from "./runScript";
import ChangeFontWeight from "./changeFontWeight";
import ChangeCursorWidth from "./cursor/changeCursorWidth";
import ChangeCursorStyle from "./cursor/changeCursorStyle";
import ToggleBlinkingCursor from "./cursor/toggleBlinkingCursor";
import OneCommand from "./oneCommand";
import ChangeFontSize from "./fontSize/changeFontSize";
import AdjustFontSizeByOne from "./fontSize/adjustFontSizeByOne";
import { ExtensionContext } from "vscode";

export default (context: ExtensionContext) => [
  new OneCommand(
    context,
    "selectDefaultShell",
    "workbench.action.terminal.selectDefaultShell"
  ),
  new OneCommand(context, "toggleMaxTerm", [
    "workbench.action.terminal.focus",
    "workbench.action.toggleMaximizedPanel",
  ]),
  new OneCommand(context, "createNewTerminal", "workbench.action.terminal.new"),
  new OneCommand(
    context,
    "deleteCurrentTerminal",
    "workbench.action.terminal.kill"
  ),
  new OneCommand(
    context,
    "renameCurrentTerminal",
    "workbench.action.terminal.rename"
  ),
  new OneCommand(
    context,
    "focusNextTerminal",
    "workbench.action.terminal.focusNext"
  ),
  new OneCommand(
    context,
    "focusPreviousTerminal",
    "workbench.action.terminal.focusPrevious"
  ),
  new ChooseTerminalTheme(context),
  new ClearTerminal(context),
  new RunScript(context),
  new ChangeCursorWidth(context),
  new ChangeCursorStyle(context),
  new ToggleBlinkingCursor(context),
  new ChangeFontWeight(context),
  new ChangeFontSize(context),
  new AdjustFontSizeByOne(context, "decrease"),
  new AdjustFontSizeByOne(context, "increase"),
];
