"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.transformText = exports.capitalizeCase = exports.lowerCase = exports.upperCase = exports.slugCase = exports.titleCase = exports.constCase = exports.camelCase = exports.snakeCase = exports.pascalCase = exports.convertToSnakeCase = exports.slugify = exports.SLUG_CASE_ID = exports.TITLE_CASE_ID = exports.CAPITALIZE_CASE_ID = exports.LOWER_CASE_ID = exports.UPPER_CASE_ID = exports.CONST_CASE_ID = exports.CAMEL_CASE_ID = exports.SNAKE_CASE_ID = exports.PASCAL_CASE_ID = void 0;
// Constantes para identificar los tipos de casos
const PASCAL_CASE_ID = 1;
exports.PASCAL_CASE_ID = PASCAL_CASE_ID;
const SNAKE_CASE_ID = 2;
exports.SNAKE_CASE_ID = SNAKE_CASE_ID;
const CAMEL_CASE_ID = 3;
exports.CAMEL_CASE_ID = CAMEL_CASE_ID;
const CONST_CASE_ID = 4;
exports.CONST_CASE_ID = CONST_CASE_ID;
const UPPER_CASE_ID = 5;
exports.UPPER_CASE_ID = UPPER_CASE_ID;
const LOWER_CASE_ID = 6;
exports.LOWER_CASE_ID = LOWER_CASE_ID;
const CAPITALIZE_CASE_ID = 7;
exports.CAPITALIZE_CASE_ID = CAPITALIZE_CASE_ID;
const TITLE_CASE_ID = 8;
exports.TITLE_CASE_ID = TITLE_CASE_ID;
const SLUG_CASE_ID = 9;
exports.SLUG_CASE_ID = SLUG_CASE_ID;
function slugify(text) {
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
exports.slugify = slugify;
function convertToSnakeCase(inputStr) {
    inputStr = inputStr.trim();
    if (inputStr === inputStr.toUpperCase()) {
        return inputStr.toLowerCase();
    }
    inputStr = inputStr.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const words = inputStr.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|[0-9]+/g);
    if (words) {
        const snakeCaseStr = words.map(word => word.toLowerCase()).join('_');
        return snakeCaseStr;
    }
    else {
        // Manejar el caso en que 'words' es nulo
        throw new Error('La variable "words" es nula o indefinida.');
    }
}
exports.convertToSnakeCase = convertToSnakeCase;
function pascalCase(snakeStr) {
    const words = snakeStr.split('_');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}
exports.pascalCase = pascalCase;
function snakeCase(snakeStr) {
    return snakeStr;
}
exports.snakeCase = snakeCase;
function camelCase(snakeStr) {
    const words = snakeStr.split('_');
    const firstWord = words[0];
    const restWords = words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return firstWord + restWords.join('');
}
exports.camelCase = camelCase;
function constCase(snakeStr) {
    return snakeStr.toUpperCase();
}
exports.constCase = constCase;
function titleCase(snakeStr) {
    const words = snakeStr.split('_');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
exports.titleCase = titleCase;
function slugCase(snakeStr) {
    return snakeStr.replaceAll('_', '-');
}
exports.slugCase = slugCase;
function upperCase(inputStr) {
    return inputStr.toUpperCase();
}
exports.upperCase = upperCase;
function lowerCase(inputStr) {
    return inputStr.toLowerCase();
}
exports.lowerCase = lowerCase;
function capitalizeCase(inputStr) {
    return inputStr.charAt(0).toUpperCase() + inputStr.slice(1).toLowerCase();
}
exports.capitalizeCase = capitalizeCase;
// Función principal que transforma el texto al tipo de caso especificado
function transformText(textStr, typeCase = SNAKE_CASE_ID) {
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
exports.transformText = transformText;
function test() {
    // Ejemplo de uso:
    const text = "¡Hola, este es un texto de ejemplo con acentos: café, año, jalapeño!";
    const result = transformText(text, SLUG_CASE_ID);
    console.log("result: " + result);
    return result;
}
exports.test = test;
//# sourceMappingURL=functions.js.map