///<reference types="jasmine"/>

import { debounce } from "./debounce";
import { sleep } from '../sleep';

class Dummy {
  constructor(public count: number = 0) {

  }
  innerAction(): number {
    return this.count++;
  }

  @debounce(100)
  increment(): number {
    return this.innerAction();
  }
}

describe("debounce decorator", () => {
  let obj = new Dummy();
  beforeEach(async (done) => {
    spyOn(obj, 'innerAction').and.callThrough();
    // call increment 10 times quickly
    for (var i = 0; i < 10; i++) {
      let x = obj.increment();
    }
    await sleep(200);
    // call increment 10 times quickly
    for (var i = 0; i < 10; i++) {
      let x = obj.increment();
    }
    done();
  });

  it('debounce action', () => {
    expect(obj.innerAction).toHaveBeenCalledTimes(2);
    expect(obj.count).toBe(2);
  })
});
