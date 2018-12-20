///<reference types='jasmine'/>
import { asArray } from './iterator';
import { breakWords, detectCase, StringCases } from './stringCases'

const data: [string, StringCases][] = [
  ['hello', StringCases.lowerCase],
  ['HELLO', StringCases.upperCase],
  ['helloWorld', StringCases.camelCase],
  ['HelloWorld', StringCases.pascalCase],
  ['hello-world', StringCases.kebabCase],
  ['Hello_World', StringCases.snakeCase],
  [null, StringCases.unknown]
]

describe('breakWords', () => {
  it('breaks words', () => {
    expect(asArray(breakWords('helloWorld'))).toEqual(['hello', 'World']);
  })
});

describe('detectCase', () => {
  it('detect cases', () => {
    data.forEach(x => {
      console.info(`${x[0]} should be ${StringCases[x[1]]}`);
      expect(detectCase(x[0])).toBe(x[1]);
    });
  });
});
