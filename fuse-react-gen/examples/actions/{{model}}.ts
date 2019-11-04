import { {{capitalize(model)}} } from '../models';

//tslint:disable:no-reserved-keywords
export enum ActionNames {
{{actions.map(verb => `  ${verb} = '${namespace}.${verb}'`).join(',\n')}}
}

{{actions.map(verb => actionInterface({verb, model, capitalize})().join('\n')).join('\n')}}

{{actions.map(verb => actionGenerator({verb, model, capitalize})().join('\n')).join('\n')}}
//tslint:enable:no-reserved-keywords