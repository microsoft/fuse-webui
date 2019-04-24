export enum AsyncState {
  initializing = 'initializing',
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
  asyncState: AsyncState;
}

export interface IAsyncComponent {
  readonly key: Symbol;
  updateAsyncState(next: AsyncState);
}
