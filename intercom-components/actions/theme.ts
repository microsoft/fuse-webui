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
