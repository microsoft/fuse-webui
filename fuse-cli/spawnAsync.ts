import { spawn, SpawnOptions } from 'child_process';
import { Writable } from 'stream';
import logger from './logger';

async function spawnAsync(
  options: SpawnOptions & { maxSuccessCode?: number },
  cmd: string,
  ...args: string[]
): Promise<string> {
  return new Promise((res, rej) => {
    const cwd = (options ? options.cwd : null) || process.cwd();
    const mask = options.maxSuccessCode > 0 ? options.maxSuccessCode : 0;
    const prompt = `${cwd}[${mask}]`;
    logger.info(`${prompt}>${cmd} ${args.join(' ')}`);
    const proc = spawn(cmd, args, { shell: true, ...options, stdio: ['pipe', 'pipe', 'pipe'] });
    const chunks: (Buffer | string)[] = [];
    const output = new Writable({
      write: (chunk, encoding, cb) => {
        logger.info(chunk);
        chunks.push(chunk);
        cb(null);
      }
    });
    proc.stdout.pipe(output);
    proc.stderr.pipe(output);

    proc.on('exit', (code, signal) => {
      if (code === 0 || code <= mask) {
        res(chunks.map(chunk => (typeof chunk === 'string' ? chunk : chunk.toString())).join(''));
      } else {
        logger.error(`failed with exitCode = ${code} and  mask = ${mask}`);
        rej(new Error(signal));
      }
    });
  });
}

export default spawnAsync;
