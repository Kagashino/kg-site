
/**
 * create a throttle callback
 * @param callback
 * @param delay
 * @param thisArg
 */

// eslint-disable-next-line import/prefer-default-export
export const createThrottle = (callback: Function, delay?: number, thisArg?: unknown): Function => {
  let lastInvokeTime: number = Date.now();
  const invokeDelay = Number(delay) || 200;
  return (...args: any[]): void => {
    const now = Date.now();
    if (now - invokeDelay <= lastInvokeTime) {
      return;
    }
    lastInvokeTime = now;
    callback.call(thisArg, ...args);
  };
};
