import { LocalizedStrings } from '../index';
import * as form from './form/strings.en.json';
import Strings from './res/strings';
import * as toolbar from './toolbar/strings.en.json';
import { combineReducers } from 'redux';

const _strings: LocalizedStrings = {
  ...Strings,
  form,
  toolbar
};

export default _strings;
