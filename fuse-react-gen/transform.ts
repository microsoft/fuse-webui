import { callbackToPromise } from '@fuselab/ui-shared/lib/asyncUtils';
import { createReadStream, createWriteStream } from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { createInterface } from 'readline';
import * as _ from 'underscore';

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

export function transformFolder(data: Data, src: string, target: string): Link[] {
  return glob.sync(src).map(filename => ({
    src: path.resolve(src, filename),
    target: path.resolve(target, _.template(filename)(data))
  }));
}

export function init() {
  _.templateSettings.interpolate = /\{\{(.+?)\}\}/g;
}
