import { window, TextEditor, ExtensionContext, commands } from 'vscode';

export type Transform = (input: string) => string;

export function registerTransform(context: ExtensionContext, name: string, transform: Transform) {
  context.subscriptions.push(commands.registerCommand(name, function () {
    transformSelectedText(window.activeTextEditor, transform);
  }));
}

export function transformSelectedText(editor: TextEditor | undefined, transform: Transform): void {
  if (!editor) return; // No open text editor found
  if (editor.selections.length === 0) {
    return;
  }

  editor.edit((builder) => {
    for (const selection of editor.selections) {
      const selectedText = editor.document.getText(selection);
      try {
        const transformedText = transform(selectedText);
        builder.replace(selection, transformedText);
      }
      catch (err) {
        window.showInformationMessage(`Err: ${err}`);
      }
    }
  });
}
