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

export function* skip<T>(seq: Iterator<T>, n: number): IterableIterator<T> {
  let i = 0;
  let iter = seq.next();

  while (!iter.done) {
    if (i >= n) {
      yield iter.value;
    }
    iter = seq.next();
    i++;
  }
}

export function* take<T>(seq: Iterator<T>, n: number): IterableIterator<T> {
  let i = 0;
  let iter = seq.next();

  while (!iter.done) {
    if (i >= n) {
      break;
    }
    yield iter.value;
    iter = seq.next();
    i++;
  }
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

export function asArray<T>(src: IterableIterator<T>): T[] {
  let result = [];
  for (const e of src) {
    result.push(e);
  }

  return result;
}

export function* reverse<T>(src: IterableIterator<T>): IterableIterator<T> {
  const arr = asArray(src);
  const reversed = arr.reverse();

  for (const e of reversed) {
    yield e;
  }
}

export function* asIter<T>(a: T[]) {
  for (const v of a) {
    yield v;
  }
}

export function* chunks<T>(src: IterableIterator<T>, chunkSize: number): IterableIterator<IterableIterator<T>> {
  let chunk = [];
  for (const v of src) {
    chunk.push(v);
    if (chunk.length === chunkSize) {
      yield asIter(chunk);
      chunk = [];
    }
  }
  if (chunk.length) {
    yield asIter(chunk);
  }
}
