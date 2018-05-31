import { Action } from 'redux';
import { cancel, fork, ForkEffect, take } from 'redux-saga/effects';

function* latestLike(pattern: string, toKey: (action: Action) => string, handler: any): any {
  let map: { [key: string]: any } = {};
  for (; ;) {
    const action = yield take(<any>pattern);
    const key = toKey(action);
    const last = map[key];
    if (last) {
      yield cancel(last);
    }
    map[key] = yield fork(handler, action);
  }
}

export const takeLatestLike = (pattern: string, toKey: (action: any) => string, handler: any): ForkEffect =>
  fork(latestLike, pattern, toKey, handler);
