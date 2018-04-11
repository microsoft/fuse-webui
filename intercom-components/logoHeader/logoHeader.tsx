import * as React from 'react';
import classNames from './logoHeader.classNames';

export const LogoHeader = (props: React.Props<any>) => (
  <header className={classNames().root}>
    <img className={classNames().logo} alt='Microsoft' src='https://assets.onestore.ms/cdnfiles/external/uhf/long/9a49a7e9d8e881327e81b9eb43dabc01de70a9bb/images/microsoft-gray.png' />
    {props.children}
  </header>);
