import { ErrorAction } from './action.types';

export enum EntityActions {
  beginInsert = 'entity.beginInsert',
  commitInsert = 'entity.commitInsert',
  insertResult = 'entity.insertResult',
  update = 'entity.update',
  updating = 'entity.updating',
  updated = 'entity.updated',
  delete = 'entity.delete',
  deleting = 'entity.deleting',
  deleted = 'entity.deleted',
  fetch = 'entity.fetch',
  fetching = 'entity.fetching',
  fetched = 'entity.fetched',
  query = 'entity.query',
  querying = 'entity.querying',
  queried = 'entity.queried'
}

//tslint:disable:no-reserved-keywords
export interface BaseEntity<TN> extends ErrorAction {
  target: TN;
  asyncKey?: Symbol;
}

export interface BeginInsert<T, TN> extends BaseEntity<TN> {
  type: EntityActions.beginInsert;
  entity: T;
}

export interface CommitInsert<T, TN> extends BaseEntity<TN> {
  type: EntityActions.commitInsert;
  entity: T;
}

export interface InsertResult<T, TN> extends BaseEntity<TN> {
  type: EntityActions.insertResult;
  entity: T;
}

export interface UpdateEntity<T, TN> extends BaseEntity<TN> {
  type: EntityActions.update;
  entity: T;
}

export interface DeleteEntity<T, TN> extends BaseEntity<TN> {
  type: EntityActions.delete;
  entity: T;
}

export interface FetchEntity<TN> extends BaseEntity<TN> {
  type: EntityActions.fetch;
  id: string;
}

export interface FetchResult<T, TN> extends BaseEntity<TN> {
  type: EntityActions.fetched;
  id: string;
  entity: T;
}

export interface QueryEntities<TN> extends BaseEntity<TN> {
  type: EntityActions.query;
  query: string;
  skip?: number;
  take?: number;
}

export interface QueryResult<T, TN> extends BaseEntity<TN> {
  type: EntityActions.queried;
  items: T[];
  hasMore: boolean;
}

export type EntityAction<T, TN> = QueryEntities<TN> | QueryResult<T, TN> | FetchEntity<TN> | FetchResult<T, TN>;

export const beginQuery = <TN>(target: TN, query: string, asyncKey: Symbol, skip?: number, take?: number): QueryEntities<TN> => ({
  type: EntityActions.query,
  target,
  query,
  asyncKey,
  skip,
  take
});

export const beginUpdate = <T, TN>(target: TN, entity: T, asyncKey: Symbol): UpdateEntity<T, TN> => ({
  type: EntityActions.update,
  target,
  entity,
  asyncKey
});

export const beginDelete = <T, TN>(target: TN, entity: T, asyncKey: Symbol): DeleteEntity<T, TN> => ({
  type: EntityActions.delete,
  target,
  entity,
  asyncKey
});

export const queryResult = <T, TN>(target: TN, items: T[]): QueryResult<T, TN> => ({
  type: EntityActions.queried,
  items,
  target,
  hasMore: items && items.length > 0
});

export const beginInsert = <T, TN>(target: TN, entity: T): BeginInsert<T, TN> => ({
  type: EntityActions.beginInsert,
  target,
  entity
});
