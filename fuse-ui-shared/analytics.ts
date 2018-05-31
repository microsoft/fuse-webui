import { AppInsights } from 'applicationinsights-js';

declare global {
  interface Window {
    instrumentationKey: string;
  }
}

if (window.instrumentationKey) {
  AppInsights.downloadAndSetup({ instrumentationKey: window.instrumentationKey });
}

export interface AppDescription {
  name: string;
  version: string;
}

let _app: AppDescription = { name: 'unknown', version: 'unknown' };

export function initialize(app: AppDescription) {
  _app = app;
}

export function trackEvent(name: string, properties: { [key: string]: string }) {
  if (window.instrumentationKey) {
    AppInsights.trackEvent(name, { ..._app, ...properties });
  }
}
