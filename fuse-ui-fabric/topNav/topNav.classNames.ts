import { mergeStyleSets } from '@uifabric/merge-styles';

const topNavClassNames = (): { [key: string]: string } => mergeStyleSets({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap'
  },
  inner: [{
    display: 'flex',
    flexWrap: 'nowrap',
    width: '100%'
  }, 'ms-bgColor-neutralDark', 'ms-fontColor-white'],
  icon: [{
    fontSize: 23,
    padding: 8
  }, 'ms-bgColor-themeDark--hover', 'ms-Icon'],
  activeIcon: [
    'ms-bgColor-white', 'ms-fontColor-neutralDark', 'ms-bgColor-white--hover'
  ]
});

export default topNavClassNames;
