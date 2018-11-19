import { mergeStyleSets } from '@uifabric/merge-styles';

const appClassNames = (darkTheme: boolean): { [key: string]: string } => mergeStyleSets({
  root: [{
    minHeight: '100vh'
  },
  darkTheme && {
    backgroundColor: '#222'
  }]
});

export default appClassNames;
