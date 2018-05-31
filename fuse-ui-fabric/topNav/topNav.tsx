import * as React from 'react';
import { LogoHeader } from '../logoHeader';
import { User } from '../userProfile';
import classNames from './topNav.classNames';

export const TopNav = (props: React.Props<any>) => (
  <header className={classNames().root}>
    <div className={classNames().inner}>
      <i className={`${classNames().icon} ms-Icon--Waffle`} aria-hidden='true' title='apps' />
      <LogoHeader />
      <i className={`${classNames().icon} ms-Icon--Ringer`} aria-hidden='true' title='notification' />
      <i className={`${classNames().icon} ms-Icon--Settings`} aria-hidden='true' title='settings' />
      <i className={`${classNames().icon} ms-Icon--Emoji2`} aria-hidden='true' title='feedback' />
      <i className={`${classNames().icon} ms-Icon--Help`} aria-hidden='true' title='help' />
      <User darkTopNav={true} />
    </div>
  </header>);
