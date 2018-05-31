import { mergeStyleSets } from '@uifabric/merge-styles';

const logoHeaderClassNames = (): { [key: string]: string } => mergeStyleSets({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    maxHeight: 23,
    paddingLeft: 8
  }

});

export default logoHeaderClassNames;
