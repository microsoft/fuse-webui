import { DefaultButton } from 'office-ui-fabric-react/lib-commonjs/Button';
import { IContextualMenuItem, IContextualMenuProps } from 'office-ui-fabric-react/lib-commonjs/ContextualMenu';
import { Link } from 'office-ui-fabric-react/lib-commonjs/Link';
import { getTheme } from 'office-ui-fabric-react/lib-commonjs/Styling';
import * as React from 'react';
import { Preference } from '../themes';
import { History, withRouter, WithRouter } from '../withRouter';
import classNames from './userProfile.classNames';
import { UserInfo } from './userProfile.types';

export interface UserProfileAttributes extends Preference {
  loggedIn: boolean;
  userInfo?: UserInfo;
  darkTopNav?: boolean;
  disableThemeToggle?: boolean;
  disableCompactToggle?: boolean;
}

export interface UserProfileActions {
  logIn(history: History);
  logOut(user: UserInfo);
  switchTheme(theme: 'light' | 'dark');
  toggleCompact(val: boolean);
}

const handleClick = (innerClick: Function) => ((e: React.MouseEvent<HTMLElement>) => {
  e.preventDefault();
  innerClick();
});

const signedInUser = (props: UserProfileProps) => {
  let menuItems: IContextualMenuItem[] = [
    { key: 'email', name: props.userInfo.email }
  ];
  if (!props.disableThemeToggle) {
    menuItems.push({
      key: 'theme',
      name: 'Dark theme',
      checked: props.theme === 'dark',
      canCheck: true,
      onClick: () => props.switchTheme(props.theme === 'dark' ? 'light' : 'dark')
    });
  }
  if (!props.disableThemeToggle) {
    menuItems.push({
      key: 'compact',
      name: 'High density',
      checked: props.compact,
      canCheck: true,
      onClick: () => props.toggleCompact(!props.compact)
    });
  }
  menuItems.push({
    key: 'logOut',
    name: 'Sign out',
    onClick: () => props.logOut(props.userInfo)
  });
  const menuProps: IContextualMenuProps = {
    items: menuItems
  };
  const className = props.darkTopNav ? classNames().darkThemeButton : '';

  return <DefaultButton text={props.userInfo.displayName} menuProps={menuProps} className={className} />;
};

export type UserProfileProps = UserProfileAttributes & UserProfileActions & WithRouter<UserProfileAttributes>;
const inner = (props: UserProfileProps) => {
  let theme = getTheme();
  if (props.darkTopNav) {
    theme = { ...theme, semanticColors: { ...theme.semanticColors, link: 'white', linkHovered: '#d0d0d0' } };
  }

  const loginLink = !props.loggedIn ? (
    <Link
      theme={theme}
      onClick={handleClick(() => props.logIn(props.history))}
      className={classNames().loginLink}
    >
      Sign in
    </Link>) :
    null;

  return (
    <div className={classNames().root} >
      {props.loggedIn ? signedInUser(props) : loginLink}
    </div>);
};

export const UserProfile: (props: UserProfileProps) => JSX.Element = withRouter(inner as any) as any;
