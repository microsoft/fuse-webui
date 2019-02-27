///<reference types='jasmine'/>
import { createRef } from './createRef';

describe('createRef', () => {
  it('capture ref', () => {
    const ref = createRef<string>();
    ref('foobar');
    expect(ref.current).toBe('foobar');
  });
})
