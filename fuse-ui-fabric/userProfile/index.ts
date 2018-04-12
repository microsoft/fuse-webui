
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { login, logout, updateTheme } from '../actions';
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
      dispatch(login(history));
    },
    logOut: (user: UserInfo) => {
      dispatch(logout(user));
    },
    switchTheme: (val) => {
      dispatch(updateTheme('theme', val));
    },
    toggleCompact: (val) => {
      dispatch(updateTheme('compact', val));
    }
  };
}

export const User = connect(mapStateToProps, mapDispatchToProps)(UserProfile);
