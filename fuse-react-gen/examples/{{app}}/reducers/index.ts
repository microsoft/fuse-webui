import { preference, user } from '@fuselab/ui-fabric/reducers';
import { combineReducers } from 'redux';
import { Store } from '../store';

export default combineReducers<Store>({
  user,
  preference
});
