import { UpdateAsyncState } from '../actions/asyncState';
import { IAsyncComponent } from './component.types';

const components: WeakMap<IAsyncComponent, boolean> = new WeakMap<IAsyncComponent, boolean>();
const keyMap: { [key: string]: IAsyncComponent } = {};

export function mountComponent(component: IAsyncComponent) {
  if (!components.has(component)) {
    components.set(component, true);
    keyMap[component.key] = component;
  }
}

export function unmountComponent(component: IAsyncComponent) {
  if (components.has(component)) {
    components.delete(component);
    delete keyMap[component.key];
  }
}

export function updateState(action: UpdateAsyncState) {
  const component = keyMap[action.key];
  if (component) {
    component.updateAsyncState(action.asyncState);
  }
}
