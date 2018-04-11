export interface CallbackFunc<T> {
  (e: Error, r: T);
}

export type NodeAsyncCall<T> = {
  (callback: CallbackFunc<T>);
} | {
    (arg1: any, callback: CallbackFunc<T>);
  } | {
    (arg1: any, arg2: any, callback: CallbackFunc<T>);
  } | {
    (arg1: any, arg2: any, arg3: any, callback: CallbackFunc<T>);
  } | {
    (arg1: any, arg2: any, arg3: any, arg4: any, callback: CallbackFunc<T>);
  } | {
    (arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, callback: CallbackFunc<T>);
  } | {
    (arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, arg6: any, callback: CallbackFunc<T>);
  } | {
    (arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, arg6: any, arg7: any, callback: CallbackFunc<T>);
  } | {
    (arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, arg6: any, arg7: any, arg8: any, callback: CallbackFunc<T>);
  } | {
    (arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, arg6: any, arg7: any, arg8: any, arg9: any, callback: CallbackFunc<T>);
  };

export async function callbackToPromise<T>(func: NodeAsyncCall<T>, ...args: any[]): Promise<T> {
  return new Promise<any>((res, rej) => {
    const callback = (e: Error, ...results: any[]) => {
      if (e) {
        rej(e);
      } else {
        if (results.length === 0) {
          res();
        } else if (results.length === 1) {
          res(results[0]);
        } else {
          res(results);
        }
      }
    };

    func.apply(null, [...args, callback]);
  });
}
