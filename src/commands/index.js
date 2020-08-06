const fs = require("fs");

const files = fs.readdirSync(__dirname);

module.exports = files.reduce((imports, currentFile) => {
  if (currentFile !== "index.js") {
    const command = require(`./${currentFile}`);
    if (Array.isArray(command)) {
      command.forEach((c) => imports.push(c));
    } else {
      imports.push(command);
    }
  }
  return imports;
}, []);
