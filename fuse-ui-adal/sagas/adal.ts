import * as BaseActions from '@fuselab/ui-fabric/actions';
import { callbackToPromise } from '@fuselab/ui-shared/asyncUtils';
import * as AuthContext from 'adal-angular';
//tslint:disable-next-line:no-unused-variable
import { all, AllEffect, call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { AcquireTokenAction, ActionNames, Adal, SwitchTenantAction } from '../actions';
import { API_RESOURCES, listTenants, switchTenant } from '../adalContext';
import { AdalStore } from '../store';

function* getAccessToken(action: AcquireTokenAction) {
  const authContext: AuthContext = yield select<AdalStore>(s => s.authContext);
  const resource = action.resource || API_RESOURCES.ARM;
  let token: string = null;
  try {
    const [t]: string[] = yield callbackToPromise<any[]>(authContext.acquireToken.bind(authContext), resource);
    token = t;
  } catch (error) {
    const requireInteraction = error === 'interaction_required' || window.location.hash.startsWith('#error=interaction_required');
    if (requireInteraction) {
      const [t]: string[] = yield callbackToPromise<any[]>(authContext.acquireTokenPopup.bind(authContext), resource, null, null);
      token = t;
    } else {
      throw error;
    }
  }
  yield put(Adal.acquireTokenResult(token));
}

function* listAllTenants() {
  const tenants = yield call(listTenants);
  yield put(Adal.listTenantResult(tenants));
}

function* switchToTenant(action: SwitchTenantAction) {
  yield put(Adal.acquireTokenResult(null));
  yield call(switchTenant, action.tid);
  yield take(BaseActions.ActionNames.login.getUserResult);
  yield put(Adal.acquireArmToken());
}

function* watchForAcquireToken() {
  yield takeLatest(ActionNames.adal.acquireToken, getAccessToken);
}

function* watchForListTenants() {
  yield takeLatest(ActionNames.adal.listTenants, listAllTenants);
}

function* watchForSwitchTenant() {
  yield takeLatest(ActionNames.adal.switchTenant, switchToTenant);
}

export function* adalSagas() {
  yield all([
    fork(watchForAcquireToken),
    fork(watchForListTenants),
    fork(watchForSwitchTenant)
  ]);
}
