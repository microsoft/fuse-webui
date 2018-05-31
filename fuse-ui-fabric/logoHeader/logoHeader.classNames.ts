import { mergeStyleSets } from '@uifabric/merge-styles';

const logoHeaderClassNames = (): { [key: string]: string } => mergeStyleSets({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo: {
    maxHeight: 23
  }

});

export default logoHeaderClassNames;
