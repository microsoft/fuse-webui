import logger from './logger';

/**
 * wrap async command handler to support yargs commandsDir
 */
function handlerPromise<T>(inner: (...args: any[]) => Promise<T>): Function {
  return (...args: any[]) => {
    inner.apply(null, args).then(
      x => {
        logger.info(`command output is ${JSON.stringify(x, null, 2)}`);
        process.exit(0);
      },
      err => {
        logger.warn(`command failed with ${JSON.stringify(err, null, 2)}`);
        process.exit(1);
      }
    );
  };
}

export default handlerPromise;
