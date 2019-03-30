# Easy async component state update

## Motivation

Some UI Components have transiently states. For example, a list component can be in 'loading', 'loaded', 'inserting', 'error' state. Because
the state is transient, it is tedious to keep them in the Store.

## @asyncState decorator

Decorate your component class with @asyncState

```typescript
import { asyncState } from '@fuselab/ui-fabric/lib/decorators/asyncState';
import { AsyncState } from '@fuselab/ui-fabric/lib/models/component.types';

export interface TodoListProps {
  asyncKey: Symbol,
  ...
}

@asyncState
export class ToDoList extends BaseComponent<TodoListProps, AsyncState> {
  public render(): JSXElement {
    switch (this.state.asyncState) {
      case AsyncState.loading:
        return this.renderLoading;
      case AsyncState.loaded:
        return this.renderContent();
      ...
    }
  }
}
```

## asyncConnect

Instead of calling redux Connect, use asyncConnect to inject the asyncKey into the target component

```typescript
import { asyncConnect }  from '@fuselabe/ui-fabric/lib/decorators/asyncState';
import { FilterMemberNames, mixin } from '@fuselabe/ui-shared/lib/typeHelpers';
const mapStoreToProps = (asyncKey: Symbol) => (store: Store) => {
  return {
    asyncKey,
    ...
  }
}

const mapDispatchToProps = (asyncKey: Symbol) => (dispatch: Dispatch<Store>) => {
  const actions = {
    list: () => ({type: actionNames.list}),
    ...
  };

  const actionNames : (keyof typeof actions)[] = ['list', ...];
  return mixin<typeof actions, Action>(
    actions,
    x => {
      const extra = {...x, asyncKey};
      dispatch(extra);

      return extra;
    },
    actionNames);
}

export default asyncConnect()(mapStoreToProps, mapDispatchToProps);
```

## update component state as part of redux saga

```typescript
function* handleLoadAction(action: LoadAction) {
  yield call(updateAsyncState(action.asyncKey, AsyncState.loading));

  try {
      yield call(restApi.loadData, ...);
      yield call(updateAsyncState(action.asyncKey, AsyncState.loaded));
    } catch (error) {
      yield call(updateAsyncState(action.asyncKey, AsyncState.Error, error));
    }
  }
}

```
