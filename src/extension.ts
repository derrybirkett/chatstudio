import * as vscode from 'vscode';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function getChatGPTResponse(prompt: string) {
    const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
            prompt,
            max_tokens: 200,
            n: 1,
            stop: null,
            temperature: 0.8,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
        }
    );
    return response.data.choices[0].text;
}

async function updateFilesFromInstructions(instructions: string, workspaceUri: vscode.Uri) {
    const updateInstructions = `Update project files according to the following instructions: ${instructions}`;
    const chatGPTResponse = await getChatGPTResponse(updateInstructions);

    const updates = chatGPTResponse.split('\n');
    for (const update of updates) {
        if (!update) {
            continue;
        }

        // Parse the instruction into file path and content
        const [filePath, content] = update.split(': ');

        // Update the file in the workspace
        const targetPath = path.join(workspaceUri.fsPath, filePath);
        if (fs.existsSync(targetPath)) {
            fs.writeFileSync(targetPath, content, { encoding: 'utf8', flag: 'w' });
        }
    }
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.updateProjectFiles', async () => {
        const activeTextEditor = vscode.window.activeTextEditor;
        if (!activeTextEditor) {
            vscode.window.showErrorMessage('Please open an editor with instructions to update your project files.');
            return;
        }

        const instructions = activeTextEditor.document.getText();
        const workspaceUri = vscode.workspace.workspaceFolders?.[0].uri;
        if (!workspaceUri) {
            vscode.window.showErrorMessage('No workspace folder found.');
            return;
        }

        try {
			await updateFilesFromInstructions(instructions, workspaceUri);
			vscode.window.showInformationMessage('Project files updated successfully.');
		} catch (error) {
			if (error instanceof Error) {
				vscode.window.showErrorMessage('Error updating project files: ' + error.message);
			} else {
				vscode.window.showErrorMessage('Error updating project files: ' + String(error));
			}
		}
    });

    context.subscriptions.push(disposable);
} // <- Add closing brace here for the activate function

