import { mergeStyleSets } from '@uifabric/merge-styles';

const withAuthClassNames = (): { [key: string]: string } => mergeStyleSets({
  root: {
    maxWidth: 1200,
    paddingBottom: 40,
    margin: '0 auto',
    selectors: {
      section: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 40
      },
      'section h2': {
        fontWeight: 'normal'
      },
      button: {
        minWidth: 120
      }
    }
  }
});

export default withAuthClassNames;
