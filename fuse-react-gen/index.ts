import * as glob from 'glob';
import { createInterface, ReadLine } from 'readline';
import * as _ from 'underscore';
import { argv } from 'yargs';
import { init, transformFile, transformFolder } from './transform';
import { ensurePath, isDir } from './utils';

function showHelp(context: ReadLine) {
  context.write('react-gen --source {source} --target {target} --data {json}\n');
}

function requiredArg(name: string) {
  if (!argv[name]) {
    throw new Error(`${name} is required`);
  }
}

const lines = createInterface(process.stdin, process.stdout);

if (argv.help) {
  showHelp(lines);
  process.exit(0);
}

['source', 'target'].map(requiredArg);

const { source, target } = argv;

const dataContext = _.omit(argv, 'source', 'target', '_', '$0');

lines.write(`${JSON.stringify(dataContext, null, 2)}\n`);

init();

if (!isDir(source)) {
  transformFile(dataContext, source, target).then(
    () => {
      lines.write(`${target} created\n`);
      process.exit(0);
    },
    err => {
      throw err;
    }
  );
} else {
  ensurePath(target);
  transformFolder(dataContext, source, target).then(
    () => {
      glob.sync(`${target}/**/*.*`, { ignore: `${target}/node_modules/**/*` }).map(x => {
        lines.write(`${x} created\n`);
      });
      process.exit(0);
    },
    err => {
      throw err;
    });
}
