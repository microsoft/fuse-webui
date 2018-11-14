import { mergeStyleSets } from '@uifabric/merge-styles';

const mainNavClassNames = (): { [key: string]: string } => mergeStyleSets({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '0 auto',
    minHeight: 40
  },
  pivot: {
    width: 1200
  },
  waffleBox: {
    marginLeft: -12,
    marginTop: 0
  },
  waffle: {
    width: 64,
    height: 64,
    minWidth: 64,
    minHeight: 64,
    marginLeft: 12,
    marginTop: 12,
    fontSize: 32
  }
});

export default mainNavClassNames;
