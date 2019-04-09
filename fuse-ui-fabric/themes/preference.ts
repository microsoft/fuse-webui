import { parseCookie } from '@fuselab/ui-shared/lib';
import { Preference } from './themes.types';

const defaultPreference: Preference = { compact: false, theme: 'light' };

export function loadPreference(): Preference {
  // tslint:disable:no-cookies
  let preferenceJSON = parseCookie(document.cookie).preference || JSON.stringify(defaultPreference);

  return JSON.parse(preferenceJSON);
}
