import { mergeStyleSets } from '@uifabric/merge-styles';

const annotationEditorClassNames = (): { [key: string]: string } => mergeStyleSets({
  root: {}
});

export default annotationEditorClassNames;
