import * as _ from 'underscore';

export function parseCookie(cookieText: string): { [key: string]: string } {
  const decoded = decodeURIComponent(cookieText);

  return _.object(decoded.split(/;\s?/).map(x => x.split('=')));
}
