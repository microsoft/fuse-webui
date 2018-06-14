
import { Localized } from '../../index';

interface Strings {
  common: {
    ok: Localized;
    cancel: Localized;
    buttons: {
      save: Localized;
      add: Localized;
    };
  };
  user: {
    lastName: Localized;
    firstName: Localized;
  };
}

import * as _strings from './strings.en.json';

export default <Strings>_strings;
