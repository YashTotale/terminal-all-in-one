import { readdir as fsReadDir, readFile as fsReadFile, PathLike } from "fs";

const readDir = function (
  dirname: PathLike,
  onFileContent: (filename: PathLike, content: string) => {},
  onError: (err: NodeJS.ErrnoException) => {}
) {
  fsReadDir(dirname, (err, filenames) => {
    if (err) {
      onError(err);
      return;
    }
    if (dirname.toString().slice(-1) !== "/") {
      dirname = `${dirname}/`;
    }
    filenames.forEach(function (filename) {
      readFile(dirname + filename, onFileContent, onError);
    });
  });
};

const readFile = function (
  filename: PathLike,
  onFileContent: (filename: PathLike, content: string) => {},
  onError: (err: NodeJS.ErrnoException) => {}
) {
  fsReadFile(filename, "utf-8", (err, content) => {
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
