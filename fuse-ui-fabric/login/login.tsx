/* tslint:disable:no-use-before-declare */
import { DefaultButton } from 'office-ui-fabric-react/lib-commonjs/Button';
import { Link } from 'office-ui-fabric-react/lib-commonjs/Link';
import { ITextField, TextField } from 'office-ui-fabric-react/lib-commonjs/TextField';
import * as React from 'react';
/* tslint:enable:no-use-before-declare */

export interface LoginFormAttributes {
  loginHostName: string;
}
export interface LoginFormAction {
  setAccessToken(token: string);
}

export type LoginFormProps = LoginFormAttributes & LoginFormAction;

import classNames from './login.classNames';

export const LoginForm = (props: LoginFormProps) => {
  let ta: ITextField;
  const loginClick = () => props.setAccessToken(ta.value.trim());
  const setTa = (x: ITextField) => ta = x;

  return (
    <div>
      <ol>
        <li><Link href={`https://${props.loginHostName}/identity/signin`} target='_blank' rel='noopener noreferrer'>Login Scratch</Link></li>
        <li><Link target='_blank' rel='noopener noreferrer' href={`https://${props.loginHostName}/identity/token`}>Get token JSON</Link></li>
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
