///<reference types='jasmine'/>

import { baseName, pathExt } from './path';

describe('path utils', () => {
  it('parse baseName', () => {
    expect(baseName('/foo/bar/test/')).toBe('test');
    expect(baseName('\\test/bar\\test/more.txt')).toBe('more.txt');
    expect(baseName('.')).toBe('.');
  });

  it('pare extension', () => {
    expect(pathExt('foo.html')).toBe('html');
    expect(pathExt('foo/bar/te')).toBeNull();
  });
})
