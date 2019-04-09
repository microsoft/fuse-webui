import {
  AdalAuthContext,
  adalSagas,
  UserResult
} from '@fuselab/ui-adal/lib';
import { getLoggedInUserSucceeded } from '@fuselab/ui-fabric/lib/actions/login';
import { callbackToPromise } from '@fuselab/ui-shared/lib/asyncUtils';
import { all, fork, put, select, takeLatest } from 'redux-saga/effects';
import { ActionNames } from '../actions';
import { Store } from '../store';

function* loginAzure() {
  const authContext: AdalAuthContext = yield select<Store>(s => s.authContext);
  authContext.login();
}

function* getUser() {
  const authContext: AdalAuthContext = yield select<Store>(s => s.authContext);
  try {
    const { userName, profile }: UserResult = yield callbackToPromise<UserResult>(authContext.getUser.bind(authContext));
    yield put(getLoggedInUserSucceeded({ displayName: `${profile.given_name} ${profile.family_name}`, email: profile.email || userName }));
  } catch (ex) {
    // do nothing
  }
}

function* logoutAzure() {
  const authContext: AdalAuthContext = yield select<Store>(s => s.authContext);
  authContext.logOut();
}

function* watchForLogin() {
  yield takeLatest(ActionNames.login.logIn, loginAzure);
}

function* watchForGetUser() {
  yield takeLatest(ActionNames.login.getUser, getUser);
}

function* watchForLogout() {
  yield takeLatest(ActionNames.login.logOut, logoutAzure);
}

function* loginHandlers() {
  yield all([
    fork(watchForLogin),
    fork(watchForGetUser),
    fork(watchForLogout),
    fork(adalSagas)
  ]);
}

export default loginHandlers;
