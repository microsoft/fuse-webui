import { Arguments } from 'yargs';
import logger from '../logger';

export const command = 'create';
export const describe = 'sample create command';
export const builder = {
  kind: {
    alias: 'k',
    required: true,
    type: 'string',
    describe: 'type to create: [...]'
  },
  dest: {
    alias: 'a',
    required: false,
    type: 'string',
    describe: 'name of the kind of object to be created'
  }
};

export type CodeKind = 'todo' | 'user' | 'team';

export interface ARGV {
  kind: CodeKind;
  appName: string;
}

export async function handler(argv: ARGV & Arguments): Promise<string> {
  logger.info(`calling add with argv = ${JSON.stringify(argv, null, 2)}`);

  return Promise.resolve<string>(null);
}
