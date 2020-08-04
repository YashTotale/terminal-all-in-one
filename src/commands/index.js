const fs = require("fs");

const files = fs.readdirSync(__dirname);

module.exports = files.reduce((imports, currentFile) => {
  if (currentFile !== "index.js") {
    imports.push(require(`./${currentFile}`));
  }
  return imports;
}, []);
