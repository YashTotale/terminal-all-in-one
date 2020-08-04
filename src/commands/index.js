const vscode = require("vscode");
const fs = require("fs");

const files = fs.readdirSync(__dirname);

module.exports = files.reduce((imports, currentFile) => {
  if (currentFile === "index.js") {
    return imports;
  }
  return imports.concat(require(`./${currentFile}`));
}, []);
