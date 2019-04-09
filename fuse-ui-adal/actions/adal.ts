import { ErrorAction } from '@fuselab/ui-fabric/lib/actions/action.types';
import { TenantInfo } from '../adalContext';
import { Actions } from './adal.types';

//tslint:disable:no-reserved-keywords
export interface AcquireTokenAction {
  type: Actions.acquireToken;
  resource?: string;
}

export interface AcquireTokenActionResult extends ErrorAction {
  type: Actions.acquireTokenResult;
  token: string;
}

export interface ListTenantsAction {
  type: Actions.listTenants;
}

export interface ListTenantsActionResult extends ErrorAction {
  type: Actions.listTenantResult;
  tenants: TenantInfo[];
}

export interface SwitchTenantAction {
  type: Actions.switchTenant;
  tid: string;
}

export type AdalActions = AcquireTokenAction | AcquireTokenActionResult |
  ListTenantsAction | ListTenantsActionResult | SwitchTenantAction;

export namespace Adal {
  export function acquireArmToken(): AcquireTokenAction {
    return { type: Actions.acquireToken };
  }

  export function acquireToken(resource: string): AcquireTokenAction {
    return { type: Actions.acquireToken, resource };
  }

  export function acquireTokenResult(token: string): AcquireTokenActionResult {
    return { type: Actions.acquireTokenResult, token };
  }

  export function listTenants(): ListTenantsAction {
    return { type: Actions.listTenants };
  }

  export function listTenantResult(tenants: TenantInfo[]): ListTenantsActionResult {
    return { type: Actions.listTenantResult, tenants };
  }

  export function switchTenant(tid: string): SwitchTenantAction {
    return { type: Actions.switchTenant, tid };
  }
}
