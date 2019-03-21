export interface {{`${capitalize(verb)}${capitalize(model)}`}} {
  type: ActionNames.{{verb}};
  entity: {{capitalize(model)}};
}
