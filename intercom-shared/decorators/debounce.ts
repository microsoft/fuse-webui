import * as _ from 'underscore';
/**
 * debounce decorator
 *
 * @debounce(delay: number, immediate: boolean = true)
 * action()  {
 *    // do some real work
 * }
 */
// tslint:disable:no-invalid-this
export function debounce(delay: number, immediate: boolean = true) {
  return function (target: any, methodKey: string, descriptor: PropertyDescriptor) {
    let innerMethod = descriptor.value;
    descriptor.value = _.debounce(
      function () {
        return innerMethod.apply(this, arguments);
      },
      delay,
      immediate);

    return descriptor;
  };
}
