import * as _ from 'underscore';

export function enumNames(enumType: object): string[] {
  return Object.keys(enumType).filter(x => _.isNumber(enumType[x]));
}

export function enumStringMap(enumType: object): { [key: string]: string } {
  return _.object(enumNames(enumType).map(x => [x, x]));
}
