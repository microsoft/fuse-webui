import { StringCases, toCase } from '@fuselab/ui-shared/lib/stringCases';
import { appendFileSync, createReadStream, readFileSync, writeFileSync } from 'fs';
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

export function transformFileToLinesSync(src: string, data: Data): string[] {
  const lines = readFileSync(src, { encoding: 'utf-8' }).split(/\n/);

  return lines.map(line => transformLine(data, line));
}

export async function transformFileToLines(src: string, data: Data): Promise<string[]> {
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
  const lines = await transformFileToLines(src, data);
  writeFileSync(target, lines.join('\n'));
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

export function generateMappable<T>(src: string, generate: (x: string) => T): Mappable<T> {
  if (isDir(src)) {
    return glob.sync(`${src}/**/*`)
      .map(filename => path.resolve(filename))
      .reduce(
        (tx, curPath) => {
          const fileName = path.basename(curPath, path.extname(curPath));
          const key = toCase(StringCases.camelCase, fileName);

          tx[key] = generateMappable(curPath, generate);

          return tx;
        },
        {});
  }

  return generate(src);
}

export function generateTransformSync(src: string): Mappable<(data: Data) => string[]> {
  return generateMappable(src, x => transformFileToLinesSync.bind(null, x));
}

export function generateTransform(src: string): Mappable<(data: Data) => Promise<string[]>> {
  return generateMappable(src, x => transformFileToLines.bind(null, x));
}

export function init() {
  _.templateSettings.interpolate = /\{\{(.+?)\}\}/g;
}
