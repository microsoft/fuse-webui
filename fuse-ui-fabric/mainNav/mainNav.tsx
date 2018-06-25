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
  //tslint:disable:prefer-method-signature
  renderFeedback?: () => JSX.Element;
  renderFeedbackFooter?: () => JSX.Element;
  renderNotifications?: () => JSX.Element;
  getPanelCounter?: (panel: TopNavPanels) => number;
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
    case TopNavPanels.feedback:
      if (props.renderFeedback) {
        return props.renderFeedback();
      }
      break;
    case TopNavPanels.notification:
      if (props.renderNotifications) {
        return props.renderNotifications();
      }
    default:
  }

  return <p>Panel '{panel}' render not defined</p>;
}

function renderNavPanelFooter(props: MainNavProps, panel: TopNavPanels): JSX.Element {
  switch (panel) {
    case TopNavPanels.feedback:
      if (props.renderFeedbackFooter) {
        return props.renderFeedbackFooter();
      }
    default:
  }

  return null;
}

function getPanelCounter(props: MainNavProps, panel: TopNavPanels): number {
  if (props.getPanelCounter) {
    return props.getPanelCounter(panel);
  }

  return 0;
}

export const MainNav = (props: MainNavProps) => {
  const renderNavPanel = renderNavPanelWithProps.bind(null, props);
  const renderFooter = renderNavPanelFooter.bind(null, props);
  const getCount = getPanelCounter.bind(null, props);

  return (
    <header className={classNames().root}>
      <TopNav renderNavPanel={renderNavPanel} renderNavPanelFooter={renderFooter} getPanelCount={getCount} />
    </header>);
};
