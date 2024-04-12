// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { v4 } from "uuid";

function insertText(text: string) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No active text editor found");
    return;
  }

  const selection = editor.selection;
  const range = new vscode.Range(selection.start, selection.end);
  editor.edit((editBuilder) => {
    editBuilder.replace(range, text);
  });
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "slides-helper" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposableAddComment = vscode.commands.registerCommand(
    "slides-helper.addId",
    () => {
      const uniqueId = `<!-- .slide: id="${v4()}" -->`;
      insertText(uniqueId);
    }
  );

  const disposableAddVerticalSeparator = vscode.commands.registerCommand(
    "slides-helper.addVS",
    () => {
      insertText(";VS;");
    }
  );

  const disposableAddHorizontalSeparator = vscode.commands.registerCommand(
    "slides-helper.addHS",
    () => {
      insertText(";HS;");
    }
  );

  context.subscriptions.push(
    disposableAddComment,
    disposableAddVerticalSeparator,
    disposableAddHorizontalSeparator
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
