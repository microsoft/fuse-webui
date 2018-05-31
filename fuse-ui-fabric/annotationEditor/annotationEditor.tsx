import { lazy } from '@fuselab/ui-shared';
import { ContentBlock, ContentState, Editor, EditorState } from 'draft-js';
import * as React from 'react';
import { AnnotatedText, Annotation } from '../models';
import classNames from './annotationEditor.classNames';

export interface AnnotationEditorAttributes {
  document: AnnotatedText[];
}

export interface AnnotationEditorActions {
  insert(text: AnnotatedText);
  remove(text: AnnotatedText);
  update(text: AnnotatedText, newText: string);
  tag(text: AnnotatedText, tag: Annotation);
  unTag(text: AnnotatedText, tag: Annotation);
}

export type AnnotationEditorProps = AnnotationEditorAttributes & AnnotationEditorActions;

export interface AnnotationEditorState {
  editorState: EditorState;
}

function initContent(props: AnnotationEditorProps): ContentState {
  return ContentState.createFromBlockArray(props.document.map((t) => {
    return new ContentBlock({
      type: 'paragraph',
      key: t.key,
      text: t.text,
      data: t
    });
  }));
}

/**
 * document editor for annotation
 */
export class AnnotationEditor extends React.Component<AnnotationEditorProps, AnnotationEditorState> {
  constructor(props: AnnotationEditorProps) {
    super(props);

    this.state = {
      editorState: props.document.length
        ? EditorState.createWithContent(initContent(props))
        : EditorState.createEmpty()
    };
  }

  public render(): JSX.Element {
    return (
      <div className={classNames().root}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onEditorStateChange}
        />
      </div>
    );
  }

  @lazy()
  private get onEditorStateChange(): (s: EditorState) => void {
    return editorState => {
      this.findNewTexts(editorState);
      this.setState({ editorState });
    };
  }

  private findNewTexts(s: EditorState) {
    if (!s) {
      return;
    }
    const content = s.getCurrentContent();
    const blocks = content.getBlocksAsArray();
    const existingKeys = this.props.document.reduce(
      (h, x) => {
        let t = {};
        t[x.key] = true;

        return { ...t, ...h };
      },
      {});

    const newBlocks = blocks.filter(b => b.getText() && !existingKeys[b.getKey()]);
    for (let b of newBlocks) {
      this.props.insert({ key: b.getKey(), text: b.getText(), annotations: [] });
    }
  }
}
