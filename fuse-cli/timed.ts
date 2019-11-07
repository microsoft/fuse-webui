import { AsyncAction, wrapAsync } from './functional';
import logger from './logger';

const timed = <T, Act extends AsyncAction<T>> (message: string) => (action: Act) => wrapAsync<number, T, Act>(
    async () => {
        const start = new Date().valueOf();
        logger.info(`${message} started`);

        return Promise.resolve(start);
    })
    (action)
    (async (start: number) => {
        const end = new Date().valueOf();
        logger.info(`${message} ended in ${end - start}ms`);

        return Promise.resolve();
    });

export default timed;
