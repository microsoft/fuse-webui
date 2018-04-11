import { lazy } from '@intercom/ui-shared';
import { BaseComponent } from '@uifabric/utilities/lib';
import { DetailsList, IDetailsListProps } from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import { AsyncComponentState, AsyncState, IAsyncComponent } from '../models';
import { WithRouter } from '../withRouter';

export interface ListAttributes<T> {
  items: T[];
  selectedItem: T;
  rollbackItem: T;
}

export interface ListActions<T> {
  list();
  beginInsert();
  commit(item: T);
  delete(item: T);
  discardEdit(item: T);
  filterBy(key: keyof T, val: any);
}

export type ListBaseProps<T> = ListAttributes<T> & ListActions<T>;

export type ListProps<T> = ListBaseProps<T> & WithRouter<ListBaseProps<T>> & IDetailsListProps;

let _instanceCount = 0;

/**
 * generic list view
 */
export class GenericList<T> extends BaseComponent<ListProps<T>, AsyncComponentState> implements IAsyncComponent {
  constructor(props: ListProps<T>) {
    super(props);
    this.state = { asyncState: AsyncState.loading };
  }

  @lazy()
  public get key(): string {
    return `$GenericList_${_instanceCount++}`;
  }

  public updateAsyncState(asyncState: AsyncState) {
    this.setState({ asyncState });
  }

  public render(): JSX.Element {
    return (
      <DetailsList
        {...this.props}
      />
    );
  }
}
