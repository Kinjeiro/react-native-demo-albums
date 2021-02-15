/**
 * Determine whether the given `promise` is a Promise.
 * @param {*} promise
 * @returns {Boolean}
 */
export function isPromise(promise: any) {
  //return !!promise && typeof promise.then === 'function';
  return promise instanceof Promise;
}

export async function sleep<R>(ms: number, result?: R): Promise<R> {
  return new Promise((resolve) => setTimeout(resolve, ms, result));
}
