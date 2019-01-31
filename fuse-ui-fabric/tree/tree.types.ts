import { IStyleSet } from '@uifabric/styling/lib';
import { IBaseProps } from '@uifabric/utilities/lib';
import * as React from 'react';
import { Preference } from '../themes/themes.types';
export type TreeNodeType = 'leaf' | 'container';

//tslint:disable:no-reserved-keywords
export interface BaseTreeNode<T> {
  type: string;
  name: string;
  data: T;
  readonly level: number;
  readonly parent: Container<T>;
}

export interface Container<T> extends BaseTreeNode<T> {
  type: 'container';
  children: TreeNode<T>[];
}

export interface Leaf<T> extends BaseTreeNode<T> {
  type: 'leaf';
}

export type TreeNode<T> = Leaf<T> | Container<T>;

export interface TreeDataProvider<T> {
  loadContainer(container: Container<T>): Promise<TreeNode<T>[]>;
  insertAt(container: Container<T>, node: TreeNode<T>);
  remove(node: TreeNode<T>): Promise<TreeNode<T>>;
  selectNode(node: TreeNode<T>);
}
//tslint:enable:no-reserved-keywords

export interface TreeNodeStyleProvider {
  getStyle(node: ITreeNodeView): IStyleSet;
}

export interface ITreeNodeView {
  readonly elementRef: HTMLElement;
  readonly node: TreeNode<any>;
  readonly parent: ITreeNodeView;
  readonly children: Iterator<ITreeNodeView>;
  readonly expanded: boolean;
  readonly editing: boolean;
  readonly theme: 'dark' | 'light';
  select(selected: boolean);
  edit();
  expand();
  collapse();
  forceUpdate();
}

export interface TreeNodeAttributes extends Preference {
  data: TreeNode<any>;
  selected: boolean;
  parent: ITreeNodeView;
}

export interface TreeNodeActions extends TreeNodeStyleProvider {
  select(node: ITreeNodeView);
  toggleContextMenu(node: ITreeNodeView, e: React.MouseEvent<HTMLElement>);
  blur();
  mounted(node: ITreeNodeView);
}

export interface TreeState<T> {
  root: TreeNode<T>;
  selected: TreeNode<T>;
}

export type TreeNodeViewProps<T> = TreeNodeAttributes & TreeViewConfig & TreeNodeActions & TreeDataProvider<T> & IBaseProps<ITreeNodeView>;

export interface TreeViewConfig {
  readonly?: boolean;
  hideRoot?: boolean;
}

export type TreeViewAttributes<T> = TreeNodeAttributes & { selectedData: TreeNode<T> } & TreeViewConfig & Preference;
export type TreeViewProps<T> = TreeViewAttributes<T> & TreeDataProvider<T> & TreeNodeStyleProvider & IBaseProps<ITreeView>;

export interface ITreeView {
  select(node: ITreeNodeView);
  focus();
}
