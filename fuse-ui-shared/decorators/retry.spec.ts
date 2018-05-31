///<reference types="jasmine"/>
// tslint:disable
import * as _ from "underscore";
import { repeat, createSequence, retryAction, retry } from "./retry";
import { createDeferred } from "../deferred"
import { sleep } from "../sleep";

let invokeCount = 0;
function failFirst(): Promise<boolean> {
  const result = createDeferred<boolean>();
  invokeCount++;
  if (invokeCount < 3) {
    result.reject('try again');
  } else {
    result.resolve(true);
  }
  return result.promise;
}


describe('repeat function', () => {
  beforeEach(async done => {
    await repeat(failFirst, () => Promise.resolve(true), async () => {
      await sleep(10);
    });
    done();
  });

  afterAll(done => {
    invokeCount = 0;
    done();
  })

  it('try 3 times before success', () => {
    expect(invokeCount).toBe(3);
  })
});

describe('constant sequence function', () => {
  it('has constant sequence', () => {
    const seq = createSequence('constant');
    const result = _.range(0, 3).map(() => seq.next());
    expect(result).toEqual([1, 1, 1])
  });
  it('has exponential sequence', () => {
    const seq = createSequence('exponential');
    const result = _.range(0, 4).map(() => seq.next());
    expect(result).toEqual([1, 2, 4, 8])
  });
  it('has fibonacci sequence', () => {
    const seq = createSequence('fibonacci');
    const result = _.range(0, 5).map(() => seq.next());
    expect(result).toEqual([1, 2, 3, 5, 8]);
  });
  it('has linear sequnce', () => {
    const seq = createSequence('linear');
    const result = _.range(0, 6).map(() => seq.next());
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });
});


describe('retry error cases', () => {
  let err: Error;
  beforeEach(async done => {
    try {
      await retryAction(failFirst, () => Promise.resolve(true), {
        type: 'constant',
        maxIteration: 2
      });
    }
    catch (ex) {
      err = ex;
    }
    done();
  });

  afterAll(done => {
    invokeCount = 0;
    done();
  });

  it('fails with maxIteration set to 2', () => {
    expect(err.message).toBe('exceeded maxIteration 2');
  });
});


describe('retry error cases', () => {
  let err: Error;
  beforeEach(async done => {
    try {
      await retryAction(failFirst, () => Promise.resolve(true), {
        maxDuration: 1000,
        type: 'exponential',
        beat: 550
      })
    } catch (ex) {
      err = ex;
    }
    done();
  });
  afterAll(done => {
    invokeCount = 0;
    done();
  });
  it('fails with maxDuration set 2000', () => {
    expect(err.message).toBe('exceeded maxDuration 1000');
  })
});


class Dummy {
  private clock = createSequence('linear');
  constructor(private trigger: number) {
  }

  innerToggle(password: string): Promise<boolean> {
    let tick = 0;
    tick = this.clock.next();
    if (tick >= this.trigger) {
      if (password === 'sesame') {
        return Promise.resolve(true);
      }
      return Promise.reject('wrong password');
    }
    return Promise.reject('not yet');
  }

  @retry({
    type: 'constant'
  }, () => Promise.resolve(true))
  tryToggle(password: string): Promise<boolean> {
    console.log('tryToggle called')
    return this.innerToggle(password);
  }
}

describe('retry decorator', () => {
  const dummy = new Dummy(5);
  beforeEach(async done => {
    spyOn(dummy, 'innerToggle').and.callThrough();
    await dummy.tryToggle('sesame');
    done();
  });

  it('retried 5 times', function () {
    expect(dummy.innerToggle).toHaveBeenCalledTimes(5);
  });
})
