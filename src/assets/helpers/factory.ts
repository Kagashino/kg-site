import { stringify } from 'querystring';

/**
 * create a throttle callback
 * @param callback
 * @param delay
 * @param thisArg
 */

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


type QsInput = { [key: string]: any }
/**
 * 加载css/js资源
 * @param url 资源url地址
 * @param query 查询参数，可用作刷新缓存
 */
export const loadResource = async (
  url: string,
  query?: QsInput,
) => new Promise((resolve, reject) => {
  const suffix = url.substr(url.lastIndexOf('.') + 1);
  const appliedUrl = `${url}${query ? `?${stringify(query)}` : ''}`;
  console.log('url,aapppp', appliedUrl);
  if (suffix === 'js') {
    const scripts = Array.from(document.scripts).map((s) => s.src);
    if (scripts.some((src) => src === appliedUrl)) {
      resolve();
      return;
    }
    const newScript = document.createElement('script');
    newScript.src = appliedUrl;
    newScript.onload = resolve;
    newScript.onerror = reject;
    document.body.appendChild(newScript);
  } else if (suffix === 'css') {
    const styles = Array.from(document.styleSheets).map((link) => link.href);
    if (styles.some((link) => link === appliedUrl)) {
      resolve();
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = appliedUrl;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  }
});

/**
 * 不中断批量加载css/js资源
 * @param resources { string[] } 资源列表
 * @param query { Object } 查询参数
 * @return Promise<{ failures: string[] }> 加载失败的脚本
 */
export const batchLoadResources = (
  resources: string[],
  query?: QsInput,
) => new Promise<{ failures: string[] }>((resolve) => {
  let remaining = resources.length;
  const failures: string[] = [];
  resources.forEach(async (url) => {
    try {
      await loadResource(url, query);
    } catch (e) {
      failures.push(`${url}${query ? `?${stringify(query)}` : ''}`);
    } finally {
      remaining -= 1;
      if (remaining <= 0) {
        resolve({
          failures,
        });
      }
    }
  });
});
