export enum AsyncState {
  loading = 'loading',
  loaded = 'loaded',
  updating = 'updating',
  updated = 'updated',
  deleting = 'deleting',
  deleted = 'deleted',
  inserting = 'inserting',
  inserted = 'inserted',
  empty = 'empty',
  error = 'error'
}

export interface AsyncComponentState {
  readonly asyncKey: Symbol;
  asyncState: AsyncState;
}

export interface IAsyncComponent {
  readonly key: Symbol;
  updateAsyncState(next: AsyncState);
}
