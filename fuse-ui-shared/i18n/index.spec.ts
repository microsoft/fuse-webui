///<reference types='jasmine'/>
import { __ } from './index';

describe('i18n utilities', () => {
  it('takes arguments', () => {
    expect(__('hello {0} {1}', 'world', 'now')).toBe('hello world now');
    expect(__('hello {0} + {1} = {2}', 2, 3, 5)).toBe('hello 2 + 3 = 5');
    expect(__('{0} should be NaN', NaN)).toBe('NaN should be NaN');

    const date = new Date("2018-05-06T18:12:00Z");
    expect(__('date time {0}', date)).toBe('date time 2018-05-06T18:12:00.000Z');
  })
})
