/* tslint:disable:no-use-before-declare */
import { IconNames } from '@uifabric/icons';
import { DefaultButton } from 'office-ui-fabric-react/lib-commonjs/Button';
import * as React from 'react';
import { TopNav, TopNavPanels } from '../topNav';
import classNames from './mainNav.classNames';
/* tslint:enable:no-use-before-declare */

export interface Waffle {
  href: string;
  iconName: IconNames;
}

export interface MainNavProps {
  waffles: Waffle[];
}

function renderWaffles(waffles: Waffle[]): JSX.Element {
  const buttonClass = classNames().waffle;
  const renderer = (w: Waffle) => (
    <DefaultButton className={buttonClass} href={w.href} key={`waffle_${w.href}`}>
      <i className={`ms-Icon ms-fontColor-themePrimary ms-Icon--${w.iconName}`} />
    </DefaultButton>
  );

  return (
    <div className={classNames().waffleBox}>
      {waffles.map(renderer)}
    </div>
  );
}

function renderNavPanelWithProps(props: MainNavProps, panel: TopNavPanels): JSX.Element {
  switch (panel) {
    case TopNavPanels.apps:
      return renderWaffles(props.waffles);
    default:
  }

  return <p>Panel '{panel}' render not defined</p>;
}

export const MainNav = (props: MainNavProps) => {
  const renderNavPanel = renderNavPanelWithProps.bind(null, props);

  return (
    <header className={classNames().root}>
      <TopNav renderNavPanel={renderNavPanel} />
    </header>);
};
