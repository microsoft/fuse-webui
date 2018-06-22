export enum NotificationLevel {
  info = 'info',
  warning = 'warnnig',
  error = 'error'
}

export interface Notification {
  id: string;
  level: NotificationLevel;
  timestamp: Date;
  title: string;
}
