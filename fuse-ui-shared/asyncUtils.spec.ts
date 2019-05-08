///<reference types='jasmine'/>
import * as _ from 'underscore';
import { whenAll } from './asyncUtils';

describe('whenAll', () => {
  it('chunk All', async () => {
    const payload = _.range(0, 10);
    const results = await whenAll(payload, x => Promise.resolve(x * 2), 3);
    expect(results).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
  });
});
