import { mergeStyleSets } from '@uifabric/merge-styles';
import { getTheme } from '@uifabric/styling';

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
    padding: 8,
    position: 'relative'
  }, 'ms-bgColor-themeDark--hover', 'ms-Icon'],
  counter: ['ms-bgColor-neutralTertiary', {
    position: 'absolute',
    top: 2,
    right: 2,
    borderRadius: '50%',
    fontSize: 14,
    lineHeight: 14,
    width: 16,
    height: 16,
    display: 'flex',
    justifyContent: 'center',
    userSelect: 'none'
  }],
  activeIcon: [
    'ms-bgColor-white', 'ms-fontColor-neutralDark', 'ms-bgColor-white--hover', {
      selectors: {
        $counter: {
          backgroundColor: getTheme().palette.neutralLight
        }
      }
    }
  ],
  wafflePanelHeader: {
    fontSize: 23,
    width: 32,
    height: 32,
    minWidth: 'none',
    minHeight: 'none',
    marginTop: 4,
    marginLeft: 4
  }
});

export default topNavClassNames;
