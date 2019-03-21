[1mdiff --git a/fuse-react-gen/commands/add.ts b/fuse-react-gen/commands/add.ts[m
[1mindex 0b9c651..2055942 100644[m
[1m--- a/fuse-react-gen/commands/add.ts[m
[1m+++ b/fuse-react-gen/commands/add.ts[m
[36m@@ -43,26 +43,38 @@[m [mexport async function handler(argv: ARGV & Arguments, extra?: string[]): Promise[m
         const transforms = generateTransformSync(source);[m
         const data = <any>{ capitalize, ...transforms, ...config };[m
         logger.info(`data = ${JSON.stringify(data, null, 2)}`);[m
[31m-        const fileTarget = isDir(target) ? resolve(target, _.template(genTarget)(data)) : target;[m
[31m-        await transformFile(data, resolve(source, genTarget), fileTarget);[m
[32m+[m[32m        const isFolder = Array.isArray(genTarget) && genTarget.length > 1;[m
[32m+[m[32m        const targetFiles = isFolder ?[m
[32m+[m[32m          genTarget.reduce((cur, x) => ({ ...cur, [x]: resolve(target, _.template(x)(data)) }), {}) :[m
[32m+[m[32m          {[m
[32m+[m[32m            [genTarget]: isDir(target) ? resolve(target, _.template(genTarget)(data)) : target[m
[32m+[m[32m          };[m
[32m+[m
[32m+[m[32m        for (const gen of genTarget) {[m
[32m+[m[32m          await transformFile(data, resolve(source, gen), targetFiles[gen]);[m
[32m+[m[32m        }[m
[32m+[m[32m        if (!isFolder) {[m
[32m+[m[32m          const fileTarget = isDir(target) ? resolve(target, _.template(genTarget)(data)) : target;[m
[32m+[m[32m          await transformFile(data, resolve(source, genTarget), fileTarget);[m
[32m+[m
[32m+[m[32m        } else {[m
[32m+[m[32m          ensurePath(target);[m
[32m+[m[32m          await transformFolder(config, source, target);[m
[32m+[m[32m        }[m
       } else {[m
         ensurePath(target);[m
[31m-        await transformFolder(config, source, target);[m
[32m+[m[32m        await transformFolder(yargs().parse(argv._), source, target);[m
       }[m
[32m+[m[32m      glob.sync(`${target}/**/*.*`, { ignore: `${target}/node_modules/**/*` }).map(x => {[m
[32m+[m[32m        logger.info(`${x} created`);[m
[32m+[m[32m      });[m
     } else {[m
[31m-      ensurePath(target);[m
[31m-      await transformFolder(yargs().parse(argv._), source, target);[m
[32m+[m[32m      const config = yargs().parse(argv._);[m
[32m+[m[32m      await transformFile(config, source, target);[m
[32m+[m[32m      logger.info(`${target} created`);[m
     }[m
[31m-    glob.sync(`${target}/**/*.*`, { ignore: `${target}/node_modules/**/*` }).map(x => {[m
[31m-      logger.info(`${x} created`);[m
[31m-    });[m
[31m-  } else {[m
[31m-    const config = yargs().parse(argv._);[m
[31m-    await transformFile(config, source, target);[m
[31m-    logger.info(`${target} created`);[m
[31m-  }[m
 [m
[31m-  return Promise.resolve(source);[m
[31m-}[m
[32m+[m[32m    return Promise.resolve(source);[m
[32m+[m[32m  }[m
 [m
[31m-init();[m
[32m+[m[32m  init();[m
