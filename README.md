# ChatGPT Project File Updater for Visual Studio Code

This Visual Studio Code (VSCode) extension utilizes OpenAI's ChatGPT to automatically update project files based on user-provided instructions. The extension sends the instructions to ChatGPT, which returns the required updates, and the extension modifies the project files accordingly.

## Features

- Automatically update project files using natural language instructions.
- Leverages ChatGPT to interpret and generate updates.
- Supports multiple file updates within a single workspace.

## Requirements

- An OpenAI API key is required to use this extension. Sign up for an API key here: https://beta.openai.com/signup/
- Ensure Node.js is installed on your machine: https://nodejs.org/en/download/

## Installation

1. Download the `.vsix` file for the extension.
2. Open Visual Studio Code.
3. Open the command palette (Ctrl+Shift+P) and run: Extensions: Install from VSIX...
4. Select the downloaded `.vsix` file to install the extension.

## Usage

1. Open a project folder in VSCode.
2. Create a new text file containing the instructions for updating your project files.
3. Save and open the instructions file in the active text editor.
4. Open the command palette (Ctrl+Shift+P) and run the command associated with the extension: "Update Project Files".
5. The extension will process the instructions and update the project files as specified.

Please note that the quality of the updates depends on the clarity of the instructions and the model's understanding. Review the changes to ensure they are accurate and as expected.

## Known Issues

- The extension relies on the ChatGPT model's ability to understand and generate accurate instructions. As a result, some instructions may not be interpreted correctly, leading to incorrect updates.
- Ensure you have a backup of your project files before using the extension, as it modifies the files directly and may introduce unexpected changes.

## Contributing

If you'd like to contribute to this project, feel free to submit a pull request on the GitHub repository.

## License

This extension is released under the [MIT License](https://opensource.org/licenses/MIT).
