import * as React from 'react';
/* tslint:enable:no-use-before-declare */

export interface {{Component}}Action {
  setAccessToken(token: string);
}

import classNames from './{{component}}.classNames';

export const {{ Component }} = (props: {{ Component }}Action) => (
  <div>
    put your rendering code for {{ Component }} here
  </div>
);
