import * as React from 'react';
/* tslint:enable:no-use-before-declare */
import classNames from './{{component}}.classNames';

export interface {{Component}}Attributes {
  id: string;
}

export interface {{Component}}Actions {
  save();
}

export type {{Component}}Props = {{Component}}Attributes & {{Component}}Actions;

export const {{ Component }} = (props: {{ Component }}Props) => (
  <div>
    put your rendering code for {{ Component }} here
  </div>
);
