import { ExtensionContext } from "vscode";

import ChooseTerminalTheme from "./chooseTerminalTheme";
import ClearTerminal from "./clearTerminal";
import RunScript from "./runScript";
import ChangeFontWeight from "./changeFontWeight";
import ChangeCursorWidth from "./cursor/changeCursorWidth";
import ChangeCursorStyle from "./cursor/changeCursorStyle";
import ToggleBlinkingCursor from "./cursor/toggleBlinkingCursor";
import ChangeFontSize from "./fontSize/changeFontSize";
import AdjustFontSizeByOne from "./fontSize/adjustFontSizeByOne";

import replacements from "./replacements.json";
import OneCommand from "./oneCommand";

export default (context: ExtensionContext) => [
  ...replacements.map(({ name, cmd }) => {
    return new OneCommand(context, name, cmd);
  }),
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
