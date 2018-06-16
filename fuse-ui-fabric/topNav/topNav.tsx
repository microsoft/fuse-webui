import { lazy } from '@fuselab/ui-shared/lib';
import { IBaseProps, KeyCodes } from '@uifabric/utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib-commonjs/Button';
import { IPanelProps, Panel, PanelType } from 'office-ui-fabric-react/lib-commonjs/Panel';
import { BaseComponent } from 'office-ui-fabric-react/lib-commonjs/Utilities';
import * as React from 'react';
import { LogoHeader } from '../logoHeader';
import { User } from '../userProfile';
import classNames from './topNav.classNames';

export enum TopNavPanels {
  none = 'none',
  apps = 'apps',
  notification = 'notification',
  settings = 'settings',
  feedback = 'feedback',
  help = 'help'
}

export interface TopNavProps extends IBaseProps {
  renderNavPanel(panel: TopNavPanels): JSX.Element;
  renderNavPanelFooter(panel: TopNavPanels): JSX.Element;
}

export interface TopNavState {
  openPanel: TopNavPanels;
}

const panelIcons = {
  [TopNavPanels.apps]: 'ms-Icon--Waffle',
  [TopNavPanels.notification]: 'ms-Icon--Ringer',
  [TopNavPanels.settings]: 'ms-Icon--Settings',
  [TopNavPanels.feedback]: 'ms-Icon--Emoji2',
  [TopNavPanels.help]: 'ms-Icon--Help'
};

/**
 * common top navigation widget with logo and waffle on the left,
 * settings, feedback, help, and user login/logout widget out the right.
 */
export class TopNav extends BaseComponent<TopNavProps, TopNavState> {
  constructor(props: TopNavProps) {
    super(props);
    this.state = { openPanel: TopNavPanels.none };
  }

  public render(): JSX.Element {
    const panel = this.state.openPanel;
    const panelContent = this.props.renderNavPanel(panel);
    const panelProps = this.panelProps[panel] || { type: PanelType.smallFixedFar, layerProps: { styles: { root: { top: 40 } } } };

    return (
      <header className={classNames().root}>
        <div className={classNames().inner}>
          {this.renderNavButton(TopNavPanels.apps, this.navClickApps)}
          <LogoHeader />
          {this.renderNavButton(TopNavPanels.notification, this.navClickNotificaiton)}
          {this.renderNavButton(TopNavPanels.settings, this.navClickSettings)}
          {this.renderNavButton(TopNavPanels.feedback, this.navClickFeedback)}
          {this.renderNavButton(TopNavPanels.help, this.navClickHelp)}
          <User darkTopNav={true} />
        </div>
        <Panel
          {...panelProps}
          isOpen={panel !== TopNavPanels.none}
          onDismiss={this.onPanelDismiss}
        >
          {panelContent}
        </Panel>
      </header>);
  }

  private renderNavButton(panel: TopNavPanels, handler: React.MouseEventHandler<HTMLElement>): JSX.Element {
    return (
      <i
        role='button'
        tabIndex={0}
        className={this.getIconClassNames(panel)}
        aria-hidden={true}
        title={panel}
        onClick={handler}
        onKeyUp={this.keyActivate}
      />
    );
  }

  private get keyActivate(): React.KeyboardEventHandler<HTMLElement> {
    return x => {
      const keyCode = x.which;
      if (keyCode === KeyCodes.space || keyCode === KeyCodes.enter) {
        x.currentTarget.click();
        x.preventDefault();
        x.stopPropagation();
      }
    };
  }

  private getIconClassNames(panel: TopNavPanels): string {
    return `${classNames().icon} ${panelIcons[panel]} ${this.state.openPanel === panel ? classNames().activeIcon : ''}`;
  }

  @lazy()
  private get navClickApps(): React.MouseEventHandler<HTMLElement> {
    return this.iconClicked.bind(this, TopNavPanels.apps);
  }

  @lazy()
  private get navClickNotificaiton(): React.MouseEventHandler<HTMLElement> {
    return this.iconClicked.bind(this, TopNavPanels.notification);
  }

  @lazy()
  private get navClickSettings(): React.MouseEventHandler<HTMLElement> {
    return this.iconClicked.bind(this, TopNavPanels.settings);
  }

  @lazy()
  private get navClickFeedback(): React.MouseEventHandler<HTMLElement> {
    return this.iconClicked.bind(this, TopNavPanels.feedback);
  }

  @lazy()
  private get navClickHelp(): React.MouseEventHandler<HTMLElement> {
    return this.iconClicked.bind(this, TopNavPanels.help);
  }

  @lazy()
  private get panelProps(): { [key: string]: IPanelProps } {
    return {
      [TopNavPanels.apps]: {
        type: PanelType.smallFixedNear,
        onRenderNavigation: this.renderWaffleHeader,
        layerProps: { styles: { content: { selectors: { '.ms-Panel-content': { paddingLeft: 20, paddingRight: 20 } } } } }
      },
      [TopNavPanels.feedback]: {
        type: PanelType.smallFixedFar,
        headerText: 'Send us feedback',
        isFooterAtBottom: true,
        onRenderFooterContent: this.props.renderNavPanelFooter.bind(this.props, TopNavPanels.feedback),
        layerProps: { styles: { root: { top: 40, height: 'calc(100vh - 40px)' } } }
      }
    };
  }

  @lazy()
  private get renderWaffleHeader(): (props: IPanelProps, defaultRender?: (props?: IPanelProps) => JSX.Element | null) => JSX.Element {
    return (props, render) => (
      <div>
        <DefaultButton onClick={this.onPanelDismiss} className={classNames().wafflePanelHeader}><i className='ms-Icon ms-Icon--Waffle' /></DefaultButton>
      </div>
    );
  }

  @lazy()
  private get onPanelDismiss(): () => void {
    return () => {
      this.setState({ openPanel: TopNavPanels.none });
    };
  }

  private iconClicked(openPanel: TopNavPanels, e: React.MouseEvent<HTMLElement>) {
    if (this.state.openPanel === openPanel) {
      this.setState({ openPanel: TopNavPanels.none });
    } else {
      this.setState({ openPanel });
    }
  }
}
