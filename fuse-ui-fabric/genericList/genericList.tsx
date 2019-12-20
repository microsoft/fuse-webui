import { BaseComponent, IBaseProps } from '@uifabric/utilities/lib';
import { DetailsList, IDetailsListProps } from 'office-ui-fabric-react/lib-commonjs/DetailsList';
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
  list(asyncKey: Symbol);
  beginInsert(asyncKey: Symbol);
  commit(asyncKey: Symbol, item: T);
  delete(asyncKey: Symbol, item: T);
  discardEdit(asyncKey: Symbol, item: T);
  filterBy(asyncKey: Symbol, key: keyof T, val: any);
}

export type ListBaseProps<T> = ListAttributes<T> & ListActions<T> & IBaseProps;

export type ListProps<T> = ListBaseProps<T> &
  WithRouter<ListBaseProps<T>> &
  //tslint:disable-next-line
  ({ componentRef?: (x: IAsyncComponent) => void } | IDetailsListProps);

/**
 * generic list view
 */
@asyncState
export class GenericList<T> extends BaseComponent<ListProps<T>, AsyncComponentState> {
  constructor(props: ListProps<T>) {
    super(props);
    this.state = { ...this.state, asyncState: AsyncState.loading };
  }

  public render(): JSX.Element {
    const { componentRef, ...listProps } = this.props;

    return (
      <section>
        <DetailsList {...listProps} />
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
