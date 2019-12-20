import { SpawnOptions } from 'child_process';
import { runInNewContext } from 'vm';

export type CliContext = { maxSuccessCode?: number } & SpawnOptions;
export type CliInvoke = [CliContext, string];

type Cli = (ctx: CliContext, command: string) => Promise<string>;

export type Script = Generator<CliInvoke>;

export const shell = (actor: Cli) => async (script: Script) => {
  let next = script.next();

  while (!next.done) {
    const result = await actor(next.value[0], next.value[1]);
    next = script.next(result);
  }
};

export const recordingShell = (actor: Cli, input: CliInvoke[], output: string[]) => {
  const recordingActor = async (x: CliContext, command: string) => {
    input.push([x, command]);
    const result = await actor(x, command);
    output.push(result);

    return result;
  };

  return shell(recordingActor);
};

export function* fromArray<T>(array: T[]): Generator<T> {
  for (const x of array) {
    yield x;
  }
}

export const playBackShell = (input: CliInvoke[], output: string[]) => {
  let pc = 0;
  const outputStream = fromArray(output);
  const inputStream = fromArray(input);

  const checkActor = async (x: CliContext, command: string) => {
    const nextInput = inputStream.next();
    if (nextInput.done) {
      throw new Error(`pc = ${pc}, out of range`);
    }
    const [_, nextCommand] = nextInput.value;
    if (nextCommand !== command) {
      throw new Error(`${command} not matching ${nextCommand}`);
    }

    pc++;

    return outputStream.next().value;
  };

  return async script => {
    const result = await shell(checkActor)(script);
    if (!outputStream.next().done) {
      throw new Error('output not drained');
    }

    if (!inputStream.next().done) {
      throw new Error('input not drained');
    }

    return result;
  };
};
