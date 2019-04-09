import { preference, user } from '@fuselab/ui-fabric/lib/reducers';
import { combineReducers } from 'redux';
import { Store } from '../store';
import authContext from './authContext';

export default combineReducers<Store>({
  authContext,
  user,
  preference
});
