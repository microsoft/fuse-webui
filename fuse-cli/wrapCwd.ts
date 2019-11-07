import { existsSync, mkdirSync } from 'fs';
import { AsyncAction, wrapAsync } from './functional';

export const wrapCwd = <T, Act extends AsyncAction<T>>(cwd: string) => (action: Act) =>
  wrapAsync<string, T, Act>(async () => {
    const prev = process.cwd();
    if (!existsSync(cwd)) {
      mkdirSync(cwd);
    }
    process.chdir(cwd);

    return Promise.resolve(prev);
  })(action)(async (prev: string) => {
    process.chdir(prev);

    return Promise.resolve();
  });

export const wrapActionCwd = cwd => (action: AsyncAction<void>) => wrapCwd<void, AsyncAction<void>>(cwd)(action);
