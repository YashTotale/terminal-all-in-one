const fs = require("fs");
const vscode = require("vscode");

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

module.exports = [
  require("./changeFontSize"),
  require("./chooseTerminalTheme"),
  require("./clearTerminal"),
  require("./runScript"),
  require("./toggleMaxTerm"),
];
