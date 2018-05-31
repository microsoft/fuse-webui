import { Deferred } from '@fuselab/ui-shared';
import * as React from 'react';

export interface DialogState<T> {
  showing: boolean;
  response: Deferred<T>;
}

export interface IDialogBase<T> {
  setShowing(showing: boolean);
  setResponse(response: Deferred<T>);
}

export type DialogBase<P, T> = React.Component<P, DialogState<T>>;
