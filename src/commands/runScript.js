import { commands, window } from "vscode";
import { getConfig, updateConfig } from "../helpers/config";
import showMessage from "../messages";

const getScriptsConfig = function () {
  return getConfig({ section: "terminalAllInOne.scripts" });
};

const shouldDisableDescription = function () {
  return getConfig({ section: "terminalAllInOne.script.disableDescription" });
};

const disableDescription = function () {
  return updateConfig({
    section: "terminalAllInOne.script.disableDescription",
    value: true,
  });
};

const runInTerminal = async function (command) {
  return commands.executeCommand("workbench.action.terminal.sendSequence", {
    text: command,
  });
};

const createDescription = function ({ name, script }) {
  function echoCmd(cmd, num) {
    return `echo -e "\\t ${num}. ${cmd}"; `;
  }
  const controlC = "\u0003";
  const emptyLine = 'echo "";';
  const ignoreAbove =
    "echo '^ Ignore the above command (it tells the terminal to display the script info) ^';";
  const running = `echo -e "Running script: \\033[1m${name}\\033[0m";`;
  const enter = "\u000D";
  let cmds = "";
  if (typeof script === "string") {
    cmds = echoCmd(script, 1);
  } else {
    script.forEach((s, i) => {
      cmds += echoCmd(s, i + 1);
    });
  }
  return `${controlC} ${emptyLine} ${ignoreAbove} ${emptyLine} ${running} ${emptyLine} ${cmds}${emptyLine} ${enter}`;
};

const createCommands = function (script) {
  if (typeof script === "string") {
    return script;
  }
  let jointScript = "";
  script.forEach((s, i) => {
    jointScript += i ? ` && ${s}` : s;
  });
  return jointScript;
};

const execute = async function ({ name, script }) {
  const cmds = createCommands(script);
  await commands.executeCommand("workbench.action.terminal.focus");
  if (!shouldDisableDescription()) {
    await runInTerminal(createDescription({ name, script }));
    showMessage("disableScriptDescription", disableDescription);
  }
  await runInTerminal(`${cmds} \u000D`);
};

const runScriptHandler = async function (index) {
  const scripts = getScriptsConfig();
  if (typeof index === "number") {
    if (index < scripts.length) {
      return execute(scripts[index]);
    }
    return showMessage("noScripts", index);
  }
  if (!scripts.length) {
    return showMessage("noScripts");
  }
  const options = scripts.map(({ name, script }, i) => ({
    label: name,
    description: Array.isArray(script) ? script.join(" -> ") : script,
    index: i,
  }));
  const selectedScript = await window.showQuickPick(options, {
    placeHolder: "Run a Script",
    canPickMany: false,
  });
  if (selectedScript) {
    return execute(scripts[selectedScript.index]);
  }
};

export const runScript = {
  name: "runScript",
  handler: runScriptHandler,
};
