import * as React from 'react';
import classNames from './logoHeader.classNames';

export enum LogoColors {
  white = 'white',
  gray = 'gray'
}

export interface LogoProps extends React.Props<any> {
  logoColor?: LogoColors;
}

export const LogoHeader = (props: LogoProps) => (
  <header className={classNames().root}>
    <img
      className={classNames().logo}
      alt='Microsoft'
      src={`https://assets.onestore.ms/cdnfiles/external/uhf/long/9a49a7e9d8e881327e81b9eb43dabc01de70a9bb/images/microsoft-${props.logoColor || LogoColors.white}.png`}
    />
    {props.children}
  </header>);
