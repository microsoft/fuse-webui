import { mergeStyleSets } from '@uifabric/merge-styles';

const feedbackClassNames = (): { [key: string]: string } => mergeStyleSets({
  sentiment: {
    width: 48,
    height: 48,
    fontSize: 32,
    marginBottom: 12
  }
});

export default feedbackClassNames;
