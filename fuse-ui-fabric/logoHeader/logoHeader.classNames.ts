import { mergeStyleSets } from '@uifabric/merge-styles';

const logoHeaderClassNames = (): { [key: string]: string } => mergeStyleSets({
  root: {
    width: '100%',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'space-between'
  },
  logo: {
    maxHeight: 23
  }

});

export default logoHeaderClassNames;
