//tslint:disable:no-reserved-keywords
export enum AnnotationType {
  entity = 'entity',
  intent = 'intent',
  action = 'action'
}

export interface EntityTag {
  type: AnnotationType.entity;
  entity: string;
}

export interface IntentTag {
  type: AnnotationType.intent;
  intent: string;
}

export type AnnotationTag = EntityTag | IntentTag;

export interface Annotation {
  start: number;
  end: number;
  tags: AnnotationTag[];
}

export interface AnnotatedText {
  key: string;
  text: string;
  annotations: Annotation[];
}
