import { all, fork } from 'redux-saga/effects';
import { handleLogin } from './login';

function* root() {
  yield all([
    fork(handleLogin)
  ]);
}

export default root;
