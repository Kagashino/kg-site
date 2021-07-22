## 目的  
实现一个高光文字组件，如下图：
![image.png](https://upload-images.jianshu.io/upload_images/3132311-0c5c89f325bf3bac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

指定关键字“小明”，全文匹配关键字并高光显示

## 要求
除了React本身和JSX，**不借助任何第三方依赖，也不能直接操作DOM**
## 思路
我这里使用切片法，将高亮文本头尾切割，文本变数组，当匹配到高亮文字时，文本替换成JSX。  
需要说明的是，JSX是`React.createElement`的语法糖。如果你熟悉`React.createElement`函数的用法，那么就可以结合JavaScript原生的**正则、数组**等方法，很容易就能构造出高光组件。

参考上图，截取上面一段文本举例
> 他叫小明，是一个普通的程序员

我们的目标是把文本中出现的【小明】高亮显示，把刚才的方法总结一下，我们拆解出如下步骤：
1. 将文本中的小明分离出来，并和其他文本一起并入一个数组：
```
// 从
"他叫小明，是一个普通的程序员"
// 变成
[
  "他叫",
  "小明", // 这就是分离出来的小明
  "，是一个普通的程序员"
]
```
2.遍历数组，如果匹配到【小明】，则把他替换成`React.createElement`函数，效果如下：
```
[
  "他叫",
  React.createElement("span", { style: { color: "blue" } }, "小明")
  "，是一个普通的程序员"
]
```
或者使用JSX，效果相同：
```
[
  "他叫",
  <span style={{ color: 'blue' }}>小明</span>
  "，是一个普通的程序员"
]
```
3.用`React.createElement`创建一个`div`作为父元素（当然你也可以使用Fragment碎片直接拼接），把数组作为children传过去：
```
React.createElement(
  'div',
  null,
  [
    "他叫",
    React.createElement("span", { style: { color: "blue" } }, "小明")
    "，是一个普通的程序员"
  ]
)
```
JSX等价代码：
```
<div>{[
    "他叫",
   (<span style={{ color: 'blue' }}>小明</span>),
    "，是一个普通的程序员"
  ]}</div>
```

不就是下面这段HTML了？
```
<div>
    他叫<span style="color: blue">小明</span>，是一个普通的程序员
</div>
```

## 代码实现
老规矩，不熟悉Typescript的去补补课
```
type HighlightProps = {
  text: string,
  pattern: RegExp | string,
  flag?: string,
  matchClassName?: string,
  matchStyle?: { [key: string]: string }
}
/**
 * 高光组件
 * @param text {string} 文本
 * @param pattern { string | null| RegExp } 匹配单词/正则
 * @param flag 正则匹配模式
 * @param matchClassName 匹配文本class
 * @param style 匹配文本样式
 */
const WithHighlight = ({
                         text = '',
                         pattern = '',
                         flag = 'ig',
                         matchClassName = 'kg-highlight',
                         matchStyle = {}
}: HighlightProps) => {
  if (!pattern) {
    return null;
  }

  const re = new RegExp(pattern, flag); // 基于关键字构造正则

  if (!re.test(text)) {
    return (
      <div>{text}</div>
    )
  }
  const splitter = '\u0001\u0003' //  使用的特殊字符作为分割标记
  const matchArray = text
    .replace(re, m=>`${splitter}${m}${splitter}`) // 将匹配到的文字使用特殊字符包裹
    .split(splitter)
    .filter(Boolean) // 处理关键字在起始位置的时候留下的空字符串（这里不处理也可以）
  return (
    <div>
      {
        matchArray.map(node => {
          if (!re.test(node)) {
            return node;
          }
          return <span className={matchClassName} style={matchStyle}>{node}</span>
        })
      }
    </div>
  )
};
```

**使用**：按照规定传入参数即可
```
const HighlightIndex = () => {
  const [text, setText] = useState('他叫小明，是一个普通的切图仔，小明的爸爸让小明买两斤苹果，如果看到卖西瓜的就买一个...')

  return <div>
    <textarea
      rows={10}
      cols={110}
      defaultValue={text}
      placeholder="请输入带有【小明】的文本"
      onChange={(e)=>setText(e.target.value)} />
    <h3>效果</h3>
    <WithHighlight text={text} pattern="小明" matchStyle={{ color: '#6ae', fontWeight: 'bold' }} />
  </div>
}
```
