//tslint:disable-next-line
const Symbol = require('es6-symbol');
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { mountComponent, unmountComponent } from '../models/asyncComponentTracker';
// tslint:disable:no-invalid-this
// tslint:disable:no-function-expression

export const asyncState = <T>(target: new (...args: any[]) => T) => {
  function outer(...args) {
    const instance: any = new target(...args);
    const key = instance.props.asyncKey;

    if (!instance.key) {
      Object.defineProperty(instance, 'key', {
        writable: false,
        value: key
      });
    }

    return instance;
  }

  outer.prototype = target.prototype;
  const origMount = target.prototype.componentDidMount;
  const origUnmount = target.prototype.componentWillUnmount;
  outer.prototype.componentDidMount = function () {
    if (origMount) {
      origMount.apply(this);
    }
    mountComponent(this);
  };

  outer.prototype.componentWillUnmount = function () {
    unmountComponent(this);
    if (origUnmount) {
      origUnmount.apply(this);
    }
  };

  outer.prototype.updateAsyncState = outer.prototype.updateAsyncState || function (next) {
    this.setState({ asyncState: next });
  };

  return <any>outer;
};

export type MapAttributes<S, A> = (asyncKey: Symbol) => (store: S) => A;
export type MapActions<S, A> = (asyncKey: Symbol) => (dispatch: Dispatch<S>) => A;

export const asyncConnect = <S, P, A>(Component: React.ComponentClass | React.FunctionComponent) =>
  (mapAttributes: MapAttributes<S, P>, mapActions: MapActions<S, A>) => {
    const dummyKey = Symbol();
    const dummyClass = connect(mapAttributes(dummyKey), mapActions(dummyKey))(Component);

    // constructor
    function outter(...args) {
      const asyncKey = Symbol();
      const attributesMapper = mapAttributes(asyncKey);
      const actionMapper = mapActions(asyncKey);
      const injected = connect(attributesMapper, actionMapper)(Component);

      return new injected(...args);
    }

    outter.prototype = dummyClass.prototype;
    outter.contextTypes = dummyClass.contextTypes;
    outter.childContextTypes = dummyClass.childContextTypes;

    return outter;
  };
