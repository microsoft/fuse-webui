import { mergeStyleSets } from '@uifabric/merge-styles';

const timeClassNames = (): { [key: string]: string } => mergeStyleSets({
  root: {
    display: 'flex',
    width: 240
  },
  text: {
    flexGrow: 1,
    selectors: {
      input: {
        textAlign: 'right',
        minWidth: 48,
        padding: '0 4px'
      },
      'input + .ms-TextField-suffix': {
        padding: '0 4px'
      }
    }
  }
});

export default timeClassNames;
