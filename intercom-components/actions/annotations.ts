//tslint:disable:no-reserved-keywords
import { AnnotatedText, Annotation } from '../models';
export enum AnnotationActions {
  tag = 'annotation.tag',
  unTag = 'annotation.unTag',
  addText = 'annotation.addText',
  removeText = 'annotation.removeText',
  updateText = 'annotation.updateText'
}

export interface TagText {
  type: AnnotationActions.tag;
  text: AnnotatedText;
  tag: Annotation;
}

export interface UnTagText {
  type: AnnotationActions.unTag;
  text: AnnotatedText;
  tag: Annotation;
}

export interface AddText {
  type: AnnotationActions.addText;
  text: AnnotatedText;
}

export interface RemoveText {
  type: AnnotationActions.removeText;
  text: AnnotatedText;
}

export interface UpdateText {
  type: AnnotationActions.updateText;
  text: AnnotatedText;
  newText: string;
}

export type AnnotationAction = TagText | UnTagText | AddText | RemoveText | UpdateText;
