/* tslint:disable:no-use-before-declare */
import { DefaultButton } from 'office-ui-fabric-react/lib-commonjs/Button';
import { Link } from 'office-ui-fabric-react/lib-commonjs/Link';
import { getTheme } from 'office-ui-fabric-react/lib-commonjs/Styling';
import * as React from 'react';
import { Preference } from '../themes';
import { History, withRouter, WithRouter } from '../withRouter';
import classNames from './userProfile.classNames';
import { UserInfo } from './userProfile.types';
/* tslint:disable:no-use-before-declare */

export interface UserProfileAttributes extends Preference {
  loggedIn: boolean;
  userInfo?: UserInfo;
  darkTopNav?: boolean;
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

const signedInUser = (u: UserInfo, props: UserProfileProps) => {
  const menuProps = {
    items: [
      { key: 'email', name: u.email },
      { key: 'theme', name: 'Dark theme', checked: props.theme === 'dark', canCheck: true, onClick: () => props.switchTheme(props.theme === 'dark' ? 'light' : 'dark') },
      { key: 'compact', name: 'High density', checked: props.compact, onClick: () => props.toggleCompact(!props.compact), canCheck: true },
      { key: 'logOut', name: 'Sign out', onClick: () => props.logOut(props.userInfo) }
    ]
  };

  return <DefaultButton text={u.displayName} menuProps={menuProps} />;
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
    >
      Sign in
    </Link>) :
    null;

  return (
    <div className={classNames().root} >
      {!props.loggedIn ? loginLink : signedInUser(props.userInfo, props)}
    </div>);
};

export const UserProfile: (props: UserProfileProps) => JSX.Element = withRouter(inner as any) as any;
