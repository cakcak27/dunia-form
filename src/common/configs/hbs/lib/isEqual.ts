import type { HelperOptions } from 'handlebars';

export const isEqual = function (arg1: null|string, arg2: null|string, options?: HelperOptions): boolean {
  return arg1 == arg2;
};
