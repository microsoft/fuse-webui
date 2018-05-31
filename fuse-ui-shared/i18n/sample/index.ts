import { isLocalized, Localized, LocalizedStrings } from '../index';
import * as Strings from './res/strings';

function* dumpStrings(map: LocalizedStrings): IterableIterator<string> {
  for (const key of Object.keys(map)) {
    const value = map[key];
    if (isLocalized(value)) {
      yield `${key} = ${value.value}`;
    } else {
      yield* dumpStrings(value);
    }
  }
}

export function* checkStrings() {
  yield* dumpStrings(Strings);
}
