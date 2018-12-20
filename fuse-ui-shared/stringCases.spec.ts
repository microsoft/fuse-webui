///<reference types='jasmine'/>
import { asArray } from './iterator';
import { breakWords, capitalize, detectCase, StringCases, toCase } from './stringCases'

const detectCases: [string, StringCases][] = [
  ['hello', StringCases.lowerCase],
  ['HELLO', StringCases.upperCase],
  ['helloWorld', StringCases.camelCase],
  ['HelloWorld', StringCases.pascalCase],
  ['hello-world', StringCases.kebabCase],
  ['Hello_World', StringCases.snakeCase],
  [null, StringCases.unknown]
];

const transformCases: [string, StringCases, string][] = [
  ['hello', StringCases.pascalCase, 'Hello'],
  ['hello-World', StringCases.pascalCase, 'HelloWorld'],
  ['HelloWorld', StringCases.camelCase, 'helloWorld'],
  ['helloWorld', StringCases.snakeCase, 'hello_world']
];

describe('stringCases', () => {
  it('breaks words', () => {
    expect(asArray(breakWords('helloWorld'))).toEqual(['hello', 'World']);
  });

  it('capitalize word', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('detect cases', () => {
    detectCases.forEach(x => {
      expect(detectCase(x[0])).toBe(x[1]);
    });
  });

  it('transform cases', () => {
    transformCases.forEach(x => {
      expect(toCase(x[1], x[0])).toBe(x[2]);
    });
  })
});
