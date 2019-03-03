import { {{capitalize(model)}} } from '../models';

export enum ActionNames {
{{actions.map(verb => `  ${verb} = "${namespace}.${verb}"`).join(',\n')}}
}

{{actions.map(verb => actionInterface({verb, model, capitalize}).join('\n')).join('\n')}}

{{actions.map(verb => actionGenerator({verb, model, capitalize}).join('\n')).join('\n')}}