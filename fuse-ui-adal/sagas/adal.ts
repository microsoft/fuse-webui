import * as BaseActions from '@fuselab/ui-fabric/actions';
import { callbackToPromise } from '@fuselab/ui-shared/asyncUtils';
import * as AuthContext from 'adal-angular';
import { all, call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { ActionNames, Adal, SwitchTenantAction } from '../actions';
import { API_RESOURCES, listTenants, switchTenant } from '../adalContext';
import { AdalStore } from '../store';

function* getArmToken() {
  const authContext: AuthContext = yield select<AdalStore>(s => s.authContext);
  const resource = API_RESOURCES.ARM;
  let token: string = null;
  try {
    const [t]: string[] = yield callbackToPromise<any[]>(authContext.acquireToken.bind(authContext), resource);
    token = t;
  } catch (error) {
    if (error === 'interaction_required') {
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
  yield takeLatest(ActionNames.adal.acquireToken, getArmToken);
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
