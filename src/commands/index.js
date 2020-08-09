// const files = fs.readdirSync(__dirname);
// vscode.window.showInformationMessage(JSON.stringify(files));

// module.exports = files.reduce((imports, currentFile) => {
//   if (currentFile.includes(".command.js")) {
//     const command = require(`./${currentFile}`);
//     if (Array.isArray(command)) {
//       command.forEach((c) => imports.push(c));
//     } else {
//       imports.push(command);
//     }
//   }
//   return imports;
// }, []);

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
