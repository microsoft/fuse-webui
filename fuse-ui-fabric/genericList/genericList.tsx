import { lazy } from '@fuselab/ui-shared';
import { BaseComponent } from '@uifabric/utilities/lib';
import { DetailsList, IDetailsListProps } from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import { asyncState } from '../decorators/asyncState';
import { AsyncComponentState, AsyncState, IAsyncComponent } from '../models';
import { WithRouter } from '../withRouter';

export interface ListAttributes<T> {
  items: T[];
  selectedItem: T;
  rollbackItem: T;
}

export interface ListActions<T> {
  list(asyncKey: string);
  beginInsert(asyncKey: string);
  commit(asyncKey: string, item: T);
  delete(asyncKey: string, item: T);
  discardEdit(asyncKey: string, item: T);
  filterBy(asyncKey: string, key: keyof T, val: any);
}

export type ListBaseProps<T> = ListAttributes<T> & ListActions<T>;

export type ListProps<T> = ListBaseProps<T> & WithRouter<ListBaseProps<T>> &
  //tslint:disable-next-line
  ({ componentRef?: (x: IAsyncComponent) => void } | IDetailsListProps);

let _instanceCount = 0;

/**
 * generic list view
 */
@asyncState
export class GenericList<T> extends BaseComponent<ListProps<T>, AsyncComponentState> implements IAsyncComponent {
  constructor(props: ListProps<T>) {
    super(props);
    this.state = { asyncState: AsyncState.loading };
  }

  @lazy()
  public get key(): string {
    return `GenericList_${_instanceCount++}`;
  }

  public updateAsyncState(next: AsyncState) {
    this.setState({ asyncState: next });
  }

  public render(): JSX.Element {
    const { componentRef, ...listProps } = this.props;

    return (
      <section>
        <DetailsList
          {...listProps}
        />
        {this.renderLoading()}
      </section>
    );
  }

  private renderLoading(): JSX.Element {
    if (this.state.asyncState === AsyncState.loading) {
      return <p>Loading...</p>;
    }

    return null;
  }
}
