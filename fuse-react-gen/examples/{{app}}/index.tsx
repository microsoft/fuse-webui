import { loadPreference } from '@fuselab/ui-fabric/themes';
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
const { appName, version } = require('./package.json');
import reducers from './reducers';
import rootSaga from './sagas';
/* tslint:enable:no-use-before-declare */
declare const BASENAME: string;

initialize({ name: appName, version });

const sagaMiddleware = createSagaMiddleware();
const store: any = createStore<Store>(
  reducers,
  {
    user: null,
    preference: loadPreference()
  },
  applyMiddleware(sagaMiddleware)
);

store.runSaga = sagaMiddleware.run;
store.runSaga(rootSaga);

const history = createBrowserHistory({
  basename: BASENAME
});

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
