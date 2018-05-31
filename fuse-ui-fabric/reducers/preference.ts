import { ActionNames } from '../actions';
import { ThemeAction } from '../actions/theme';
import { Preference } from '../themes';

export const preference = (state: Preference = { compact: false, theme: 'light' }, action: ThemeAction) => {
  if (action.type === ActionNames.theme.update) {
    if (action.key === 'compact') {
      return { ...state, compact: action.val };
    }
    if (action.key === 'theme') {
      return { ...state, theme: action.val };
    }
  }

  return state;
};
