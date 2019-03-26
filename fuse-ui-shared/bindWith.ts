
function bindWith<S extends Object, T extends Object>(source: S, ...args: any[]): T {
  const proto = Reflect.getPrototypeOf(source);
  const bindMethod = (cur, key) => {
    const f = source[key];
    if (typeof (f) === 'function') {
      return { ...cur, [key]: f.bind(source, ...args) };
    }

    return cur;
  };

  const methods = Object.keys(proto || []).reduce(
    bindMethod,
    {});

  return {
    ...methods,
    ...Object.keys(source).reduce(
      bindMethod,
      {})
  };
}

export default bindWith;
