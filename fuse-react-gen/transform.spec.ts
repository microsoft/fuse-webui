///<reference types='jasmine'/>
import { callbackToPromise } from '@fuselab/ui-shared/asyncUtils';
import { capitalize } from '@fuselab/ui-shared/stringCases';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { Data, generateTransform, init, transformFile, transformFolder, transformLine } from './transform';
import { compareFile, compareFolder, ensurePath } from './utils';
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
    if (check) {
      await callbackToPromise(rimraf, target);
    }
  });
});

describe('transformFolder', () => {
  it('transformFolder', async () => {
    const data: Data = {
      Component: 'Tree',
      component: 'tree'
    };

    const src = './examples/{{component}}';
    const target = './examples/results/components/tree';
    const snapshot = './examples/snapshots/components/tree';

    ensurePath(target);

    await transformFolder(data, src, target);
    const check = await compareFolder(target, snapshot);
    expect(check).toBe(true, `${target} not same as ${snapshot}`);
    if (check) {
      rimraf.sync('./examples/results/components/**/*.*');
    }
  })
})

describe('generateTransform', () => {
  it('generateFileTransform', async () => {
    const t = generateTransform('./examples/actions/actionInterface.ts');
    expect(t).not.toBeNull();
    expect(typeof (t)).toBe('function');
    if (typeof t === 'function') {
      const lines = await t({ verb: 'add', model: 'todo', capitalize });
      expect(lines).toEqual(['export interface AddTodo {', '  type: ActionNames.add;', '  entity: Todo;', '}']);
    }
  });

  it('generateFolderTransforms', () => {
    const t = generateTransform('./examples/actions');
    expect(t).not.toBeNull();
    expect(typeof (t)).toBe('object');
    expect(Object.keys(t).sort()).toEqual(['actionGenerator', 'actionInterface', '{{model}}']);
  });
})
