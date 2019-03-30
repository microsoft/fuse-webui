///<reference types='jasmine'/>
import { compose, mixin } from './typeHelpers'

interface Dummy {
  name: string;
  echo(x: string): string;
  greet(): string;
  age(): number;
}

describe('type helpers', () => {
  it('composes', () => {
    const f = compose((x, y) => x + y, x => x * x);
    expect(f(3, 3)).toBe(36);
  });

  it('mixin', () => {
    const dummy: Dummy = {
      name: 'foo',
      echo: x => x,
      greet: () => 'foo',
      age: () => 42
    };

    expect(dummy.greet()).toBe('foo');
    const mixed = mixin<Dummy, string>(dummy, x => `Hi ${x}`, 'echo');
    expect(mixed.greet()).toBe('foo');
    expect(mixed.echo('test')).toBe('Hi test');
    expect(mixed.name).toBe('foo');
    expect(mixed.age()).toBe(42);
  })
})
