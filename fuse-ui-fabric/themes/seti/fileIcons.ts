import { pathExt } from '@fuselab/ui-shared';
import { IStyle } from '@uifabric/styling/lib';
import { IconDefinition, IconThemeCore } from './seti.types';
import { SetiTheme } from './setiTheme';

function fileExtensionToIconIds(curTheme: IconThemeCore): { [key: string]: string } {
  return {
    ts: curTheme.languageIds.typescript,
    tsx: curTheme.languageIds.typescriptreact,
    js: curTheme.languageIds.javascript,
    csproj: '_project',
    config: curTheme.languageIds.xml
  };
}

export function fileExtensionToIcon(path: string, theme: 'dark' | 'light'): IconDefinition {
  const ext = (pathExt(path) || '').toLowerCase();
  const cur = theme === 'dark' ? SetiTheme : SetiTheme.light;
  const _default = theme === 'dark' ? '_default' : '_default_light';
  const fileExtensionIcons = fileExtensionToIconIds(cur);
  const iconId = cur.languageIds[ext] || cur.fileExtensions[ext] || fileExtensionIcons[ext] || _default;

  return SetiTheme.iconDefinitions[iconId];
}

export function iconDefinitionToStyle(icon: IconDefinition, theme: 'dark' | 'light'): IStyle {
  const cur = theme === 'dark' ? SetiTheme : SetiTheme.light;

  return {
    color: icon.fontColor || SetiTheme.iconDefinitions[cur.file].fontColor,
    selectors: {
      '&:before': {
        fontFamily: 'seti',
        content: JSON.stringify(String.fromCharCode(parseInt(icon.fontCharacter.substr(1), 16))),
        fontSize: SetiTheme.fonts[0].size
      }
    }
  };
}
