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

export function capitalize(word: string): string {
  const match = word.match(/^([a-z])[a-z0-9A-Z]*$/);
  if (!match) {
    return word;
  }

  return `${match[1].toUpperCase()}${word.substr(1)}`;
}


export function toCase(targetCase: StringCases, text): string {
  const source = detectCase(text);
  let words: string[] = [];

  if (source === targetCase) {
    return text;
  }

  switch (source) {
    case StringCases.kebabCase:
      words = text.split('-');
      break;
    case StringCases.snakeCase:
      words = text.split('_');
      break;
    case StringCases.camelCase:
    case StringCases.pascalCase:
      words = asArray(breakWords(text));
      break;
    default:
      words = [text];
  }

  switch (targetCase) {
    case StringCases.lowerCase:
      return words.map(x => x.toLowerCase()).join('');
    case StringCases.upperCase:
      return words.map(x => x.toUpperCase()).join('');
    case StringCases.camelCase:
      return words.map((x, i) => i === 0 ? x.toLowerCase() : capitalize(x)).join('');
    case StringCases.pascalCase:
      return words.map((x, i) => i === 0 ? capitalize(x) : capitalize(x)).join('');
    case StringCases.kebabCase:
      return words.map(x => x.toLowerCase()).join('-');
    case StringCases.snakeCase:
      return words.map(x => x.toLowerCase()).join('_');
    default:
  }

  return text;
}

export const camelCase = (word: string) => toCase(StringCases.camelCase, word);

export const pascalCase = (word: string) => toCase(StringCases.pascalCase, word);

export const kebabCase = (word: string) => toCase(StringCases.kebabCase, word);
