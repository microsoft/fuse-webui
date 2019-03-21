
export interface ObjectiveVerb {
  [name: string]: string[];
}

export type VerbSpec = string | ObjectiveVerb;

export interface ActionSpec {
  models: string | string[];
  ['namespace-prefix']: string;
  verbs: VerbSpec[];
}
