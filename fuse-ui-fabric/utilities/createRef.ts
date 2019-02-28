export interface ComponentRef<T> {
  current: T;
  (val: T): void;
}

export function createRef<T>(): ComponentRef<T> {
  //tslint:disable:no-unnecessary-local-variable
  const f: any = (function (x: T) {
    f.current = x;
  });

  return f;
}
