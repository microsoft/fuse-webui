import { FilterMemberNames, Func, mixin } from '@fuselab/ui-shared/lib/typeHelpers';
import { Action, Dispatch } from 'redux';

function dispatchActions<T, S>(actionCreators: T, dispatch: Dispatch<S>, ...methods: FilterMemberNames<T, Func<Action>>[]): T {
  return mixin(
    actionCreators,
    (x: Action) => {
      dispatch(x);

      return x;
    },
    ...methods);
}

export default dispatchActions;
