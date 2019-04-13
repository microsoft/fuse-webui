///<reference types='jasmine'/>
import { layoutStack } from './splittable';

describe('stackable layout', () => {
  it('distribute delta', () => {
    expect(layoutStack(100, [0, 0], 0, 0)).toEqual([50, 50]);
    expect(layoutStack(100, [40, 40, 0], 1, 10)).toEqual([40, 50, 10]);
    expect(layoutStack(100, [40, 40, 0], 1, -10)).toEqual([40, 30, 30]);
    expect(layoutStack(100, [40, 40, 0], 1, -50)).toEqual([40, 0, 60]);
  })
})
