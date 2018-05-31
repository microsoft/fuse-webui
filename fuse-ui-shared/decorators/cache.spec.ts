///<reference types="jasmine"/>
import { sleep } from '../sleep';
import { cache } from './cache';

class Dummy {
  constructor(public count: number = 0) {

  }

  increment(): number {
    return this.count++;
  }

  @cache(100)
  get latest(): number {
    return this.increment();
  }

  set latest(val: number) {
    this.count = val;
  }
}

describe('cache decorator', () => {
  let obj = new Dummy();
  let obj2 = new Dummy(42);

  let preSetValue: number;
  let midSetValue: number;
  let postSetValue: number;

  beforeEach(async done => {
    spyOn(obj, 'increment').and.callThrough();
    for (let i = 0; i < 10; i++) {
      preSetValue = obj.latest;
      let t = obj2.latest;
    }
    obj.latest = 6;
    midSetValue = obj.latest;
    await sleep(120);
    for (let i = 0; i < 10; i++) {
      postSetValue = obj.latest;
    }
    done();
  });

  it('caches last result', () => {
    expect(preSetValue).toBe(0);
    expect(midSetValue).toBe(6);
    expect(postSetValue).toBe(6);
    expect(obj.increment).toHaveBeenCalledTimes(2);
    expect(obj.count).toBe(7);
    expect(obj2.count).toBe(43);
  })

})
