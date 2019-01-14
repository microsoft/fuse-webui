import { commandDir } from 'yargs';

import * as add from './commands/new';

const _dummy = commandDir('./commands')
  .help()
  .demandCommand(1).argv;
