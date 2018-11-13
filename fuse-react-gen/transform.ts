import { callbackToPromise } from '@fuselab/ui-shared/lib/asyncUtils';
import { createReadStream, createWriteStream } from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { createInterface } from 'readline';
import * as _ from 'underscore';
import { ensurePath, isDir } from './utils';

export type Data = { [key: string]: string };

export interface Link {
  src: string;
  target: string;
}

export function transformLine(data: Data, content: string): string {
  const transform = _.template(content);

  return transform(data);
}

export async function transformFile(data: Data, src: string, target: string): Promise<void> {
  const output = createWriteStream(target);
  const lines = createInterface({
    input: createReadStream(src)
  });

  lines.on('line', async (x) => {
    const y = transformLine(data, x);
    await callbackToPromise(output.write.bind(output), `${y}\n`);
  });

  return new Promise<void>(resolve => {
    lines.on('close', () => {
      lines.close();
      resolve();
    });
  });
}

export async function transformFolder(data: Data, src: string, target: string): Promise<string[]> {
  const links: Link[] = glob.sync(`${src}/**/*`).map(filename => {
    const srcPath = path.resolve(filename);
    const relPath = path.relative(src, srcPath);
    const targetPath = path.resolve(target, _.template(relPath)(data));

    return {
      src: srcPath,
      target: targetPath
    };
  });

  const result: string[] = [];

  for (const link of links) {
    if (isDir(link.src)) {
      ensurePath(link.target);
      continue;
    }

    await transformFile(data, link.src, link.target);
    result.push(link.target);
  }

  return result;
}

export function init() {
  _.templateSettings.interpolate = /\{\{(.+?)\}\}/g;
}
