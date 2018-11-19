import { mergeStyleSets } from '@uifabric/merge-styles';

const appMainClassNames = (): { [key: string]: string } => mergeStyleSets({
  full: {
    width: '100%',
    height: 'calc(100vh - 40px)',
    overflowY: 'auto'
  },
  root: {
    maxWidth: 1200,
    paddingBottom: 40,
    margin: '0 auto',
    selectors: {
      'section h3': {
        fontWeight: 'normal'
      }
    }
  },
  pivot: {
    maxWidth: 1200
  }
});

export default appMainClassNames;
