import { commands, ExtensionContext } from "vscode";
import BaseCommand from "./baseCommand";

interface scriptObject {
  name: string;
  script: string | string[];
}

interface handlerArgs {
  context: ExtensionContext;
  index?: number;
}

export default class RunScript extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("runScript", (index) => RunScript.handler({ context, index }));
  }

  static async handler({ index, context }: handlerArgs) {
    //All Scripts
    const scripts = RunScript.getScriptsConfig();
    if (!RunScript.handlerChecks(scripts, index)) {
      //Create the QP items and show the QP
      const items = scripts.map(
        ({ name, script }: scriptObject, i: number) => ({
          label: name,
          description: Array.isArray(script) ? script.join(" -> ") : script,
          index: i,
        })
      );
      return BaseCommand.showQuickPick(
        items,
        { placeHolder: "Run a Script" },
        (selectedScript) => {
          //@ts-expect-error
          return RunScript.execute(scripts[selectedScript.index]);
        }
      );
    }
  }

  static handlerChecks(scripts: scriptObject[], index?: number) {
    //Check if the index has been passed and if it is a valid index
    if (typeof index === "number") {
      if (index < scripts.length) {
        RunScript.execute(scripts[index]);
        return true;
      }
      BaseCommand.showMessage("noScripts", index);
      return true;
    }
    if (!scripts.length) {
      BaseCommand.showMessage("noScripts");
      return true;
    }
    return false;
  }

  static async execute({ name, script }: scriptObject) {
    const cmds = RunScript.createCommands(script);
    await commands.executeCommand("workbench.action.terminal.focus");
    if (!RunScript.getDisableDescriptionConfig()) {
      await RunScript.runInTerminal(
        RunScript.createDescription({ name, script })
      );
      BaseCommand.showMessage(
        "disableScriptDescription",
        RunScript.disableDescription
      );
    }
    await RunScript.runInTerminal(`${cmds} \u000D`);
  }

  static createCommands(script: string | string[]) {
    if (typeof script === "string") {
      return script;
    }
    let jointScript = "";
    script.forEach((s, i) => {
      jointScript += i ? ` && ${s}` : s;
    });
    return jointScript;
  }

  static createDescription({ name, script }: scriptObject) {
    const echoCmd = (cmd: string, num: number) => {
      return `echo -e "\\t ${num}. ${cmd}"; `;
    };
    const controlC = "\u0003";
    const emptyLine = 'echo "";';
    const ignoreAbove =
      "echo '^ Ignore the above command (it tells the terminal to display the script description) ^';";
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
  }

  static runInTerminal(command: string) {
    return commands.executeCommand("workbench.action.terminal.sendSequence", {
      text: command,
    });
  }

  static getScriptsConfig() {
    return BaseCommand.getExtensionConfig("scripts");
  }

  static getDisableDescriptionConfig() {
    return BaseCommand.getExtensionConfig("script.disableDescription");
  }

  static disableDescription() {
    return BaseCommand.updateExtensionConfig({
      key: "script.disableDescription",
      value: true,
    });
  }
}
