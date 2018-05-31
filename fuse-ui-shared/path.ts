import * as _ from 'underscore';
export function pathExt(path: string): string {
  const index = path.lastIndexOf('.');
  if (index >= 0) {
    return path.substr(index + 1);
  }

  return null;
}

const pathSeparators = /[\\\/]/;

export function baseName(path: string): string {
  return _.last(path.split(pathSeparators).filter(x => x));
}
