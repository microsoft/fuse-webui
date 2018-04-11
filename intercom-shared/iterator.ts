export function last<T>(seq: Iterator<T>): T | undefined {
  let result;
  let iter = seq.next();

  while (!iter.done) {
    result = iter.value;
    iter = seq.next();
  }

  return result;
}

export function first<T>(seq: Iterator<T>): T | undefined {
  let iter = seq.next();

  return iter.done ? undefined : iter.value;
}

export function* map<F, T>(src: IterableIterator<F>, f: (x: F) => T) {
  for (let x of src) {
    yield f(x);
  }
}

export function reduce<F, T>(src: IterableIterator<F>, r: (c: T, x: F) => T, s: T): T {
  let result = s;
  for (let x of src) {
    result = r(result, x);
  }

  return result;
}

export function* filter<T>(src: IterableIterator<T>, f: (x: T) => boolean) {
  for (let x of src) {
    if (f(x)) {
      yield x;
    }
  }
}
