export type FilterTypeBy<T, Condition> = {
  [k in keyof T]: T[k] extends Condition ? k : never;
};

export type FilterMemberNames<T, Condition> = FilterTypeBy<T, Condition>[keyof T];

export type SubType<T, Condition> = Pick<T, FilterMemberNames<T, Condition>>;

export type Methods<T> = SubType<T, Function>;

export type Func<A> = (...args: any[]) => A;

export type AsyncAction = Func<Promise<any>>;

export type AsyncMethods<T> = SubType<T, AsyncAction>;

export function compose<A>(...funcs: Func<A>[]): Func<A> {
  return (...args: any[]) => funcs.reduce(
    (cur, func) => ([func.apply(null, cur)]),
    args)
  [0];
}

export function mixin<T, A>(instance: T, mixer: (A) => A, ...keys: FilterMemberNames<T, Func<A>>[]): T {
  const filter = (x: keyof T) => keys.indexOf(<any>x) >= 0;

  return <T>Object.keys(instance).reduce(
    (cur, key: keyof T) => {
      const val = instance[key];

      return {
        ...cur,
        [key]: filter(key) ? compose(<any>val, mixer) : val
      };
    },
    {});
}
