import { AdalContext, ensureAuthContext } from '@fuselab/ui-adal';
import { getLoggedInUser } from '@fuselab/ui-fabric/actions/login';
import { loadPreference } from '@fuselab/ui-fabric/themes';
import { parseUrl } from '@fuselab/ui-shared/url';
import { initialize } from '@fuselab/ui-shared/analytics';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { render } from 'react-dom';
/* tslint:disable:no-use-before-declare */
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './components/app/app';
import { Store } from './store';
//tslint:disable-next-line
const { appName, version, aadAppId } = require('./package.json');
import reducers from './reducers';
import rootSaga from './sagas';
/* tslint:enable:no-use-before-declare */
declare const BASENAME: string;

function getAdalRedirectUrl(): string {
  const curUrl = parseUrl(window.location.href);
  curUrl.path = BASENAME.endsWith('/') ? BASENAME : `${BASENAME}/`;
  curUrl.query = undefined;

  return `${curUrl.format()}adal`;
}

const authContext = ensureAuthContext({
  clientId: aadAppId,
  //tslint:disable-next-line:no-http-string
  redirectUri: getAdalRedirectUrl(),
  popUp: true
});

initialize({ name: appName, version });

const sagaMiddleware = createSagaMiddleware();
const store: any = createStore<Store>(
  reducers,
  {
    authContext,
    user: null,
    preference: loadPreference()
  },
  applyMiddleware(sagaMiddleware)
);

store.runSaga = sagaMiddleware.run;
store.runSaga(rootSaga);
store.dispatch(getLoggedInUser());
const history = createBrowserHistory({
  basename: BASENAME
});

render(
  <Provider store={store}>
    <Router history={history}>
      <AdalContext.Provider value={authContext}>
        <App />
      </AdalContext.Provider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
