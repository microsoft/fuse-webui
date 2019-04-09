/* tslint:disable:no-use-before-declare */
import login from '@fuselab/ui-fabric/lib/login';
import * as H from 'history';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib-commonjs/pivot';
import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classNames from './appMain.classNames';
/* tslint:enable:no-use-before-declare */

function onNavigate(history: H.History, item: PivotItem) {
  const path = item.props.itemKey;
  history.push(path);
}

function currentPath(): string {
  const pathName = window.location.pathname;
  const top = pathName.split('/').slice(1, 2).join('/');

  return `/${top}`;
}

const appMain = withRouter((x: { history: H.History }) => {
  const onLinkClick = (item: PivotItem) => {
    onNavigate(x.history, item);
  };

  return (
    <div className={classNames().full}>
      <div className={classNames().root}>
        <div className={classNames().pivot}>
          <Pivot onLinkClick={onLinkClick} selectedKey={currentPath()}>
            <PivotItem linkText='Apps' itemKey='/apps' />
          </Pivot>
        </div>

        <Switch>
          <Route path='/login' component={login} />
        </Switch>
      </div>
    </div>);
});

export default appMain;
