import { all, fork } from 'redux-saga/effects';
import login from './login';

function* root() {
  yield all([
    fork(login)
  ]);
}

export default root;
