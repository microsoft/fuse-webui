import * as React from 'react';
/* tslint:enable:no-use-before-declare */
import classNames from './tree.classNames';

export interface TreeAttributes {
  //id: string;
}

export interface TreeActions {
  //save();
}

export type TreeProps = TreeAttributes & TreeActions;

export const Tree = (props: TreeProps) => (
  <div>
    put your rendering code for Tree here
  </div>
);
