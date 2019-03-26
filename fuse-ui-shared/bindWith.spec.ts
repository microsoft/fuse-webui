///<reference types='jasmine'/>
import bindWith from './bindWith'

class Dummy {
  constructor(private name: string) {
    // do nothing
  }

  public greeting(phrases: Map<string, string>) {
    return `${phrases.get('greet')} ${this.name}`;
  }

  public farewell(phrases: Map<string, string>) {
    return `${phrases.get('farewell')} ${this.name}`;
  }
}

describe('bindWith', () => {
  const dummy = {
    add: (x, y) => x + y,
    product: (x, y) => x * y
  };

  const greeter = new Dummy('Joan');

  it('binds arguments', () => {
    const t = <any>bindWith(dummy, 3);
    expect(t.add(4)).toBe(7);
    expect(t.product(4)).toBe(12);
  });

  it('binds methods', () => {
    const t = <any>bindWith(greeter, new Map([['greet', 'Hello'], ['farewell', 'Bye']]));
    expect(t.greeting()).toBe('Hello Joan');
    expect(t.farewell()).toBe('Bye Joan');
  })
});
