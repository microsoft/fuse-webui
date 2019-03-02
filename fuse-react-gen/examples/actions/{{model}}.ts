import { {{ model }} } from '../models';

export enum ActionNames {
  {{ verbs.map(verb => `  ${verb}: "{{namespace-prefix}}.${verb}"`).join(',\\n') }}
}

{{ verbs.map(verb => actionInterface({verb, model})).join('') }}

{{ verbs.map(verb => actionGenerator({verb, model})).join('') }}
