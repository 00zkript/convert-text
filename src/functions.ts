// Constantes para identificar los tipos de casos
const PASCAL_CASE_ID = 1;
const SNAKE_CASE_ID = 2;
const CAMEL_CASE_ID = 3;
const CONST_CASE_ID = 4;
const UPPER_CASE_ID = 5;
const LOWER_CASE_ID = 6;
const CAPITALIZE_CASE_ID = 7;
const TITLE_CASE_ID = 8;
const SLUG_CASE_ID = 9;

function slugify(text: string): string {
    // Convierte el texto a minúsculas
    text = text.toLowerCase();
    
    // Reemplaza espacios con guiones bajos
    text = text.replace(/\s+/g, '_');
    
    // Elimina caracteres especiales y acentos
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // Limita la longitud del slug (por ejemplo, a 50 caracteres)
    text = text.substring(0, 50);
    
    // Elimina caracteres no deseados
    text = text.replace(/[^a-z0-9_]/g, '');
    
    return text;
}

function convertToSnakeCase(inputStr: string): string {
    inputStr = inputStr.trim();
    
    if (inputStr === inputStr.toUpperCase()) {
        return inputStr.toLowerCase();
    }

    inputStr = inputStr.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const words = inputStr.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|[0-9]+/g);
    if (words) {
        const snakeCaseStr = words.map(word => word.toLowerCase()).join('_');
        return snakeCaseStr;
    } else {
        // Manejar el caso en que 'words' es nulo
        throw new Error('La variable "words" es nula o indefinida.');
    }
}

function pascalCase(snakeStr: string): string {
    const words = snakeStr.split('_');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function snakeCase(snakeStr: string): string {
    return snakeStr;
}

function camelCase(snakeStr: string): string {
    const words = snakeStr.split('_');
    const firstWord = words[0];
    const restWords = words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return firstWord + restWords.join('');
}

function constCase(snakeStr: string): string {
    return snakeStr.toUpperCase();
}

function titleCase(snakeStr: string): string {
    const words = snakeStr.split('_');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function slugCase(snakeStr: string): string {
    return snakeStr.replaceAll('_', '-');
}

function upperCase(inputStr: string): string {
    return inputStr.toUpperCase();
}

function lowerCase(inputStr: string): string {
    return inputStr.toLowerCase();
}

function capitalizeCase(inputStr: string): string {
    return inputStr.charAt(0).toUpperCase() + inputStr.slice(1).toLowerCase();
}

// Función principal que transforma el texto al tipo de caso especificado
function transformText(textStr: string, typeCase: number = SNAKE_CASE_ID): string {
    
    if (typeCase === UPPER_CASE_ID) {
        return upperCase(textStr);
    }
    
    if (typeCase === LOWER_CASE_ID) {
        return lowerCase(textStr);
    }
    
    if (typeCase === CAPITALIZE_CASE_ID) {
        return capitalizeCase(textStr);
    }
    
    const snakeCaseStr = convertToSnakeCase(textStr);
    
    if (typeCase === PASCAL_CASE_ID) {
        return pascalCase(snakeCaseStr);
    }
    
    if (typeCase === SNAKE_CASE_ID) {
        return snakeCaseStr;
    }
    
    if (typeCase === CAMEL_CASE_ID) {
        return camelCase(snakeCaseStr);
    }
    
    if (typeCase === CONST_CASE_ID) {
        return constCase(snakeCaseStr);
    }
    
    if (typeCase === TITLE_CASE_ID) {
        return titleCase(snakeCaseStr);
    }
    
    if (typeCase === SLUG_CASE_ID) {
        return slugCase(snakeCaseStr);
    }
    
    throw new Error('No se eligió ningún caso válido');
}


function test(): string {
    // Ejemplo de uso:
    const text = "¡Hola, este es un texto de ejemplo con acentos: café, año, jalapeño!";
    const result = transformText(text, SLUG_CASE_ID);
    console.log("result: " + result);
    return result;
}


export {
    PASCAL_CASE_ID,
    SNAKE_CASE_ID,
    CAMEL_CASE_ID,
    CONST_CASE_ID,
    UPPER_CASE_ID,
    LOWER_CASE_ID,
    CAPITALIZE_CASE_ID,
    TITLE_CASE_ID,
    SLUG_CASE_ID,
    slugify,
    convertToSnakeCase,
    pascalCase,
    snakeCase,
    camelCase,
    constCase,
    titleCase,
    slugCase,
    upperCase,
    lowerCase,
    capitalizeCase,
    transformText,
    test
};
