import * as _ from 'underscore';

export enum Scheme {
  http,
  https
}

export interface Url {
  scheme: Scheme;
  hostname: string;
  port?: number;
  path: string;
  query: string | { [key: string]: string };
  format(): string;
}

// regex to split urls into components
const urlregex = /^(http:\/\/|https:\/\/)([^:\/]+)(:[0-9]+){0,1}(\/[^?]*){0,1}(\?[^#]*){0,1}/;

// tslint:disable:no-invalid-this
export function parseUrl(url: string): Url {
  let matches = urlregex.exec(url);
  if (matches) {
    const schemestring = matches[1].substr(0, matches[1].length - 3);
    const host = matches[2];
    const port = matches[3];

    return {
      scheme: Scheme[schemestring],
      hostname: host,
      port: port ? parseInt(port.substr(1), 10) : undefined,
      path: matches[4],
      query: matches[5] ? parseQuery(matches[5].substr(1)) : undefined,
      format: function () { return formatUrl(this); }
    };
  }

  return null;
}
// tslint:enable:no-invalid-this

export function parseQuery(query: string): { [key: string]: string } | undefined {
  if (!query) {
    return undefined;
  }

  return _.object(_.map(query.split('&'), exp => {
    return _.map(exp.split(/=(.+)?/, 2), (v, i) => i === 0 ? v : decodeURIComponent(v));
  }));
}

function formatUrl(url: Url): string {
  let querystring = '';
  if (url.query) {
    querystring = `?${_.isString(url.query) ? url.query : formatQuery(<any>url.query)}`;
  }
  let schemestring = _.isString(url.scheme) ? url.scheme : Scheme[url.scheme];

  return `${schemestring}://${url.hostname}${_.isUndefined(url.port) ? '' : `:${url.port}`}${url.path || ''}${querystring}`;
}

export function formatQuery(obj: { [key: string]: any }): string {
  return Object.keys(obj).map(k => `${k}=${encodeURIComponent(obj[k])}`).join('&');
}
