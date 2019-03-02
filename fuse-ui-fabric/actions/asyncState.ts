import { AsyncState } from '../models';
//tslint:disable:no-reserved-keywords
export enum Actions {
  updateAsyncState = 'asyncState.update'
}

export interface UpdateAsyncState {
  type: Actions.updateAsyncState;
  key: string;
  asyncState: AsyncState;
}

export const updateAsyncState = (key: string, asyncState: AsyncState) => ({
  type: Actions.updateAsyncState,
  key,
  asyncState
});
