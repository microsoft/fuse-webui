/* tslint:disable:no-use-before-declare */
import * as _ from 'underscore';
import { createDeferred } from '../deferred';
import { sleep } from '../sleep';
/* tslint:enable:no-use-before-declare */

export type SequenceType = 'constant' | 'fibonacci' | 'exponential' | 'linear';

export type Delayable = {
  // tslint:disable-next-line:no-reserved-keywords
  type: SequenceType;
  beat?: number;
  maxDuration?: number;
  maxInterval?: number;
  maxIteration?: number;
};

// tslint:disable
/**
 * retry decorator
 *
 * @retry()
 */
export function retry(config: Delayable, canRetry: (e: any) => Promise<boolean>) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // tslint:disable-next-line:no-parameter-reassignment
    descriptor = descriptor || Object.getOwnPropertyDescriptor(target, key);
    const action = descriptor.value;

    descriptor.value = function () {
      const args = _.map(arguments, x => x);
      const _this = this;

      return retryAction(
        function () { // tslint:disable-line
          try {
            return action.apply(_this, args);
          } catch (ex) {
            // ignore error
          }
        },
        canRetry,
        config);
    };

    return descriptor;
  };
}
// tslint:enable

export interface Sequence<T> {
  next(): T;
}

// tslint:disable-next-line:no-reserved-keywords
export function createSequence(type: SequenceType): Sequence<number> {
  switch (type) {
    case 'constant':
      return { next: () => 1 };
    case 'exponential': {
      let prev = 0;

      return {
        next: () => {
          const result = Math.pow(2, prev);
          prev++;

          return result;
        }
      };
    }
    case 'linear': {
      let prev = 0;

      return { next: () => ++prev };
    }
    case 'fibonacci': {
      let prev = 0;
      let cur = 1;

      return {
        next: () => {
          const result = prev + cur;
          prev = cur;
          cur = result;

          return result;
        }
      };
    }
    default:
      throw new Error(`unknown sequence type ${type}`);
  }
}

const _defaultRetryOption: Delayable = {
  type: 'constant',
  beat: 200,
  maxDuration: 120000,
  maxInterval: 30000
};

export async function retryAction<T>(action: () => Promise<T>, canRetry: (e: any) => Promise<boolean>, delay: Delayable) {
  const start = new Date().getTime();
  let { type, beat, maxDuration, maxInterval, maxIteration } = _.extend({}, _defaultRetryOption, delay);
  let sequence = createSequence(type);
  let invokeCount = 0;

  return repeat(action, canRetry, async () => {
    const now = new Date().getTime();
    invokeCount++;
    const duration = now - start;
    if (maxIteration > 0 && invokeCount >= maxIteration) {
      throw new Error(`exceeded maxIteration ${maxIteration}`);
    }
    let waitDuration = sequence.next() * beat;
    if (maxInterval > 0) {
      waitDuration = Math.min(maxInterval, waitDuration);
    }
    if (maxDuration > 0 && duration + waitDuration > maxDuration) {
      throw new Error(`exceeded maxDuration ${maxDuration}`);
    }
    await sleep(waitDuration);
  });
}

/**
 * repeat action until it resolves to promise
 * @param action async action that returns a Promise<T>
 * @param canRetry when action rejects with err, check if the error can be retried
 * @param wait wait before issue the next repeat
 */
export async function repeat<T>(action: () => Promise<T>, canRetry: (v: any) => Promise<boolean>, wait: () => Promise<void>): Promise<T> {
  const result = createDeferred<T>();

  const inner = async () => {
    try {
      const x = await action();
      result.resolve(x);
    } catch (innerError) {
      if (await canRetry(innerError)) {
        try {
          await wait();
          //tslint:disable-next-line:no-floating-promises
          inner();
        } catch (waitError) {
          result.reject(waitError);
        }
      } else {
        result.reject(innerError);
      }
    }
  };

  //tslint:disable-next-line:no-floating-promises
  inner();

  return result.promise;
}
