
export default function () {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  // eslint-disable-next-line no-underscore-dangle
  window._hmt = window._hmt || [];
  const hm = document.createElement('script');
  hm.src = `https://hm.baidu.com/hm.js?${process.env.REACT_APP_STATISTIC_ID}`;
  const s = document.getElementsByTagName('script')[0];
  if (!s || !s.parentNode) {
    return;
  }
  s.parentNode.insertBefore(hm, s);
}
