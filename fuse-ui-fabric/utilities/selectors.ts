export function* ancestors(element: HTMLElement): IterableIterator<HTMLElement> {
  let cur = element.parentElement;
  while (cur) {
    yield cur;
    cur = cur.parentElement;
  }
}

export function closest(element: HTMLElement, sel: string): HTMLElement {
  for (const cur of ancestors(element)) {
    const m = cur.querySelector(sel);
    if (m) {
      return <any>m;
    }
  }

  return null;
}
