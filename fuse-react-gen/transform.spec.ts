///<reference types='jasmine'/>
import { callbackToPromise } from '@fuselab/ui-shared/asyncUtils';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { Data, init, transformFile, transformLine } from './transform';
import { compareFile, ensurePath } from './utils';
init();

describe('transformLine', () => {
  it('transformText', () => {
    const data: Data = {
      Component: 'Menu',
      component: 'menu'
    };

    expect(transformLine(data, 'export interface {{Component}}Attributes {')).toBe('export interface MenuAttributes {');
  });
});

describe('transformFile', () => {
  it('transformFile', async () => {
    const data: Data = {
      Component: 'Nav',
      component: 'nav'
    };

    const src = './examples/nav.tsx';
    const target = './examples/results/nav.tsx';
    const snapshot = './examples/snapshots/nav.tsx';

    ensurePath(path.resolve(target, '..'));

    await transformFile(data, src, target);
    const check = await compareFile(target, snapshot);
    expect(check).toBe(true);
    await callbackToPromise(rimraf, './examples/results/*');
  });
});
