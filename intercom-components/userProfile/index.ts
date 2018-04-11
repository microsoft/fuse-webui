
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionNames } from '../actions';
import { BaseStore } from '../models';
import { UserProfile, UserProfileActions, UserProfileAttributes } from './userProfile';
export * from './userProfile';
import { UserInfo } from './userProfile.types';
export * from './userProfile.types';

function mapStateToProps(state: BaseStore): UserProfileAttributes {
  return {
    loggedIn: !!state.user,
    userInfo: state.user,
    ...state.preference
  };
}

function mapDispatchToProps(dispatch: Dispatch<BaseStore>): UserProfileActions {
  return {
    logIn: history => {
      dispatch({ type: ActionNames.login.logIn, history });
    },
    logOut: (user: UserInfo) => {
      dispatch({ type: ActionNames.login.logOut, user });
    },
    switchTheme: (val) => {
      dispatch({ type: ActionNames.theme.update, key: 'theme', val });
    },
    toggleCompact: (val) => {
      dispatch({ type: ActionNames.theme.update, key: 'compact', val });
    }
  };
}

export const User = connect(mapStateToProps, mapDispatchToProps)(UserProfile);
