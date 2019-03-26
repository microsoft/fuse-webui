import { mountComponent, unmountComponent } from '../models/asyncComponentTracker';
// tslint:disable:no-invalid-this
// tslint:disable:no-function-expression

export const asyncState = <T>(target: new (...args: any[]) => T) => {
  function outer(...args) {
    const instance: any = new target(...args);
    if (!instance.key) {
      Object.defineProperty(instance, 'key', {
        writable: false,
        value: Symbol()
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
