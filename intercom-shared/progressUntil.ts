import { Action } from 'redux';
import { call, race, take } from 'redux-saga/effects';

export enum ActionNames {
  watch = 'progress.watch',
  unwatch = 'progress.unwatch'
}

//tslint:disable:no-reserved-keywords
export interface WatchProgress {
  type: ActionNames.watch;
  pattern: string;
  onProgress(action: Action);
}

export interface UnwatchProgress {
  type: ActionNames.unwatch;
  pattern: string;
}

function* waitFor(pattern: string) {
  return yield take(pattern);
}

function* waitForOnly(pattern: string, filter: (x: Action) => boolean) {
  for (; ;) {
    const action = yield take(pattern);
    if (filter(action)) {
      break;
    }
  }
}

export function* progressUntil(action: WatchProgress): any {
  const { progress } = yield race({
    progress: call(waitFor, action.pattern),
    unwatch: call(waitForOnly, ActionNames.unwatch, x => x.pattern === action.pattern)
  });

  if (progress) {
    action.onProgress(progress);
  }
}
