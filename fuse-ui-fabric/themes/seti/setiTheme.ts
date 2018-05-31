import { fontFace } from '@uifabric/merge-styles';
import * as _ from 'underscore';
import { IconTheme } from './seti.types';
//tslint:disable-next-line
export const SetiTheme: IconTheme = require('./vs-seti-icon-theme.json');

export type FontCalc = (name: string) => string;
export type FontRefernence = string | FontCalc;

export function initFontFaces(fontRoot: FontRefernence) {
  const fontCalc = _.isFunction(fontRoot) ? fontRoot : x => `url(//${fontRoot}/assets/fonts${x})`;

  for (let font of SetiTheme.fonts) {
    fontFace({
      fontFamily: `"${font.id}"`,
      src: fontCalc(font.src[0].path.substr(1)),
      fontWeight: 'normal'
    });
  }
}
