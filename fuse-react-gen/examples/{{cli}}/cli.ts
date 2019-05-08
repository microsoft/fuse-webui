#!/usr/bin/env node
import { commandDir } from 'yargs';

//tslint:disable-next-line:no-unused-variable
const _dummy = commandDir('./commands', { exclude: /\.spec\.js$/ })
  .help()
  .demandCommand(1).argv;
