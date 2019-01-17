
import { existsSync } from 'fs';
import * as glob from 'glob';
import { resolve } from 'path';
import { Arguments } from 'yargs';
import * as yargs from 'yargs/yargs';
import { parseAgainstConfig } from '../acquire-config';
import logger from '../logger';
import { transformFile, transformFolder } from '../transform';
import { ensurePath, isDir } from '../utils';

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
    ensurePath(target);
    const configPath = resolve(source, '.react-gen-rc.json');
    if (existsSync(configPath)) {
      const config = await parseAgainstConfig(configPath, argv);
      await transformFolder(config, source, target);
    } else {
      await transformFolder(yargs().parse(argv._), source, target);
    }
    glob.sync(`${target}/**/*.*`, { ignore: `${target}/node_modules/**/*` }).map(x => {
      logger.info(`${x} created`);
    });
  } else {
    const config = yargs().parse(argv._);
    await transformFile(config, source, target);
    logger.info(`${target} created`);
  }

  return Promise.resolve(source);
}
