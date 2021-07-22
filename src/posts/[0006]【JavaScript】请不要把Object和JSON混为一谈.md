## 什么是JSON
```
{
  "name": "小徐",
  "experience": 2.5,
  "hobbit": ["唱歌","跳舞","打球","说唱"]
}
```
## 什么是Object
```
var o = {
  name: '小吴',
  age: 22,
  height: 185
}
```
## 为什么会被混为一谈
原因很简单：**这两个东西长得很像啊**，都有花括号/键值对，而且JSON就是由JavaScript衍生出来的格式，难免会傻傻分不清楚

然而作为一个较真的切图仔，不能这么马马虎虎地对待这方面的知识。我们把Object写成这样：
```
const o = {
  name: '小吴',
  age: Math.floor(Math.random()*10) + 20,
  height: 3*60+5,
  // 每涨一岁，就skr一次
  [Symbol.iterator]: function* () {
     let count = 0;
      while (count < this.age) {
        yield 'skr'
        count += 1;
      }
  },
}
```
这时候，你还会认为他是JSON吗？(JSON: 打扰了，告辞)
##  认祖归宗
Object是JavaScript中的键值对数据格式，与之同类的应该是Python中的字典、Golang中的map、Lua中的Table等基于键值对的**数据结构**
而`JSON`本质是**数据格式**（不是数据结构），他的同类应该是`xml`、`yaml`等用做存储和传输的数据格式。

Object包含了JSON，你可以**使用JSON表示JavaScript的Object**，但不能把应为Object长得像JSON（实际上是JSON像Object）而将两者混为一谈

## 拓展
当然JavaScript的Object有不同的写法，上面的Object可以这么写：
```
var o = new Object();
o.name = '小吴'
o.age =  Math.floor(Math.random()*10) + 20
// ...
```
这种写法和前者“花括号”定义对象的方式是等价的，我们重点说前者，也就是花括号的那种写法，有它自己的名字：
> # 对象字面量
**字面量(literal)**简单来说就是**表示某种数据结构文本格式**。打个比方，你想让JavaScript创建一个字符串，你需要输入`"hello word"`，花括号的内容就是`字符串字面量`。同理`[1, 2, 3]`就是`数组字面量`，而`{a:1, b:2}`，就是我们的主角：对象字面量。字面量的使用，能令我们的语言表达力更加直观和丰富，代码可读性更高。如果缺少某些类型的字面量(以缺少数组和对象字面量举例)，你的代码可能就会变成这样子：
```
var list = new Array()
for (var i = 0; i < 3; i++) {
  var descriptor = new Object()
  descriptror.value = i + 1;
  Object.defineProperty(list, i.toString(), descriptor)
}
```

## 对象字面量 vs. JSON
||对象字面量|JSON|
|:-:|:-:|:-:|
|定义|JavaScript中定义对象的一种格式|通用的轻量级数据交换格式|
|作用|定义一个JavaScript对象|将数据以键值对的形式读取、保存与传输|
|共同点|基于键值对、使用花括号`{}`包裹|
|数据类型|`key`为字符串，`value`接受所有JavaScript类型数据或者表达式|`key`为字符串，`value`可接受`数字`、`字符串`、`数组`、`布尔值`、`null`和嵌套的`JSON`|
|书写格式|key直接写，也可以使用单引号`''`、双引号`""`包裹，允许尾部添加逗号|key和`字符串value`，必须使用双引号`""`包裹， 其余value与JavaScript类型格式一致，不允许尾逗号|
|转换|对象转JSON：`JSON.stringify`|JSON转对象：`JSON.parse`|
