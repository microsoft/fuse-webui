import { ActionNames } from '../actions';
import { LoginActions } from '../actions/login';
import { UserInfo } from '../userProfile';

export function user(state: UserInfo = null, action: LoginActions): UserInfo {
  if (action.type === ActionNames.login.logOut) {
    return null;
  }

  if (action.type === ActionNames.login.getUserResult) {
    return action.user;
  }

  return state;
}
