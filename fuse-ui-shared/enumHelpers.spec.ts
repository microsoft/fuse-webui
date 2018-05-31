///<reference types='jasmine'/>
import { enumNames, enumStringMap } from './enumHelpers';

enum Foo {
  hello,
  goodbye
}

describe('enumNames', () => {
  it(' extract enum names', () => {
    expect(enumNames(Foo)).toEqual(['hello', 'goodbye']);
  })
});

describe('enumStringMap', () => {
  it('extract string map', () => {
    expect(enumStringMap(Foo)).toEqual({ hello: 'hello', goodbye: 'goodbye' });
  })
})
