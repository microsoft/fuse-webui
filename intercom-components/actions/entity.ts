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
