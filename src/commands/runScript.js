const vscode = require("vscode");
const { getConfig, updateConfig } = require("../helpers/config");

const execute = function (scriptName) {};

const runScript = async function (scriptName) {
  if (scriptName) {
    return execute(scriptName);
  }
};

module.exports = {
  name: "runScript",
  handler: runScript,
};
