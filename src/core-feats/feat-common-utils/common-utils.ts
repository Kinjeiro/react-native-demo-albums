/*
  @NOTE: Many libs from my own utils - https://github.com/Kinjeiro/front-core/blob/master/src/common/utils/common.js
*/

import lodashMemoize from 'lodash/memoize';
import lodashSet from 'lodash/set';
import lodashCloneDeep from 'lodash/cloneDeep';

export const memoize = lodashMemoize;

export function generateNumberId(length = 7) {
  // current timestamp 1543988290855 - 13
  const numId = Math.floor(new Date().valueOf() * Math.random());
  let numIdStr = `${numId}`;
  while (numIdStr.length < length) {
    numIdStr += '0';
  }
  return parseInt(numIdStr.substr(0, length), 10);
}

export function isClass(v: Object) {
  if (!v) {
    return false;
  }
  const toString = v.toString();
  return typeof v === 'function' && (
    // babel
    // _classCallCheck не используется при компиляции на продакшен и падает "Cannot call a class as a function"
    toString.indexOf('_classCallCheck') >= 0
    || toString.indexOf('__proto__||Object.getPrototypeOf') >= 0
    // es6
    || /^\s*class\s+/.test(toString)
  );
}

export function executeVariable(fn: any, defaultValue = undefined, ...args: any[]) {
  return isClass(fn)
    //@ts-ignore
    //eslint-disable-next-line
    ? new fn(...args)
    : typeof fn === 'function'
      ? fn(...args)
      : typeof fn === 'undefined' || fn === null
        ? defaultValue
        : fn;
}

export const executeVariableMemoize = memoize(
  (key, fn, defaultValue, ...args) => executeVariable(fn, defaultValue, ...args),
);

export function setInDeepReducer<T extends Object>(
  origin: T,
  path: string | string[],
  mergedDataOrFn: ((origin: T, path: string | string[]) => any) | any,
  options: { cloneOrigin: boolean } = { cloneOrigin: true },
): T {
  return lodashSet(
    options.cloneOrigin ? lodashCloneDeep(origin) : origin,
    path,
    executeVariable(mergedDataOrFn, undefined, origin, path),
  );
}
