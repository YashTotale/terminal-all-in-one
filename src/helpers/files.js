const fs = require("fs");

const readDir = function (dirname, onFileContent, onError) {
  fs.readdir(dirname, (err, filenames) => {
    if (err) {
      onError(err);
      return;
    }
    if (dirname.slice(-1) !== "/") {
      dirname = `${dirname}/`;
    }
    filenames.forEach(function (filename) {
      readFile(dirname + filename, onFileContent, onError);
    });
  });
};

const readFile = function (filename, onFileContent, onError) {
  fs.readFile(filename, "utf-8", function (err, content) {
    if (err) {
      onError(err);
      return;
    }
    onFileContent(filename, content);
  });
};

module.exports = {
  readDir,
  readFile,
};
