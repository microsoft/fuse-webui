import * as Adal from '@fuselab/ui-adal/lib';
import * as BaseNames from '@fuselab/ui-fabric/lib/actions';
//tslint:disable:no-reserved-keywords

export namespace ActionNames {
  export import login = BaseNames.ActionNames.login;
  export import theme = BaseNames.ActionNames.theme;
  export import adal = Adal.ActionNames.adal;
}

export type Action = BaseNames.LoginActions |
  Adal.AdalActions;
