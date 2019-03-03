import { capitalize } from '@fuselab/ui-shared/lib/stringCases';
import { existsSync } from 'fs';
import * as glob from 'glob';
import { resolve } from 'path';
import { Arguments } from 'yargs';
import * as yargs from 'yargs/yargs';
import { parseAgainstConfig } from '../acquire-config';
import logger from '../logger';
import { generateTransformSync, init, transformFile, transformFolder } from '../transform';
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
    const configPath = resolve(source, '.react-gen-rc.json');
    if (existsSync(configPath)) {
      const config = await parseAgainstConfig(configPath, process.argv.join(' '));
      const genTarget = config._react_gen_target;
      if (genTarget) {
        const transforms = generateTransformSync(source);
        const data = <any>{ capitalize, ...transforms, ...config };
        await transformFile(data, resolve(source, genTarget), target);
      } else {
        ensurePath(target);
        await transformFolder(config, source, target);
      }
    } else {
      ensurePath(target);
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

init();
