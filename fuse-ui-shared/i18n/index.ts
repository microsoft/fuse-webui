import * as _ from 'underscore';

//tslint:disable:no-reserved-keywords
export interface Localized {
  value: string;
}

export interface LocalizationSpec {
  key: string;
  value: string;
  comment?: string;
  example?: string;
}

function isSpec(x: object): x is LocalizationSpec {
  return Object.keys(x).indexOf('key') >= 0;
}

const templateRegex = /\{([0-9]+)\}/g;

export function formatString(fmt: string, ...args: any[]): string {
  if (args.length === 0) {
    return fmt;
  }

  let match = templateRegex.exec(fmt);
  let cur = 0;
  let sb = [];
  while (match) {
    if (match.index > cur) {
      sb.push(fmt.substr(cur, match.index - cur));
    }
    const arg = args[parseInt(match[1], 10)];
    if (_.isDate(arg)) {
      sb.push(arg.toISOString());
    } else {
      sb.push(arg);
    }
    cur = match.index + match[0].length;
    match = templateRegex.exec(fmt);
  }
  templateRegex.lastIndex = 0;

  if (cur < fmt.length) {
    sb.push(fmt.substr(cur));
  }

  return sb.join('');
}

//tslint:disable-next-line
export function __(arg: string | Localized | LocalizationSpec, ...rest: any[]): string {
  if (_.isString(arg)) {
    return formatString.apply(null, [arg, ...rest]);
  }
  if (isSpec(arg)) {
    // throw if we are running in production env
  }

  return formatString.apply(null, [arg.value, ...rest]);
}
