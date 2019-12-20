export function* ancestors(element: HTMLElement): IterableIterator<HTMLElement> {
  let cur = element.parentElement;
  while (cur) {
    yield cur;
    cur = cur.parentElement;
  }
}

export function closest(element: HTMLElement, sel: string): HTMLElement {
  const a = ancestors(element);
  let iter = a.next();

  while (!iter.done) {
    const cur = iter.value;
    const m = cur.querySelector(sel);
    if (m) {
      return m;
    }
    iter = a.next();
  }

  return null;
}
