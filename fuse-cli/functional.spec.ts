///<reference types='jasmine'/>
import * as _ from 'underscore';
import { AsyncAction, composeAsync, flushMemo, memoAsync, wrapAsync } from './functional';

describe('functional async', async () => {
    it('compose async', async() => {
        const t  = composeAsync(
            async (x: number) => {
                const line = _.range(0, x).reduce(cur => `${cur}+`, '');

                return Promise.resolve(line);
            },
            async (arg1: number, arg2 : number) => Promise.resolve<number>(arg1 + arg2));

        const text = await t(3, 4);
        expect(text).toBe('+++++++');
    });

    it('remember calls', async() => {
        const dice = {
            //tslint:disable-next-line:insecure-random
            roll: async (x: number) => Promise.resolve(Math.round(Math.random() * x)),
            greet: async (name: string) => Promise.resolve(`Hello ${name}`)
        };
        spyOn(dice, 'roll').and.callThrough();
        spyOn(dice, 'greet').and.callThrough();

        const roller = memoAsync(dice.roll.bind(dice));
        const greeter = memoAsync(dice.greet.bind(dice));
        const val = await roller(8);

        for (let i = 0; i < 10; i++) {
            const next = await roller(8);
            expect(next).toBe(val);
            expect(await greeter('John')).toBe('Hello John');
            expect(await greeter('Tom')).toBe('Hello Tom');
        }

        expect(dice.roll).toHaveBeenCalledTimes(1);
        expect(dice.greet).toHaveBeenCalledTimes(2);

        flushMemo();

        for (let i = 0; i < 10; i++) {
            await roller(6);
        }

        expect(dice.roll).toHaveBeenCalledTimes(2);
    });

    it('wraps action', async() => {
        const watcher = {
            enter: async (x: string) => Promise.resolve(x),
            exit: async (x: string) => Promise.resolve(x)
        };
        spyOn(watcher, 'enter').and.callThrough();
        spyOn(watcher, 'exit').and.callThrough();

        const t = wrapAsync<string, void, AsyncAction<void>>(watcher.enter.bind(watcher, 'foobar'))(
            async () => {
                expect(watcher.enter).toHaveBeenCalledTimes(1);
                expect(watcher.exit).toHaveBeenCalledTimes(0);

                return Promise.resolve();
            })(watcher.exit.bind(watcher));

        await t();

        expect(watcher.exit).toHaveBeenCalledTimes(1);
        expect(watcher.enter).toHaveBeenCalledWith('foobar');
        expect(watcher.exit).toHaveBeenCalledWith('foobar');
    });
});
