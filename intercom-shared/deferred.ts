export type Deferred<T> = {
  promise: Promise<T>;
  resolve(x: T): void;
  reject(r: any): void;
};

export function createDeferred<T>(): Deferred<T> {
  let resolve: (x: T) => void;
  let reject: (r: any) => void;
  // tslint:disable-next-line:promise-must-complete
  let promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}
