/* tslint:disable:no-use-before-declare */
import { MainNav, Waffle } from '@fuselab/ui-fabric/lib/mainNav';
import { initFontFaces, invertTheme, loadPreference } from '@fuselab/ui-fabric/lib/themes';
import { WithAuthActions, WithAuthAttributes } from '@fuselab/ui-fabric/lib/withAuth/withAuth';
import { initializeIcons } from '@uifabric/icons';
import { Fabric } from 'office-ui-fabric-react/lib-commonjs/Fabric';
import * as React from 'react';
import AppMain from '../appMain';
import classNames from './app.classNames';
/* tslint:enable:no-use-before-declare */

declare global {
  interface Window {
    cdnRoot: string;
  }
}

if (window.cdnRoot) {
  initFontFaces(`${window.cdnRoot}`);
}

// Register icons and pull the fonts from the default SharePoint cdn:
initializeIcons();
const pref = loadPreference();
// check theme
if (pref.theme === 'dark') {
  invertTheme();
}

const waffles = [
  //{ href: '/', iconName: 'Home' }
] as Waffle[];

export type AppAttributes = WithAuthAttributes;

export type AppProps = AppAttributes & WithAuthActions;

export const App = (props: AppProps) => (
  //tslint:disable-next-line
  <Fabric className={classNames(pref.theme === 'dark').root}>
    <MainNav waffles={waffles} />
    <AppMain />
  </Fabric>);
