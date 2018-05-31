/**
 * cache decorator
 *
 * property decorator that will cache the result for specific time
 */
let objectMap: WeakMap<object, number> = new WeakMap();
let nextObjId = 0;
let expireMap: { [key: string]: Date } = {};
let valueMap: { [key: string]: any } = {};

function getObjectKey(obj: object): string {
  let key = objectMap.get(obj);
  if (!key) {
    objectMap.set(obj, ++nextObjId);
    key = nextObjId;
  }

  return `${key}`;
}

function getCacheKey(obj: object, name: string) {
  return `${getObjectKey(obj)}_${name}`;
}

function isCacheValid(obj: object, name: string): boolean {
  let expires = expireMap[getCacheKey(obj, name)];

  return expires && expires > new Date();
}

function nextExpire(delay: number): Date {
  return new Date(new Date().valueOf() + delay);
}

function getCachedValue(obj: object, key: string, inner: Function, expiry: number): any {
  const cacheKey = getCacheKey(obj, key);
  if (isCacheValid(obj, key)) {
    return valueMap[getCacheKey(obj, key)];
  }
  let val = inner.apply(obj);
  expireMap[cacheKey] = nextExpire(expiry);
  valueMap[cacheKey] = val;

  return val;
}

function setCacheValue(obj: object, key: string, val: any, inner: Function, expiry: number) {
  const cacheKey = getCacheKey(obj, key);
  if (inner) {
    inner.call(obj, val);
  } else {
    Object.defineProperty(obj, key, Object.assign(Object.getOwnPropertyDescriptor(obj, key), { value: val }));
  }
  expireMap[cacheKey] = nextExpire(expiry);
  valueMap[cacheKey] = val;
}

// tslint:disable:no-invalid-this
// tslint:disable:no-function-expression
export function cache(time: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let innerGet = descriptor.get;
    if (typeof innerGet === 'function') {
      let outter = function () {
        return getCachedValue(this, propertyKey, innerGet, time);
      };
      descriptor.get = outter;
    }
    if (descriptor.set) {
      let innerSet = descriptor.set;
      descriptor.set = function (val) {
        setCacheValue(this, propertyKey, val, innerSet, time);
      };
    }

    return descriptor;
  };
}
