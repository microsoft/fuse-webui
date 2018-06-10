import { callbackToPromise } from '@fuselab/ui-shared/lib/asyncUtils';
import * as AuthContext from 'adal-angular';
import * as React from 'react';

export interface UserProfile {
  email?: string;
  family_name?: string;
  given_name?: string;
  tid?: string;
}

export interface UserResult {
  userName: string;
  profile: UserProfile;
}

export interface TenantInfo {
  id: string;
  tenantId: string;
  countryCode: string;
  displayName: string;
  domains: string[];
}

export type ArrayResult<T> = { value: T[] };

export enum API_RESOURCES {
  ARM = 'https://management.core.windows.net/',
  Tenants = 'https://management.azure.com/tenants?api-version=2017-08-01'
}

export const AdalContext = React.createContext<AuthContext>(null);

let authContext: AuthContext = null;

export function ensureAuthContext(config: AuthContext.Options): AuthContext {
  if (!authContext) {
    authContext = new AuthContext(config);
    window.addEventListener('load', e => {
      authContext.handleWindowCallback();
    });
  }

  return authContext;
}

export async function listTenants(): Promise<TenantInfo[]> {
  const [armToken] = await callbackToPromise<string[]>(authContext.acquireToken.bind(authContext), API_RESOURCES.ARM);
  const request: RequestInit = {
    method: 'GET',
    headers: { Authorization: `Bearer ${armToken}` }
  };

  const resp = await fetch(API_RESOURCES.Tenants, request);
  if (resp.ok) {
    const { value }: ArrayResult<TenantInfo> = await resp.json();

    return value;
  }

  throw new Error(`${resp.status} ${resp.statusText}`);
}

export async function switchTenant(tid: string): Promise<{}> {
  authContext.config.tenant = tid;
  authContext.clearCache();
  authContext.login();

  return Promise.resolve({});
}
