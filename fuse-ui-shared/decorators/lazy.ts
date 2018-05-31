/**
 * lazy decorator
 *
 * @lazy()
 * get prop() : T {
 *   // code to create the return type and then once
 *   // created it is cached for future invocations
 * }
 */
export function lazy() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let { configurable, enumerable, writable } = descriptor;
    let innerGet = descriptor.get;
    if (typeof innerGet === 'function') {
      let getter = function () {
        // tslint:disable-next-line:no-invalid-this
        let val = innerGet.apply(this);
        // tslint:disable-next-line:no-invalid-this
        Object.defineProperty(this, propertyKey, {
          configurable, enumerable, writable, value: val
        });

        return val;
      };
      descriptor.get = getter;
    }

    return descriptor;
  };
}
