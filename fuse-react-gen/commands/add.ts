import { camelCase, capitalize, pascalCase } from "@fuselab/ui-shared/lib/stringCases";
import { existsSync } from "fs";
import * as glob from "glob";
import { basename, resolve } from "path";
import * as _ from "underscore";
import { Arguments } from "yargs";
import * as yargs from "yargs/yargs";
import { parseAgainstConfig } from "../acquire-config";
import logger from "../logger";
import { generateTransformSync, init, transformFile, transformFolder } from "../transform";
import { ensurePath, isDir } from "../utils";

export const command = "add";
export const describe = "generate new artifacts based on templates";
export const builder = {
  source: {
    alias: "s",
    required: true,
    type: "string",
    describe: "source of the template file or folder"
  },
  target: {
    alias: "t",
    required: true,
    type: "string",
    describe: "target path of the artifact to be generated"
  }
};

export interface ARGV {
  source: string;
  target: string;
}

export async function handler(argv: ARGV & Arguments, extra?: string[]): Promise<string> {
  const { source, target } = argv;
  let realTarget = target;
  const helpers = { capitalize, camelCase, pascalCase };
  if (isDir(source)) {
    const configPath = resolve(source, ".react-gen-rc.json");
    logger.verbose(`configPath = ${configPath}`);
    if (existsSync(configPath)) {
      const config: Arguments = { ...helpers, ...(await parseAgainstConfig(configPath, (extra || process.argv).join(" "))) };
      const genTarget = config._react_gen_target;
      if (genTarget) {
        logger.info("creating transforms");
        const transforms = generateTransformSync(source);
        logger.info(`transforms created as ${Object.keys(transforms)}`);
        const data = <any>{ ...transforms, ...config };
        logger.info(`data = ${Object.keys(data)}`);
        const isFolder = Array.isArray(genTarget) /* && genTarget.length > 1*/;
        const transformedSource = _.template(source)(data);
        realTarget = transformedSource !== source ? resolve(target, basename(transformedSource)) : target;
        logger.info(`genTarget = ${genTarget} isFolder=${isFolder}`);
        const targetFiles = isFolder
          ? genTarget.reduce((cur, x) => ({ ...cur, [x]: resolve(realTarget, _.template(x)(data)) }), {})
          : {
              [genTarget]: isDir(target) ? resolve(realTarget, _.template(genTarget)(data)) : realTarget
            };

        ensurePath(realTarget);
        const srcTargets = isFolder ? genTarget : [genTarget];
        for (const gen of srcTargets) {
          logger.info(`gen = ${gen} src = ${resolve(source, gen)}, target = ${targetFiles[gen]}`);
          await transformFile(data, resolve(source, gen), targetFiles[gen]);
        }
      } else {
        ensurePath(realTarget);
        await transformFolder(config, source, realTarget);
      }
      glob.sync(`${realTarget}/**/*.*`, { ignore: `${target}/node_modules/**/*` }).map(x => {
        logger.info(`${x} created`);
      });
    } else {
      const config = yargs().parse(argv._);
      await transformFile(config, source, target);
      logger.info(`${target} created`);
    }
  } else {
    const config = yargs().parse(argv._);
    await transformFile(config, source, target);
    logger.info(`${target} created`);
  }

  return Promise.resolve(source);
}

init();
