const vscode = require("vscode");
const { getConfig } = require("../helpers/config");
const { showMessage } = require("../messages");

const getScriptsConfig = function () {
  return getConfig({ section: "terminalAllInOne.scripts" });
};

const execute = async function ({ script }) {
  await vscode.commands.executeCommand("workbench.action.terminal.focus");
  return vscode.commands.executeCommand(
    "workbench.action.terminal.sendSequence",
    {
      text: `\u0003 ${script} \u000D`,
    }
  );
};

const runScript = async function (index) {
  const scripts = getScriptsConfig();
  if (typeof index === "number") {
    if (index < scripts.length) {
      return execute(scripts[index]);
    }
    return showMessage("noScriptsAtIndex");
  }
  if (!scripts.length) {
    return showMessage("noScripts");
  }
  const options = scripts.map(({ name, script }, i) => ({
    label: name,
    description: script,
    index: i,
  }));
  const selectedScript = await vscode.window.showQuickPick(options, {
    placeHolder: "Run a Script",
    canPickMany: false,
  });
  if (selectedScript) {
    return execute(scripts[selectedScript.index]);
  }
};

module.exports = {
  name: "runScript",
  handler: runScript,
};
