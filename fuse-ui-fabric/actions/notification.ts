import { Notification } from '../models/notification.types';
import { ErrorAction } from './action.types';
//tslint:disable:no-reserved-keywords

export enum ActionNames {
  list = 'notification.list',
  listResult = 'notification.listResult',
  dismiss = 'notification.dismiss'
}

export interface ListNotifications {
  type: ActionNames.list;
}

export interface ListNotificationResult extends ErrorAction {
  type: ActionNames.listResult;
  items: Notification[];
}

export interface DismissNotification {
  type: ActionNames.dismiss;
  notification: Notification;
}

export function listNotification(): ListNotifications {
  return { type: ActionNames.list };
}

export function listNotificaitonResult(items: Notification[]): ListNotificationResult {
  return { type: ActionNames.listResult, items };
}

export function dismissNotification(notification: Notification): DismissNotification {
  return { type: ActionNames.dismiss, notification };
}

export type Actions = ListNotifications | ListNotificationResult | DismissNotification;
