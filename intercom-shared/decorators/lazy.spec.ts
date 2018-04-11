///<reference types="jasmine"/>

import { lazy } from "./lazy";

class Dummy {
  public innerGet(): number {
    return 42;
  }

  @lazy()
  get answer(): number {
    return this.innerGet();
  }
}

describe("lazy decorator", () => {
  let obj = new Dummy();
  beforeEach(() => {
    spyOn(obj, 'innerGet').and.callThrough();
  });
  it('lazy initialize', () => {
    expect(obj.innerGet).toHaveBeenCalledTimes(0);
    let sum = 0;
    for (var i = 0; i < 10; i++) {
      sum += obj.answer;
    }
    expect(sum).toBe(420);
    expect(obj.innerGet).toHaveBeenCalledTimes(1);
  })
});
