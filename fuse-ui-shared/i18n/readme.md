# i18n (Internationalization) support

## Goals

1. Lower friction of adding i18n
1. Reuse existing i18n localizations for common terms

```typescript
import __ from '@fuselab/ui-shared/i18n';
import res from './{module}.loc';

export function getErrorMesssage(context: Context, e: Error) {
  if (isUserError(e)) {
    // use __() to load localized resource with key path useError
    return __(res.userError, context.User.Name);
  }

  if (isStorageError(e)) {
    // localization spec to be extracted by i18n build process
    return __({
      key: 'storageError',
      value: 'There is an error in storage {0}',
      comment: 'error Message for storage unit {0} is the storage unit name',
      example: 'There is an error in storage S03'
    });
  }

  if (isServerError(e)) {
    // reuse merged error
    return __(res.common.serverError);
  }
  // wrap string literal in __() to mark
  // for loc extraction
  return __('there is an error');
}
```

## loc.ts declaration format

```typescript
interface _Loc {
  userError: Localized,
  formTips: {
    number: Localized,
    date: Localized
  }
}
const _loc: Loc;
export default _loc;
```

## res.{locale}.json format
the following keys are reserved

<kbd>value, comment, example</kbd>

```json
 {
  userError: {
    value: 'You need to import a valid image',
    comment: <comment to localization provider/vendor>,
    example: <optional example to help loc vendor>
  },
  // support nesting
  formTips: {
    comment: 'tool tips for setup channel',
    number: {
      value: 'integer from {0} to {1}',
      comment: 'input must be number from {0} to {1}',
      example: 'input must be number from 1 to 256'
    },
    date: {
      value: 'Date of the activation',
    }
  }
}
```

## i18n build

1. Use ts-loader's custom transformer support to extract marked calls to __(), then merge them into the local {module}.loc.ts and the default {module}.{default_locale}.json

2.
