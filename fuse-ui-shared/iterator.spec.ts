///<reference types='jasmine'/>
import { filter, first, last, map, reduce } from './iterator';

function* fib10(): IterableIterator<number> {
  let prev = 0;
  let cur = 1;
  for (let i = 0; i < 10; i++) {
    yield cur;
    const next = cur + prev;
    prev = cur;
    cur = next;
  }
}

// 1, 1, 2, 3, 5, 8, 13, 21, 34, 55
describe('iterator helpers', () => {
  it('first', () => {
    expect(first(fib10())).toBe(1);
  });

  it('last', () => {
    expect(last(fib10())).toBe(55);
  });

  it('filters', () => {
    const evens = filter(fib10(), x => x % 2 === 0);
    expect(Array.from(evens)).toEqual([2, 8, 34]);
  });

  it('maps', () => {
    const digits = map(fib10(), x => Math.floor(x / 10));
    expect(Array.from(digits)).toEqual([0, 0, 0, 0, 0, 0, 1, 2, 3, 5]);
  })

  it('reduces', () => {
    const evenSums = reduce(filter(fib10(), x => x % 2 === 0), (s, x) => s + x, 0);
    expect(evenSums).toBe(44);
  });
});
