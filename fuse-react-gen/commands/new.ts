
import { existsSync } from 'fs';
import { resolve } from 'path';
import { Arguments, Argv } from 'yargs';
import { parseAgainstConfig } from '../acquire-config';
import { isDir } from '../utils';

export const command = 'add';
export const describe = 'generate new artifacts based on templates';
export const builder = {
  source: {
    alias: 's',
    required: true,
    type: 'string',
    describe: 'source of the template file or folder',
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
      console.log(`creating folder with ${JSON.stringify(config)}`);
    }
  } else {
    console.log(`generate file ${target}`);
  }

  return Promise.resolve(source);
}
