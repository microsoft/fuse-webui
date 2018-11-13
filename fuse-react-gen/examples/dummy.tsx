import * as React from 'react';
/* tslint:enable:no-use-before-declare */

export interface {{component}}Action {
  setAccessToken(token: string);
}

import classNames from './{{component}}.classNames';

export const {{ component }} = (props: {{ component }}Action) => (
  <div>
    put your rendering code for {{ component }} here
  </div>
);
