import path from "path";
import MochaTests from "mocha";
import glob from "glob";

function createMocha() {
  return new MochaTests({
    ui: "tdd",
    color: true,
  });
}

function addFiles(files: string[], mocha: MochaTests, testsRoot: string) {
  files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));
}

function runMocha(
  mocha: MochaTests,
  c: (value?: unknown) => void,
  e: (reason?: any) => void
) {
  mocha.run((failures) => {
    if (failures > 0) {
      e(new Error(`${failures} tests failed.`));
      return undefined;
    }
    c();
    return undefined;
  });
}

function globFunc(
  err: Error | null,
  files: string[],
  testsRoot: string,
  c: (value?: unknown) => void,
  e: (reason?: any) => void
) {
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
    glob(
      "**/**.test.js",
      { cwd: testsRoot },
      (err: Error | null, files: string[]) =>
        globFunc(err, files, testsRoot, c, e)
    );
  });
}

module.exports = {
  run,
};
