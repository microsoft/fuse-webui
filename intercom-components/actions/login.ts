
import { History } from 'history';
import { UserInfo } from '../userProfile';
import { ErrorAction } from './action.types';

export enum Actions {
  logIn = 'login.logIn',
  logOut = 'login.logOut',
  error = 'login.error',
  getUser = 'login.getUser',
  getUserResult = 'login.getUserResult',
  setAccessToken = 'login.setAccessToken'
}

//tslint:disable:no-reserved-keywords
export interface LoginAction extends ErrorAction {
  type: Actions.logIn;
  history: History;
}

export interface LogoutAction extends ErrorAction {
  type: Actions.logOut;
  user?: UserInfo;
}

export interface GetLoggedInUser extends ErrorAction {
  type: Actions.getUser;
}

export interface GetLoggedInUserSucceeded {
  type: Actions.getUserResult;
  user: UserInfo;
}

export interface SetAccessTokenAction {
  type: Actions.setAccessToken;
  token: string;
}

export type LoginActions = LoginAction | LogoutAction |
  GetLoggedInUser | GetLoggedInUserSucceeded |
  SetAccessTokenAction;
