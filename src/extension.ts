import * as vscode from 'vscode';
import * as convertText from './functions';



function processText(textStr: string, typeCase: number ): string {
    
    if (typeCase === convertText.UPPER_CASE_ID) {
        return convertText.upperCase(textStr);
    }
    
    if (typeCase === convertText.LOWER_CASE_ID) {
        return convertText.lowerCase(textStr);
    }
    
    if (typeCase === convertText.CAPITALIZE_CASE_ID) {
        return convertText.capitalizeCase(textStr);
    }
    
    const snakeCaseStr = convertText.convertToSnakeCase(textStr);
    
    if (typeCase === convertText.PASCAL_CASE_ID) {
        return convertText.pascalCase(snakeCaseStr);
    }
    
    if (typeCase === convertText.SNAKE_CASE_ID) {
        return snakeCaseStr;
    }
    
    if (typeCase === convertText.CAMEL_CASE_ID) {
        return convertText.camelCase(snakeCaseStr);
    }
    
    if (typeCase === convertText.CONST_CASE_ID) {
        return convertText.constCase(snakeCaseStr);
    }
    
    if (typeCase === convertText.TITLE_CASE_ID) {
        return convertText.titleCase(snakeCaseStr);
    }
    
    if (typeCase === convertText.SLUG_CASE_ID) {
        return convertText.slugCase(snakeCaseStr);
    }
    
    throw new Error('No se eligió ningún caso válido');
    
}

function replaceSelectedTexts( typeCase: number ) {
    const editor = vscode.window.activeTextEditor;

	if (editor) {
        editor.edit(async (editBuilder) => {
            for (const selection of editor.selections) {
                if (!selection.isEmpty) {
                    try {
                        const selectedText = editor.document.getText(selection);
                        const processedText = processText(selectedText,typeCase);
    
                        // Reemplazamos el texto seleccionado con el resultado procesado
                        editBuilder.replace(selection, processedText);
                        
                    } catch (error) {
                        vscode.window.showErrorMessage( 'No se eligió ningún caso válido' );
                    }
                }
            }
        });
    }
}

function getSelectedTexts(): string[] {
    const editor = vscode.window.activeTextEditor;
    const selectedTexts: string[] = [];

    if (editor) {
        const selections = editor.selections;
        for (const selection of selections) {
            if (!selection.isEmpty) {
				const selectedText = editor.document.getText(selection);
                selectedTexts.push(selectedText);
            }
        }
    }

    return selectedTexts;
}


export function activate(context: vscode.ExtensionContext) {

	// console.log('Congratulations, your extension "convert-text" is now active!');

	/* const disposableTest = vscode.commands.registerCommand('convert-text.test', () => {
		vscode.window.showInformationMessage('result: '+convertText.test());
		const selectedText = getSelectedTexts();
		vscode.window.showInformationMessage('result: '+selectedText.join(', '));
	}); */

	const disposablePascalCase = vscode.commands.registerCommand('all-convert-text.pascalCase', _ => replaceSelectedTexts( convertText.PASCAL_CASE_ID ) );
	const disposableSnakeCase = vscode.commands.registerCommand('all-convert-text.snakeCase', _ => replaceSelectedTexts( convertText.SNAKE_CASE_ID ) );
	const disposableCamelCase = vscode.commands.registerCommand('all-convert-text.camelCase', _ => replaceSelectedTexts( convertText.CAMEL_CASE_ID ) );
	const disposableConstCase = vscode.commands.registerCommand('all-convert-text.constCase', _ => replaceSelectedTexts( convertText.CONST_CASE_ID ) );
	const disposableUpperCase = vscode.commands.registerCommand('all-convert-text.upperCase', _ => replaceSelectedTexts( convertText.UPPER_CASE_ID ) );
	const disposableLowerCase = vscode.commands.registerCommand('all-convert-text.lowerCase', _ => replaceSelectedTexts( convertText.LOWER_CASE_ID ) );
	const disposableCapitalizeCase = vscode.commands.registerCommand('all-convert-text.capitalizeCase', _ => replaceSelectedTexts( convertText.CAPITALIZE_CASE_ID ) );
	const disposableTitleCase = vscode.commands.registerCommand('all-convert-text.titleCase', _ => replaceSelectedTexts( convertText.TITLE_CASE_ID ) );
	const disposableSlugCase = vscode.commands.registerCommand('all-convert-text.slugCase', _ => replaceSelectedTexts( convertText.SLUG_CASE_ID ) );


	context.subscriptions.push(disposablePascalCase);
	context.subscriptions.push(disposableSnakeCase);
	context.subscriptions.push(disposableCamelCase);
	context.subscriptions.push(disposableConstCase);
	context.subscriptions.push(disposableUpperCase);
	context.subscriptions.push(disposableLowerCase);
	context.subscriptions.push(disposableCapitalizeCase);
	context.subscriptions.push(disposableTitleCase);
	context.subscriptions.push(disposableSlugCase);
}

export function deactivate() {}
