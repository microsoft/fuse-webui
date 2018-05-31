import { Preference } from '../themes';
export enum ThemeActions {
  update = 'theme.update'
}

// tslint:disable:no-reserved-keywords
export interface ThemeAction {
  type: ThemeActions.update;
  key: keyof Preference;
  val: any;
}

export function updateTheme(key: keyof Preference, val: any): ThemeAction {
  return {
    type: ThemeActions.update,
    key,
    val
  };
}
