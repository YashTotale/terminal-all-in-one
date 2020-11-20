import { commands, ExtensionContext } from "vscode";
import BaseCommand from "./baseCommand";

interface scriptObject {
  name: string;
  script: string | string[];
}

interface HandlerArgs {
  context: ExtensionContext;
  index?: number;
}

export default class RunScript extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("runScript", (index) => this.handler({ context, index }));
  }

  async handler({ index, context }: HandlerArgs) {
    //All Scripts
    const scripts = this.getScriptsConfig();
    if (!this.handlerChecks(scripts, index)) {
      //Create the QP items and show the QP
      const items = scripts.map(
        ({ name, script }: scriptObject, i: number) => ({
          label: name,
          description: Array.isArray(script) ? script.join(" -> ") : script,
          index: i,
        })
      );
      return this.showQuickPick(
        items,
        { placeHolder: "Run a Script" },
        (selectedScript) => {
          //@ts-expect-error
          return this.execute(scripts[selectedScript.index]);
        }
      );
    }
  }

  handlerChecks(scripts: scriptObject[], index?: number) {
    //Check if the index has been passed and if it is a valid index
    if (typeof index === "number") {
      if (index < scripts.length) {
        this.execute(scripts[index]);
        return true;
      }
      this.showMessage("noScripts", index);
      return true;
    }
    if (!scripts.length) {
      this.showMessage("noScripts");
      return true;
    }
    return false;
  }

  async execute({ name, script }: scriptObject) {
    const cmds = this.createCommands(script);
    await commands.executeCommand("workbench.action.terminal.focus");
    if (!this.getDisableDescriptionConfig()) {
      await this.runInTerminal(this.createDescription({ name, script }));
      this.showMessage("disableScriptDescription", this.disableDescription);
    }
    await this.runInTerminal(`${cmds} \u000D`);
  }

  createCommands(script: string | string[]) {
    if (typeof script === "string") {
      return script;
    }
    let jointScript = "";
    script.forEach((s, i) => {
      jointScript += i ? ` && ${s}` : s;
    });
    return jointScript;
  }

  createDescription({ name, script }: scriptObject) {
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

  runInTerminal(command: string) {
    return commands.executeCommand("workbench.action.terminal.sendSequence", {
      text: command,
    });
  }

  getScriptsConfig() {
    return this.getExtensionConfig("scripts");
  }

  getDisableDescriptionConfig() {
    return this.getExtensionConfig("script.disableDescription");
  }

  disableDescription() {
    return this.updateExtensionConfig({
      key: "script.disableDescription",
      value: true,
    });
  }
}
