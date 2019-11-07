///<reference types='jasmine'/>
import * as _ from 'underscore';
import logger from './logger';
import timed from './timed';

describe('timed', async () => {
    it('keeps time', async () => {
        spyOn(logger, 'info').and.callThrough();
        await timed('foo')(async () => new Promise((res: Function, rej: Function) => {
            setTimeout(res, 200);
        }))();

        expect((<any>logger).info.calls.argsFor(0)[0]).toBe('foo started');
        const prefix = 'foo ended in ';
        const end : string = (<any>logger).info.calls.argsFor(1)[0];
        const delay = parseInt(end.substr(prefix.length), 10);
        expect(end.startsWith(prefix)).toBe(true);
        expect(delay >= 200).toBe(true);
    });
});
