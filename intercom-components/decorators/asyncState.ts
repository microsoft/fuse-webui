import { mountComponent, unmountComponent } from '../models/asyncComponentTracker';
// tslint:disable:no-invalid-this
// tslint:disable:no-function-expression

export const asyncState = <T>(target: new (...args: any[]) => T) => {
  function outer(...args) {
    return new target(args);
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

  return <any>outer;
};
