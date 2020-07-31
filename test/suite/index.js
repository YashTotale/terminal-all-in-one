const path = require("path");
const Mocha = require("mocha");
const glob = require("glob");

function createMocha() {
  return new Mocha({
    ui: "tdd",
    color: true,
  });
}

function addFiles(files, mocha, testsRoot) {
  files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));
}

function runMocha(mocha, c, e) {
  mocha.run((failures) => {
    if (failures > 0) {
      e(new Error(`${failures} tests failed.`));
      return undefined;
    }
    c();
    return undefined;
  });
}

function globFunc(err, files, testsRoot, c, e) {
  // Create the mocha test
  const mocha = createMocha();

  if (err) {
    return e(err);
  }

  // Add files to the test suite
  addFiles(files, mocha, testsRoot);

  try {
    // Run the mocha test
    return runMocha(mocha, c, e);
  } catch (err) {
    console.error(err);
    return e(err);
  }
}

function run() {
  const testsRoot = path.resolve(__dirname, "..");

  return new Promise((c, e) => {
    glob("**/**.test.js", { cwd: testsRoot }, (err, files) =>
      globFunc(err, files, testsRoot, c, e)
    );
  });
}

module.exports = {
  run,
};
