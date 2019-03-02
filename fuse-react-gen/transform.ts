import { StringCases, toCase } from '@fuselab/ui-shared/stringCases';
import { appendFileSync, createReadStream } from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { createInterface } from 'readline';
import * as _ from 'underscore';
import { ensurePath, isDir, Mappable } from './utils';

export type Data = { [key: string]: string | Function };

export interface Link {
  src: string;
  target: string;
}

export function transformLine(data: Data, content: string): string {
  const transform = _.template(content);

  return transform(data);
}

export function transformLines(data: Data, src: string[]): string[] {
  return src.map(line => transformLine(data, line));
}

export async function transformFileToLines(data: Data, src: string): Promise<string[]> {
  const lines = createInterface({
    input: createReadStream(src)
  });

  const outputLines = [];
  lines.on('line', (x) => {
    const y = transformLine(data, x);
    outputLines.push(y);
  });

  return new Promise<string[]>(resolve => {
    lines.on('close', () => {
      lines.close();
      resolve(outputLines);
    });
  });
}

export async function transformFile(data: Data, src: string, target: string): Promise<void> {
  const lines = await transformFileToLines(data, src);

  appendFileSync(target, lines.join('\n'));
  appendFileSync(target, '\n');
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

export function generateTransform(src: string): Mappable<(data: Data) => Promise<string[]>> {
  if (isDir(src)) {
    return glob.sync(`${src}/**/*`)
      .map(filename => path.resolve(filename))
      .reduce(
        (tx, curPath) => {
          const fileName = path.basename(curPath, path.extname(curPath));
          const key = toCase(StringCases.camelCase, fileName);
          tx[key] = generateTransform(curPath);

          return tx;
        },
        {});
  }

  //tslint:disable-next-line:promise-function-async
  return data => transformFileToLines(data, src);
}

export function init() {
  _.templateSettings.interpolate = /\{\{(.+?)\}\}/g;
}
