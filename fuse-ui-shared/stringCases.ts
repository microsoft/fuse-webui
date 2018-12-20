import { asArray, first } from './iterator';

export enum StringCases {
  unknown,
  lowerCase,
  upperCase,
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase
}

export function* breakWords(text: string): IterableIterator<string> {
  const capitalWord = /([A-Z][a-z0-9]*)/g;
  let cur = 0;
  for (; ;) {
    const match = capitalWord.exec(text);
    if (!match) {
      break;
    }
    if (match.index > cur) {
      yield text.substr(cur, match.index - cur);
    }
    yield match[1];
    cur = match.index + match[1].length;
  }
}

const isLowerCase = (text: string) => text && text.match(/^[a-z0-9]+$/);
const isUpperCase = (text: string) => text && text.match(/^[A-Z0-9]+$/);
const isWord = (text: string) => text && text.match(/^[a-zA-Z0-9]+$/);
const isCamelCase = (text: string) => text && isWord(text) && isLowerCase(first(breakWords(text)));
const isCapitalWord = (text: string) => text.match(/^[A-Z][a-z0-9]*$/);
const isPascalCase = (text: string) => text && isWord(text) && asArray(breakWords(text)).filter(x => !isCapitalWord(x)).length === 0;
const isSnakeCase = (text: string) => text && text.indexOf('_') >= 0 && text.split('_').filter(x => !isWord(x)).length === 0;
const isKebabCase = (text: string) => text && text.indexOf('-') >= 0 && text.split('-').filter(x => !isWord(x)).length === 0;

export function detectCase(name: string): StringCases {
  let result = StringCases.unknown;

  if (name) {
    if (isLowerCase(name)) {
      return StringCases.lowerCase;
    }

    if (isUpperCase(name)) {
      return StringCases.upperCase;
    }

    if (isCamelCase(name)) {
      return StringCases.camelCase;
    }

    if (isPascalCase(name)) {
      return StringCases.pascalCase;
    }

    if (isCamelCase(name)) {
      return StringCases.camelCase;
    }

    if (isSnakeCase(name)) {
      return StringCases.snakeCase;
    }

    if (isKebabCase(name)) {
      return StringCases.kebabCase;
    }
  }

  return result;
}
