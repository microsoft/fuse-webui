export const composeAsync = <U, V, Act extends AsyncAction<U>> (outer: (x: U) => Promise<V>, inner: Act) => async (...args: Parameters<Act>) => {
    const u = await inner.apply(null, args);

    return outer(u);
};

const endMarker = Symbol('memoAsync_end_marker');

type ValueType = string | number | boolean | symbol;
type Traversable<T> = T | { [key: string ]: Traversable<T> };

function traverseGet<T>(ctx: Traversable<T>, ...args: string[]): T {
  return args.reduce((cur: any, key) => cur ? cur[key] : undefined, ctx);
}

function traverseSet<T>(ctx: Traversable<T>, val: any, ...args: string[]) {
  const length = args.length;
  const last = args[length - 1];
  const ancestors = args.slice(0, -1);
  const parent = ancestors.reduce(
    (cur: any, key) => {
      if (!cur[key]) {
        cur[key] = {};
      }

      return cur[key];
    },
    ctx);

  parent[last] = val;
}

let mem = {};

export const memoAsync = <T extends (...args: ValueType[]) => Promise<U>, U> (x: T) => {
    const funcMarker = Symbol();

    return async (...args: Parameters<T>) => {
        const fullArgs = [funcMarker, ...args, endMarker];

        let val = traverseGet.apply(null, [mem, ...fullArgs]);

        if (val !== undefined) {
            return val;
        }

        val = await x.apply(null, args);
        traverseSet.apply(null, [mem, val, ...fullArgs]);

        return val;
    };
};

export const flushMemo = () => mem = {};

export type AsyncAction<T> = (...args: any[]) => Promise<T>;

export const wrapAsync = <Ctx, T, Act extends AsyncAction<T>>
     (enter : AsyncAction<Ctx>) => (act: AsyncAction<T>) => (exit: (ctx: Ctx) => Promise<void>) => async (...args: Parameters<Act>) => {
    const ctx = await enter();
    try {
        return await act.apply(null, args);
    } finally {
        await exit(ctx);
    }
};
