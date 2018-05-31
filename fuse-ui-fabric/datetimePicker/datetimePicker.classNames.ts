import { mergeStyleSets } from '@uifabric/merge-styles';

const datetimeClassNames = (): { [key: string]: string } => mergeStyleSets({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 240,
    selectors: {
      '& >*:first-child': {
        marginBottom: 8
      }
    }
  }
});

export default datetimeClassNames;
