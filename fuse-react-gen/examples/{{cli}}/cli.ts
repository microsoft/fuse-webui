#!/usr/bin/env node
import { scriptName } from 'yargs';

//tslint:disable-next-line:no-unused-variable
const _dummy = scriptName('{{cli}}')
  .commandDir('./commands', { exclude: /\.spec\.js$/ })
  .help()
  .demandCommand(1).argv;
