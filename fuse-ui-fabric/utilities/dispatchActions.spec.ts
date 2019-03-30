///<reference types='jasmine'/>
import { Action, Dispatch } from 'redux'
import dispatchActions from './dispatchActions';

describe('dispatchActions', () => {
  it('dispatch actions', () => {
    const dispatcher = {
      dispatch: x => x
    };

    const spy = spyOn(dispatcher, 'dispatch').and.callThrough();

    const d = dispatchActions({
      load: () => ({ type: 'load' }),
      search: (id: string) => ({ type: 'search', id })
    },
      dispatcher.dispatch,
      'load',
      'search');
    d.load();
    d.search('test');

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({ type: 'load' });
    expect(spy).toHaveBeenCalledWith({ type: 'search', id: 'test' });
  })
});
