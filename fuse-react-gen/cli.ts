import { commandDir } from 'yargs';

//tslint:disable-next-line:no-unused-variable
const _dummy = commandDir('./commands')
  .help()
  .demandCommand(1).argv;
