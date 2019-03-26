import { IColumn } from 'office-ui-fabric-react/lib-commonjs/DetailsList';

export interface ListAttributes<T> {
  items: T[];
  selectedItem: T;
  rollbackItem: T;
}

export interface ListActions<T> {
  list(asyncKey?: Symbol);
  save(item: T);
  delete(item: T);
  insert();
  beginEdit(item: T);
  discardEdit(item: T);
  select(item: T);
}

export type ListProps<T> = ListAttributes<T> & ListActions<T>;

export type ItemColumnRender<T> = (item: T, index: number, column: IColumn) => JSX.Element | string;
