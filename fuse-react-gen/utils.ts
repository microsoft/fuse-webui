import { callbackToPromise } from '@fuselab/ui-shared/asyncUtils';
import * as fs from 'fs';
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

export async function readFileAsync(file: string): Promise<Buffer> {
  return callbackToPromise(fs.readFile, file);
}

export async function compareFile(src: string, target: string): Promise<boolean> {
  const bufSrc = await readFileAsync(src);
  const bufTarget = await readFileAsync(target);

  return bufSrc.compare(bufTarget) === 0;
}
