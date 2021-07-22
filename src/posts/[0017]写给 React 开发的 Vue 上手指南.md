# 写给 React 开发的 Vue 上手指南

## 前言

Vue 和 React 是前端三大流行框架之二，它们在国内有多流行，不必解释。本人呆过不少团队，选择 Vue 的团队对 Vue 的第一印象是：简单、易上手。那么 Vue 是否真的如众多开发者所说的那么简单？能否让一个 React 前端程序猿快速上手？本文会从 React 开发的视角入手，介绍 Vue 的简单使用、特性和对比。

本文适合以下类型的读者：

- 被上司逼着换 Vue 框架的 React 程序猿
- 精力旺盛想尝试 Vue 的 React 程序猿
- Vue 、 React 浅度使用，想深入了解其中一项的程序猿

阅读本文需要掌握以下知识：

- 理解 this 指向
- 理解 ES6 的 class 、 解构赋值和箭头函数等语法

另外，如果觉得看文档更加方便，这里提供传送门： https://cn.vuejs.org/index.html

## Vue 简介

来看看官网如何定义 Vue：
> 渐进式 JavaScript 框架

何为渐进式：与开箱即用相反，框架的规模根据你期望的项目规模灵活配置。Vue 本体只提供最基本的数据 - 视图渲染功能，如果想使用模块化开发，可以借助 `@vue/cli` ，如果想引入路由，可以添加 `vue-router`，如果想引入全局状态管理，可以添加 `vuex` ...如果这些还不能满足，还可以引入第三方或者自己编写的插件。**Talk is cheap, show you the code**，下面开始讲解代码：

## 极简体验
把下面这段代码保存成 `.html` 文件，在浏览器打开就能看到效果（得联网）:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Simple Vue</title>
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
</head>
<body>
  <div id="app"></div>
  <script type="text/javascript">

    const template = `<h3>{{ message }}</h3>`;

    new Vue({
        data() {
          return {
            message:; 'Hello Vue!'
          }
        }
    }).$mount('#app')
  </script>
</body>
</html>
```
效果大概就是：
> ### Hello Vue!

这种使用方式，类似于 `jQuery`，只要引入 `vue` 脚本，就能立马开发。

## 直观对比

如果需要模块化开发，单单在 html 里写 vue 代码是很吃力的。让我们看看借助脚手架工具创建的单文件组件的写法：
这次简单点，实现一个只有标题和名称的表单：
使用 React 可以这么写：

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cart extends Component {
  // 属性类型检查
  static propTypes = {
    title: PropTypes.string;
  }
  // 组件的状态
  state = {
    name: 'John Smith'
  }

  onChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  submit = () => {
    alert(`你的名字是: ${state.name}`)
  }

  // 渲染视图
  render() {
    const {
      props: { title },
      state: { name },
      onChange,
      submit
    } = this;

    // JSX 模板
    return (
      <div>
        <h3>{title}</h3>
        <input value={name} onChange={onChange} />
        <button onClick={submit}>提交</button>
      </div>
    )
  }
}
```

可以，这很 OOP ，接下来看看 Vue 怎么写：
```jsx
<template>
  <div>
    <h3>{{title}}</h3>
    <input v-model="name" />
    <button @click="submit">提交</button>
  </div>
</template>
<script>
export default {
  // 声明属性
  props: {
    title: String
  },
  // 声明状态
  data() {
    return {
      name: "John Smith"
    }
  },
  // 回调
  methods: {
    settle() {
      alert(`下单成功，总价: ${this.total}`)
    }
  },
}
</script>
```

一板一眼的，看起来非常规律，看起来很像在写 `html`。这里简单介绍一下 Vue 组件的特点：
1. Vue 的组件以单文件形式存在，文件后缀为 `.vue` ，JavaScript 逻辑部分变成了配置式的写法。
2. `template` 以双花括号`{{}}` 作占位符，用以插入表达式
3. 标签属性比 `JSX` 复杂，但实现的功能也比较多。
4. 代表状态的 `data` 属性居然要写成一个函数，原因参考下文。

## 概念梳理

### 介绍 Template

`template` 是 Vue 用来组成 UI 视图的模板语法。有两种使用方式：
- 如果使用脚手架创建的工程化 Vue 项目，可以新建 .vue 文件编写：
```jsx
<template>
  <div class="my-div">
    这是一个 .vue 文件，代表一个组件
  </div>
</template>
<script>
    // JavaScript 逻辑
    export default {}
</script>
<style>
    /* 此处可以编写 CSS */
    .my-div {
        width: 300;
        height: 100;
    }
</style>
```
Vue 会通过编译工具，把上述代码编译成 JavaScript 代码。

- 如果在纯 JavaScript 中使用，那么 template 要写成字符串形式：
```javascript
const MyComp = {
    template: `<div class="my-div">这也是一个 vue 组件</div>`
}
```

值得一提的是： `template` 不会直接变成 `html` ，而是会变成一个 `render` 函数，拿上文的 MyComp 的 template 举例，编译以后大概会长成这样：
```javascript
{
  render(createElement) {
    return createElement('div', { staticClass: 'my-div'}, '这也是一个 vue 组件')
  }
}
```
下文会对 `render` 函数进行进一步介绍

#### Template 指令

指令是 Vue 特殊的属性，借助 Vue 丰富的指令，可以完成很多数据与视图交互功能：

##### v-bind —— 表达式绑定指令
普通的属性会当作字符串处理，而 `v-bind` 则会解析其中的 JavaScript 表达式
```jsx
<my-comp v-bind:value="myValue * 2" />
```
其中 `myValue` 是你定义的变量可以来自于组件上的 `data` 、 `props` 、`methods` 等。
不过 `v-bind` 太长了，一般会省略掉，可以简写成：
```jsx
<my-comp :value="myValue * 2" />
```

##### v-on —— 回调绑定指令
跟 `v-bind` 差不多， `v-on` 用来绑定回调：
```jsx
<my-comp v-on:change="handleChange" />
<!-- 可以传入参数，并且不会立即执行 -->
<my-comp v-on:change="handleChange(1, 2, 3)" />
```
简写：
```jsx
<my-comp @change="handleChange" />
```

##### v-model —— 双向绑定指令
这是一条复合指令，用来对表单元素或者自定义组件的双向绑定，一般在 `input`、 `textarea` 等表单元素中使用：
```jsx
<input v-model="inputValue" />
```
等价于
```jsx
<input :value="inputValue" @input="e => inputValue = e.target.value" type="text" />
```


##### v-for —— 循环指令
常用于列表渲染，记得带上 key
```jsx
<li v-for="(item, index) in list" :key="item.id">{{index}} - {{item.name}} </li>
```
除了数组，对字符串、对象同样可以使用，甚至还可以直接写个数字表示循环次数。
```jsx
<span v-for="num in 6">{{num}}</span>
```

##### v-if/v-else —— 条件渲染指令
顾名思义，通过条件决定元素渲染与否
```jsx
<div v-if="scrore >= 100">你是满分</div>
<div v-else-if="scrore >= 60">你及格了</div>
<div v-else>你挂了</div>
```
注意： v-if 为 false 时 vue 会直接跳过这个节点，如果想要渲染一个样式为 `display: none` 的元素，可以使用 v-show 指令

```jsx
<div v-show="false">我在 HTML 中，但是 display 为 none</div>
```

#### 子节点渲染

如同 JSX 中的 `children` , `template` 中的字节的需要使用 `slot` （插槽）作为占位：
```jsx
<div> this is default <slot></slot> </div>
<!-- 还可以绑定带有命名空间的插槽 -->
<div> this is named <slot name="bar"></slot><div>
```
父节点传入：
```jsx
<!-- this is default child node -->
<Foo>
    <span> child node </span>
</Foo>

<!-- this is named bar node -->
<Foo>
    <span slot="bar"> bar node </span>
</Foo>
```

### 如果不用 Template
尽管 `template` 能覆盖绝大部分视图场景，但 `template` 并不是唯一的选择。 Vue 组件 API 中提供了一个 `render` 函数选项，用 JavaScript 的方法直接创建虚拟 DOM：
```javascript
export default {
    render(createElement) {
        return createElement('h3', null, 'Hello Vue!')
    }
}
```
emmmm... 标签 属性 子节点...有没有似曾相识的感觉？没错，如果 React 不借助 JSX ，也是在 `render` 方法中调用 `createElement` 创建虚拟 DOM ，那么问题来了：能不能使用 JSX 来编写 Vue 组件？
答案是**能**，借助 `@vue/babel-preset-jsx` 这个 babel 插件，就能实现 JSX 编写 Vue 组件视图，详情参考：https://cn.vuejs.org/v2/guide/render-function.html#JSX

### 一言难尽的 this —— Vue 篇
`this` 真是一个令人又爱又恨的东西，好在 Vue 组件中，绝大部分方法都会把 this 指向当前组件，并且不需要区分 `props` 、`data` （直接 `this.xxx` 一把梭）：
```javascript
export default {
    props: {
        propA: Number,
        propB: String,
    },
    data() {
        console.log(this.propA); // propA 传入的值
        console.log(this.propB); // propB 传入的值
        return {
            dataA: 'a',
            dataB: 'b',
        }
    },
    methods: {
        getDataA() {
            return this.a;
        },
        getPropA() {
            return this.propA;
        },
        getMethodA() {
            console.log(this.getDataA); // function
            console.log(this.getPropA); // function
        }
    },
    // ....
}
```
注意：**箭头函数的 this 不会如你预期的指向当前组件**，除了 `data` 第一个参数可以访问当前组件，直接把方法写成箭头函数， `this` 会乱飘：
```JavaScript
export default {
    props: {
        count: Number,
    },
    data: context => ({
        doubleCount: context.count * 2 // work , context 指向当前组件
    }),
    methods: {
        // bad， this 不对
        badTripleCount: () => this.count * 3;
    }
}
```
不过在方法作用域内部使用箭头函数是可以的，这点得区分开来

```javascript
export default {
    data() { return { user: '' } }
    methods: {
        // funtion
        getUser() {
            console.log(this.user); // ''
            fetch('/user').then(res => {
                this.user = res;
                console.log(this.user); // res valule
            })
        }
    }
}
```
除了 `data` 、 `methods` 以外， `watch` 、 `computed` 或者部分声明周期钩子回调， this 同样指向当前组件。
如果你不喜欢 `this`， 可以尝试 [Composition API](https://v3.vuejs.org/api/composition-api.html#composition-api)

### 组件的状态 —— data

在 React 中，组件的状态放在 state 中，修改状态需要调用 `setState` ，且最好使用新的对象代替：
```javascript
class Foo extends Component {
  state = {
    list: [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
      { id: 3, name: 'baz' },
    ]
  }

  removeItem(id) {
    const { list } = this.state;
    this.setState(list.filter(i => i.id !== id))
  }
}
```

在 Vue 中，组件的状态叫做 `data` ，但是绝大部分更新都可以由直接对属性赋值完成：

```javascript
export default {
  data() {
    return {
      a: 1,
      list: [1,2,3]
    }
  },
  methods: {
    setA(num) {
      this.a = num;
    },
    appendToList(num) {
      this.list.push(num);
    }
  }
}
```

至于实现原理，可以移步下文 **响应式数据**。

### 单向数据流

同 React 一样，来自父组件的状态称为 `Props` ，且子组件不要直接修改父组件传入的状态：

```javascript
export default {
    props: {
        title: String,
    },
    methods: {
        badSetTitle() {
            // BAD, 不要直接修改
            this.title = '????'
        }
    }
}
```

如果硬要修改，请使用 `Props` 回调：
```javascript
export default {
  props: {
    value: String,
    onChange: Function
  },
  methods: {
    setValue(value) {
      this.onChange(value);
    }
  }
}
```

父组件通过传入 `onChange` 回调实现修改：
```jsx
<template>
  <MyComp :value="myValue" :onChange="handleChange" />
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        myValue: ''
      }
    },
    methods: {
      handleChange(value) {
        this.myValue = value
      }
    }
  }
</script>
```

或者使用 Vue 约定的事件更新语法糖：

```javascript
export default {
  props: {
    title: String,
  },
  methods: {
    setTitle() {
      this.$emit('update:title', '???')
    }
  }
}
```
然后父组件传入的 `prop` 也要做一次处理：
```jsx
<!-- title 属性追加 .sync 修饰保证 update 事件生效 -->
<MyComponent title.sync="title" />
```

注意：**这种方法将在 Vue3.0 废弃** 。  
还有一种办法是：把 value 和 onChange 封装成 v-model （抱歉，template 编译就是可以为所欲为）：

```jsx
<template>
  <input placeholder="type something" value="value" @change="e => onChange(e.target.value)" />
</template>
<script>
  export default {
    model: {
      value: 'value',
      event: 'change'
  }
}
</script>
```

父组件中就可以一条 v-model 搞定：
```jsx
<my-input v-model="myValue" />
<!-- 等价于 -->
<my-input :value="myValue" @change="e => myValue = e.target.value" />
```

### 生命周期钩子

组件不是一个持久化的东西，从创建、更新到销毁，每一个 timing 都可以处理一些逻辑，下面列举几个常用的生命周期钩子：
- `beforeCreate` Vue 向组件实例组件挂载 `data` 、 `props` 等状态之前调用
- `created` 组件挂载 `data` 、 `props` 等状态之后调用，可以在此处发起网络请求获取数据
- `mounted` 对应 `componentDidMount` 组件第一次完成 DOM 渲染后的回调，可以在此处发起网络请求获取数据
- `updated` 对应 `componentDidUpdate` 组件更新完毕后调用，由于 Vue 响应式机制，这个方法大部分的场景会被 `watch` 替代。
- `beforeDestroy` 对应 `componentWillUnmount` 组件销毁之前的回调，通常用来清除计时器、某些原生监听事件等操作。


其他诸如 `beforeMount` 、 `actived` 、 `destoryed` 等钩子的用法可以参考 https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90

## 特性
讲完了对比，接下来讲 Vue 的一些特性：

### 响应式数据

如果你对响应式属性不熟悉，看到赋值也能触发更新，可能会觉得不可思议。事实上 Vue2.x 版本借助了 `Object.defineProperty` 方法，对响应式数据的 `get` 和 `set` 做了一层拦截处理，使得状态在赋值的时候触发了更新回调，从而进行更新操作。

```javascript
let valueA = 1;

let data = {};

Object.defineProperty(data, 'a', {
  get() { 
    console.log('获取 data.a')
    return valueA 
  },
  set(newVal) {
    console.log('更新 data.a')
    valueA = newVal;
  }

}) // data 此时为 { a: 1 }

data.a // 输出 "获取 data.a"
data.a = 100 // 输出 "更新 data.a"
```
尽管 `Object.defineProperty` 能让更新更符合直觉，但是这个 API 也有它的局限性：
- 只能检测对象属性的更新，无法检测对象属性的添加和删除，上文如果直接进行 `data.b = 1` 赋值或者 `delete data.a` 删除， set 回调是不会触发的。需要借助 `Vue.set(data, 'b', 1)` 和 `Vue.delete(data, 'a')` 进行显式的添加和删除。
- 对于数组的 `push` 、 `pop` 、 `splice` 等改变原数组的方法，Vue 会隐式重写他们，使得我们直接对数组调用这些方法能够正常被监听。

在 Vue3.x 中，使用了 `Proxy` API 替代了 `Object.defineProperty` ：
```javascript
const data = { a: 1 };

const proxyData = new Proxy(data, {
  get(obj, key) {
    console.log('获取 data.a')
    return obj[key];
  },
  set(obj, key, value) {
    console.log('更新 data.a')
    obj[key] = value;
  }
})

const proxyArray = new Proxy([1, 2, 3], {
  get(obj, key) {
    console.log('获取 array[key]')
    return obj[key];
  },
  set(obj, key, value) {
    console.log('更新 array[key]')
    obj[key] = value;
  }
})

```

`Proxy` 能更加优雅地拦截对象的变更，解决了无法对属性增删和拦截数组的问题，而且不需要对每一条属性进行拦截，在一定程度上减少了监听数据的开销。  
相比于 React ， Vue 能更细致地追踪数据的变化，尽可能减少组件更新的粒度。

#### data 应该是一个函数
看了之前的几段代码你也许注意到一个问题： data 为什么是一个函数？
这是为了避免在创建多个组件时，引用相同的 data 导致多个组件的 data 相互影响：
```JavaScript
const MyComponent = {
  data: {
    a: 1
  }
}

// 实例化组件的伪代码
const initComponent(comp) {
  const compInstance = {};

  for(const key in comp.data) {
    compInstance[key] = data[key];
  }

  return compInstance;
}

const comp1 = initComponent(MyComponent)
const comp2 = initComponent(comp1)

comp1.a = 2;
console.log(comp1.a); // 2
console.log(comp2.a); // 2
```

如何避免上述问题？你可能会想到对组件深拷贝，但是这样会造成不必要的性能浪费，为了优雅地解决这个问题，我们约定： data 应该做成一个返回对象的函数：
```JavaScript
const MyComponent = {
  data() {
    return {
      a: 1
    }
  }
}

// 实例化组件的伪代码
const initComponent(comp) {
  const compInstance = {};

  for(const key in comp.data()) {
    compInstance[key] = data[key];
  }

  return compInstance;
}

// ...

console.log(comp1.a); // 2
console.log(comp2.a); // 1
```

### DOM 的异步更新
同 React 一样， Vue 也会创建虚拟 DOM ，并且通过一系列的 Diff 算法和 Patch，把虚拟 DOM 转变成真实 DOM ，那么 Vue 中真实 DOM 什么时候更新呢？答案是状态变更后，借助 JavaScript 事件循环机制，在下一个微任务进行异步更新：
```jsx
<template>
  <div id="msg">{{ message }}</div>
</template>
<script>
export default {
  data() {
    message: 'hello world'
  },
  setData() {
    document.getElementById('msg').innerHTML // 'hello world';

    this.message = 'goodbye world';
    // 此时 DOM 尚未更新
    document.getElementById('msg').innerHTML // 'hello world';

    // 下一轮微任务的回调， DOM 已然更新
    this.$nextTick(() => {
      document.getElementById('msg').innerHTML // 'goodbye world';
    })

    // 噢，是个宏任务，已经更新很久了
    setTimeout(() => {
      document.getElementById('msg').innerHTML // 'goodbye world';
    }, 0)
  }
}
</script>
```

## 小结
本文是 [写给 Vue 开发的 React 上手指南](https://juejin.cn/post/6952545904087793678) 的镜像文章，以React 开发者的视角介绍了 Vue 的特性和用法，旨在引导部分 React 转 Vue 的程序猿快速上手 Vue ，避免一些 React 的既定思维对 Vue 开发造成障碍。

## 问答环节

### 感觉讲不完啊，还有什么能介绍的？
要想把 Vue 的全貌压缩成一篇几百行的文章是不现实的，本文主要还是以 React 对照为主。如果想深入了解，这里推荐一些常见的用法和配置，带着这些问题翻文档吧：
- Vue 全局配置
- 插件的用法
- 自定义指令
- computed 和 watch
- Provide/Inject 依赖注入
- 组件实例方法(组件 this 上挂载了很多东西)
- 内置组件

### Vue 有好多相似的 API ，我应该用哪个？
[【Vue.js】 那些相似的 API，我该用哪个？ Vue API 用法大比拼](https://juejin.cn/post/6868262202697056269)

