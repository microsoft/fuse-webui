import { ActionNames } from '@fuselab/ui-fabric/actions';
import { GetLoggedInUser, LoginAction, LogoutAction, SetAccessTokenAction } from '@fuselab/ui-fabric/actions/login';
import { BaseStore } from '@fuselab/ui-fabric/models';
import { UserInfo } from '@fuselab/ui-fabric/userProfile';
import { isLocalhost, sleep } from '@fuselab/ui-shared';
import { all, call, fork, put, race, select, take, takeLatest } from 'redux-saga/effects';
declare const BASENAME: string;

const intercomTokenName = 'intercom-token';
const bfAuthCookieHeaderName = 'x-bf-auth-cookie';

function* checkLogin(action: LoginAction) {
  if (isLocalhost()) {
    const token = sessionStorage.getItem(intercomTokenName);
    if (token) {
      yield put({ type: ActionNames.login.setAccessToken, token });
    } else {
      yield call(action.history.push, { pathname: '/login' });
    }
  }
}

function* getSignedUser(action: GetLoggedInUser) {
  let user: UserInfo = null;
  try {
    const authData = { EmailAddress: 'user@mock.com', FirstName: 'Joe' };
    user = {
      email: authData.EmailAddress,
      displayName: authData.FirstName
    };
  } catch (error) {
    yield logoutUser({ type: ActionNames.login.logOut, user });
    user = null;
  }

  if (user) {
    yield fork(refreshUserToken);
    yield put({ type: ActionNames.login.getUserResult, user });
  }
}

function* loginUser(tokenAction: SetAccessTokenAction) {
  const { token } = tokenAction;
  try {
    sessionStorage.setItem(intercomTokenName, token);
    const { SelfToken, AuthCookie } = JSON.parse(token);
    //ajaxHeaders.Authorization = `Bearer ${SelfToken}`;
    //ajaxHeaders[bfAuthCookieHeaderName] = AuthCookie;
    yield put({ type: ActionNames.login.getUser });
    yield take(ActionNames.login.getUserResult);
  } catch (error) {
    sessionStorage.removeItem(intercomTokenName);
    yield put({ type: ActionNames.login.error, error });
  }
}

function* logoutUser(action: LogoutAction) {
  if (isLocalhost()) {
    sessionStorage.removeItem(intercomTokenName);
  } else {
    if (action.user) {
      window.location.href = `/identity/signout?postLogoutRedirectUri=${encodeURIComponent(BASENAME)}`;
    }
  }
}

function* refreshUserToken() {
  const interval = 600000;
  // use shorter interval below to debug
  //const interval = 30000;
  const { logout } = yield race({
    timeout: call(sleep, interval),
    logout: take(ActionNames.login.logOut)
  });

  if (!logout) {
    // refresh our token
    //const token = yield call(AccountClient.refreshToken);
    yield put({ type: ActionNames.login.getUser });
    yield take(ActionNames.login.getUserResult);
    yield true;
  }

  yield false;
}

export function* requireUserSignedIn() {
  const user = yield select<BaseStore>(x => x.user);
  if (!user) {
    try {
      if (isLocalhost()) {
        const token = sessionStorage.getItem(intercomTokenName);
        if (!token) {
          const setAccessToken = yield take(ActionNames.login.setAccessToken);
          yield loginUser(setAccessToken);
        } else {
          yield loginUser({ type: ActionNames.login.setAccessToken, token });
        }
      } else {
        yield put({ type: ActionNames.login.logIn });
      }
    } catch (error) {
      yield put({ type: ActionNames.login.error, error });
      yield put({ type: ActionNames.login.logOut });

      return false;
    }
  }

  return true;
}

function* watchLogin() {
  yield takeLatest(ActionNames.login.logIn, checkLogin);
}

function* watchLogout() {
  yield takeLatest(ActionNames.login.logOut, logoutUser);
}

function* watchUser() {
  yield takeLatest(ActionNames.login.getUser, getSignedUser);
}

function* watchAccessToken() {
  yield takeLatest(ActionNames.login.setAccessToken, loginUser);
}

export function* handleLogin() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchAccessToken),
    fork(watchUser)
  ]);
}
