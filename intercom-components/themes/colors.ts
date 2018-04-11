import {getTheme, IPalette, ITheme, loadTheme} from 'office-ui-fabric-react/lib/Styling';
import * as _ from 'underscore';

export function invertTheme() : ITheme {
  const theme = getTheme();
  theme.palette = invertColors(theme.palette);

  return loadTheme(theme);
}

const colorSwaps : {[key: string] : keyof IPalette } = {
  white: 'black',
  neutralDark: 'neutralLighterAlt',
  neutralPrimary: 'neutralLighter',
  neutralPrimaryAlt: 'neutralLight',
  neutralSecondary: 'neutralTertiaryAlt'
};

function invertColors(palette: IPalette) : IPalette {
  palette.black = '#222';
  _.each(colorSwaps, (src, target) => {
    const t = palette[target];
    palette[target] = palette[src];
    palette[src] = t;
  });

  return palette;
}
