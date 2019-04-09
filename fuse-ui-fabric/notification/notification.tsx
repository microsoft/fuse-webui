import { lazy } from '@fuselab/ui-shared/lib/decorators';
import { BaseComponent, IBaseProps } from '@uifabric/utilities';
import { IconButton } from 'office-ui-fabric-react/lib-commonjs/Button';
import { getTheme } from 'office-ui-fabric-react/lib-commonjs/Styling';
import * as React from 'react';
import { Notification, NotificationLevel } from '../models/notification.types';
import classNames from './notification.classNames';

export interface NotificationActions {
  dismiss(n: Notification): void;
}

export type NotificationProps = IBaseProps & Notification & NotificationActions & React.Props<NotificationCard>;

const iconFromLevels = {
  [NotificationLevel.info]: 'Info',
  [NotificationLevel.warning]: 'Warning',
  [NotificationLevel.error]: 'Error'
};

function getIconColor(level: NotificationLevel): string {
  const theme = getTheme();
  switch (level) {
    case NotificationLevel.warning:
      return theme.semanticColors.warningHighlight;
    case NotificationLevel.error:
      return theme.semanticColors.errorText;
    default:
  }

  return theme.palette.themePrimary;
}

/**
 * notification card with title and dismiss button
 */
export class NotificationCard extends BaseComponent<NotificationProps> {
  public render(): JSX.Element {
    const iconClass = `${classNames().infoIcon} ms-Icon ms-Icon--${iconFromLevels[this.props.level]}`;

    return (
      <div key={this.props.key} className={classNames().root}>
        <div className={classNames().header}>
          <i className={iconClass} style={{ color: getIconColor(this.props.level) }} />
          <h3>{this.props.title}</h3>
          <IconButton iconProps={{ iconName: 'ChromeClose' }} onClick={this.dismiss} />
        </div>
        <div className={classNames().content}>
          {this.props.children}
        </div>
      </div>
    );
  }

  @lazy()
  private get dismiss(): React.MouseEventHandler<HTMLAnchorElement> {
    return e => {
      this.props.dismiss(this.props);
    };
  }
}
