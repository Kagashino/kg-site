最近在把玩React Hooks，感觉用起来是真的流畅，不得不说Hooks刷新了我对于封装组件的体验，趁着手热，赶紧写了一个【回到顶部】的组件来试试水
这篇文章默认各位已经熟悉以下知识点：
`React`  
`React Hooks`  
`Typescript`（用法很简单，不熟悉其实也能看得懂）  
不了解的请先参阅官方文档；

## 正文
【回到顶部】是许多网页非常常用的按钮，通常放在长页面的右下角，点击可以直接让页面回到顶端。
要实现这个组件，需要以下几个要点：
- 按钮定位设置为`position: fixed;`，并且设置位置到屏幕右下角；
```scss
.top-jumper {
  position: fixed;
  right: 11%;
  bottom: 15%;
  width: 42px;
  height: 42px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;

  &:before {
    content: '▲';
    display: block;
    text-align: center;
    color: #aaa;
    line-height: 42px;
  }
  &:hover:before {
    content: '回顶部';
  }
}
```
- 编写最基本的组件结构
```
import React from 'react';
import './TopJumper.scss'

function TopJumper() {
  return (
    <div className="top-jumper" onClick={()=>window.scrollTo(0, 0)}>
      <span className="text"> </span>
    </div>);
}

export default TopJumper;
```
- 当然，一般来说如果页面在顶部，按钮是不显示的，我们需要监听滚动事件，等到页面下拉到一定高度再显示，现在我们结合`state hooks`和`effect hooks`控制按钮的显隐：
```
import React, { useEffect, useState } from 'react';
import './TopJumper.scss'

function TopJumper() {
  const [show, switchShow] = useState(false); // 设置状态

  useEffect(()=>{
    const listener = ()=>{
        switchShow(window.scrollY > 300)
    } as EventListener;
    document.addEventListener('scroll', listener);
    return ()=>document.removeEventListener('scroll', listener); // 组件销毁后，取消监听
  }, [show] /* 依赖记得给上，否则死循环 */)

  return show ? (
    <div className="top-jumper" onClick={()=>window.scrollTo(0, 0)}>
      <span className="text"> </span>
    </div>) : null;
}

export default TopJumper;
```
你以为这就完了？非也。但如果你是“又不是不能用”星人，那么下面的内容对你来说已经没用了！  
作为一个资深切图仔，应该察觉到上面那段代码是不完美的，原因就在于浏览器滚动事件调用得太频繁了，会造成一定的性能问题。
我们得实现一个节流函数：
```
/**
 * create a throttle callback
 * @param callback
 * @param delay
 * @param thisArg
 */
export const createThrottle = (
  callback: Function, 
  delay?: number, 
  thisArg?: unknown
): Function =>{
  let lastInvokeTime: number = Date.now();
  const _delay = Number(delay) || 200
  return (...args: any[]): void=>{
    const now = Date.now()
    if (now - _delay <= lastInvokeTime) {
      return;
    }
    lastInvokeTime = now;
    callback.call(thisArg, ...args)
  }
}
```
改造我们的`listener`
```
const listener = createThrottle(()=>{
  switchShow( window.scrollY > 300 )
}, 500) as EventListener;
```
**最后一步优化：**仔细体会一下shouldShow的逻辑，跟上面的有何不同。
```
const listener = createThrottle(()=>{
  const shouldShow = window.scrollY > 300;
  if (shouldShow !== show) {
    switchShow(shouldShow)
  }
}, 500) as EventListener;
```

这下才是完全体：

```JavaScript
import React, {useEffect, useState} from 'react';
import {createThrottle} from "./index";
import './TopJumper.scss'

function TopJumper() {
    const [show, switchShow] = useState(false);
    useEffect(() => {
        const listener = createThrottle(() => {
            const shouldShow = window.scrollY > 300;
            if (shouldShow !== show) {
                switchShow(shouldShow)
            }
        }, 500)
        as
        EventListener;
        document.addEventListener('scroll', listener);
        return () => document.removeEventListener('scroll', listener);
    }, [show])

    return show ? (
        <div className="top-jumper" onClick={() => window.scrollTo(0, 0)}>
            <span className="text"></span>
        </div>) : null;
}

export default TopJumper;
```
## 写了半天，不给我们看看效果吗？
您好，有的： [http://www.kgshino.com](http://www.kgshino.com)

**最后的彩蛋**：css中对`html`跟元素添加`scroll-behavior: smooth;`属性，实现网页平滑滚动（不兼容低版本的浏览器）
```
html {
  scroll-behavior: smooth;
}
```
