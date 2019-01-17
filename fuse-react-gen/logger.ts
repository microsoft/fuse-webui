import chalk from 'chalk';
import { createInterface, Interface } from 'readline';

export interface ILogger {
  warn(...args: any[]);
  info(...args: any[]);
  error(...args: any[]);
  verbose(...args: any[]);
}

/**
 * colored logger like console
 */
export class Logger implements ILogger {
  private readlines: Interface;
  constructor() {
    this.readlines = createInterface(process.stdin, process.stdout);
  }

  public warn(...args: any[]) {
    this.writeline(chalk.yellow.apply(null, args));
  }
  public info(...args: any[]) {
    this.writeline(chalk.white.apply(null, args));
  }
  public error(...args: any[]) {
    this.writeline(chalk.red.apply(null, args));
  }
  public verbose(...args: any[]) {
    this.writeline(chalk.gray.apply(null, args));
  }

  private writeline(text: string): void {
    this.readlines.write(`${text}\n`);
  }
}

const logger = new Logger();

export default logger;
