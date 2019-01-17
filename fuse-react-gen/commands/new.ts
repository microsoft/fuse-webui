
import { existsSync } from 'fs';
import { resolve } from 'path';
import { Arguments } from 'yargs';
import * as yargs from 'yargs/yargs';
import { parseAgainstConfig } from '../acquire-config';
import { transformFile, transformFolder } from '../transform';
import { isDir } from '../utils';

export const command = 'add';
export const describe = 'generate new artifacts based on templates';
export const builder = {
  source: {
    alias: 's',
    required: true,
    type: 'string',
    describe: 'source of the template file or folder'
  },
  target: {
    alias: 't',
    required: true,
    type: 'string',
    describe: 'target path of the artifact to be generated'
  }
};

export interface ARGV {
  source: string;
  target: string;
}

export async function handler(argv: ARGV & Arguments): Promise<string> {
  const { source, target } = argv;
  if (isDir(source)) {
    const configPath = resolve(source, '.react-gen-rc.json');
    if (existsSync(configPath)) {
      const config = await parseAgainstConfig(configPath, argv);
      await transformFolder(config, source, target);
    }
  } else {
    const config = yargs().parse(argv._);
    await transformFile(config, source, target);
  }

  return Promise.resolve(source);
}
