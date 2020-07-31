const path = require("path");
const Mocha = require("mocha");
const glob = require("glob");

function createMochaInstance() {
  return new Mocha({
    ui: "tdd",
    color: true,
  });
}

function createGlob(testsRoot, func) {
  glob("**/**.test,js", { cwd: testsRoot }, (err, files) => func(err, files));
}

function runMocha(mocha, c, e) {
  mocha.run((failures) => {
    if (failures > 0) {
      return e(new Error(`${failures} tests failed.`));
    }
    return c();
  });
}

function run() {
  // Create the mocha test
  const mocha = createMochaInstance();

  const testsRoot = path.resolve(__dirname, "..");

  return new Promise((c, e) => {
    createGlob(testsRoot, (err, files) => {
      if (err) {
        return e(err);
      }

      // Add files to the test suite
      files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

      try {
        // Run the mocha test
        return runMocha(mocha, c, e);
      } catch (err) {
        console.error(err);
        return e(err);
      }
    });
  });
}

module.exports = {
  run,
};
