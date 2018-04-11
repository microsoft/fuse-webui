/* tslint:disable:no-use-before-declare */
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ITextField, TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
/* tslint:enable:no-use-before-declare */

export interface LoginFormAction {
  setAccessToken(token: string);
}

import classNames from './login.classNames';

export const LoginForm = (props: LoginFormAction) => {
  let ta: ITextField;
  const loginClick = () => props.setAccessToken(ta.value.trim());
  const setTa = (x: ITextField) => ta = x;

  return (
    <div>
      <ol>
        <li><a href='https://scratch.botframework.com/identity/signin' target='_blank' rel='noopener noreferrer'>Login Scratch</a></li>
        <li><a target='_blank' rel='noopener noreferrer' href='//scratch.botframework.com/identity/token'>Get token JSON</a></li>
        <li>copy the token text and paste below</li>
      </ol>
      <TextField componentRef={setTa} rows={20} cols={80} multiline={true} />
      <DefaultButton
        className={classNames().button}
        primary={true}
        onClick={loginClick}
      >
        Log in
      </DefaultButton>
    </div>
  );
};
