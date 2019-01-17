import { callbackToPromise } from '@fuselab/ui-shared/lib/asyncUtils';
import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';

export function ensurePath(filePath: string) {
  const parts = filePath.split('/');
  let cur = '';
  for (const part of parts) {
    cur = cur ? path.resolve(cur, part) : path.resolve(part);
    if (!fs.existsSync(cur)) {
      fs.mkdirSync(cur);
    }
  }
}

export async function readFileAsObj<T>(file: string): Promise<T> {
  const buffer = await readFileAsync(file);
  const text = buffer.toString();

  return JSON.parse(text);
}

export async function readFileAsync(file: string): Promise<Buffer> {
  return callbackToPromise(fs.readFile, file);
}

export function normalizeEol(buf: Buffer): Buffer {
  const txt = buf.toString().replace(/\r\n/g, '\n');

  return new Buffer(txt);
}

export async function compareFile(src: string, target: string): Promise<boolean> {
  const bufSrcRaw = await readFileAsync(src);
  const bufTargetRaw = await readFileAsync(target);

  // normalize eol to \n
  const bufSrc = normalizeEol(bufSrcRaw);
  const bufTarget = normalizeEol(bufTargetRaw);

  return bufSrc.compare(bufTarget) === 0;
}

export function isDir(dirPath: string): boolean {
  return fs.lstatSync(dirPath).isDirectory();
}

export async function compareFolder(src: string, target: string): Promise<boolean> {
  const srcFiles = await callbackToPromise<string[]>(glob, `${src}/**/*.*`);
  const targetFiles = await callbackToPromise<string[]>(glob, `${target}/**/*`);

  if (srcFiles.length !== targetFiles.length) {
    return false;
  }

  for (const srcFile of srcFiles) {
    const base = path.basename(srcFile);
    const taretFile = targetFiles.find(x => path.basename(x) === base);

    if (!taretFile) {
      return false;
    }
    const same = await compareFile(srcFile, taretFile);

    if (!same) {
      return false;
    }
  }

  return true;
}
