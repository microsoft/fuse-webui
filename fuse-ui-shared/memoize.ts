export type Traversable<T> = T | { [key: string]: Traversable<T> };
export type ValueArg = string | number | Symbol;

function traverseGet<T>(ctx: Traversable<T>, ...args: string[]) : T {
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

const endMarker = Symbol('memoize-end-marker');
export function memoize<T>(memory: Traversable<T>, func: (...args: ValueArg[]) => T) : (...args: ValueArg[]) => T {
    const marker = Symbol();

    return (...args: ValueArg[]) => {
        const prev: T = traverseGet.call(null, memory, marker, ...args, endMarker);
        if (prev !== undefined) {
            return prev;
        }
        const result: T = func.call(null, ...args);
        traverseSet.call(null, memory, result, marker, ...args, endMarker);

        return result;
    };
}
