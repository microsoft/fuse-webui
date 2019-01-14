
import { Argv } from 'yargs';
import { isDir } from '../utils';

export const command = 'add';
export const describe = 'generate new artifacts based on templates'
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
  _: any;
}

export async function handler(argv: ARGV): Promise<string> {
  const { source, target } = argv;
  if (isDir(source)) {
    console.log(`generate folder ${source}`);
  } else {
    console.log(`generate file ${target}`);
  }

  return Promise.resolve(source);
}
