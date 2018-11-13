///<reference types='jasmine'/>
import { callbackToPromise } from '@fuselab/ui-shared/asyncUtils';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import { Data, init, transformFile, transformLine } from './transform';

init();

describe('transformLine', () => {
  it('transformText', () => {
    const data: Data = {
      component: "Menu"
    };

    expect(transformLine(data, 'export interface {{component}}Attributes {')).toBe('export interface MenuAttributes {');
  });
});

describe('transformFile', () => {
  it('transformFile', async () => {
    const data: Data = {
      component: 'Nav'
    };
    await transformFile(data, './examples/dummy.tsx', './examples/nav.tsx');
    expect(fs.existsSync('./examples/nav.tsx')).toBe(true);
    await callbackToPromise(rimraf, './examples/nav.tsx');
  });
});
