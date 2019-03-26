import { AsyncState } from '../models';
//tslint:disable:no-reserved-keywords
export enum Actions {
  updateAsyncState = 'asyncState.update'
}

export interface UpdateAsyncState {
  type: Actions.updateAsyncState;
  key: Symbol;
  asyncState: AsyncState;
}

export const updateAsyncState = (key: Symbol, asyncState: AsyncState) => ({
  type: Actions.updateAsyncState,
  key,
  asyncState
});
