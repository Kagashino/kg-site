# 写给 Vue 开发的 React 上手指南

## 前言

近年来前端框架 Angular、React 和 Vue 成为前端开发的主流，他们相比于 jQuery 封装了底层 DOM 操作，使开发者能够专注于业务数据，提升了开发体验。其中 React 和 Vue 的设计思路有异曲同工之妙，作为双修玩家，想写点东西用来沉淀自己的对于单项数据流、函数式组件和虚拟 DOM 等概念。

本文适合以下类型的读者：

- 被上司逼着换框架的 Vue 程序猿
- 精力旺盛想尝试 React 的 Vue 程序猿
- Vue 、 React 浅度使用，想深入了解其中一项的程序猿

阅读本文需要掌握以下知识：

- 理解 this 指向
- 理解 ES6 的 class 、 解构赋值和箭头函数等语法

另外，如果觉得看文档更加方便，这里提供传送门： https://reactjs.org/docs/getting-started.html

## React 简介

来看看官网如何用一句话介绍 React：
> 一个构建用户界面的 JavaScript 库

官方把 React 定义为一个 “UI 库” 而非框架，意思是 React 专注于使用 JavaScript 渲染用户界面（跟 UI 无关的东西不是我的本行） 库也好，框架也罢，能实现功能就是好东西，下面开始对比

## 直观对比

**Talk is cheap, show you the code**
让我们分别用两种框架实现一个购物车展示列表
使用 Vue 可以这么写：

```jsx
<template>
  <div>
    <h3>{{ title }}</h3>
    <ul>
      <li v-for="i in cart" :key="i.name">
        <span>{{ i.name }} - {{ i.price }}</span>
      </li>
    </ul>
    <p>总价： {{ total }}</p>
    <button @click="settle">结账</button>
  </div>
</template>
<script>
export default {
  props: {
    title: String
  },
  data() {
    return {
      cart: [
            {name: '牙膏', price: 6.5},
            {name: '香皂', price: 16},
            {name: '洗发水', price: 19.5},
      ]
    }
  },
  computed: {
    total() {
      return this.cart.reduce(( prev, curr ) => prev + curr.price, 0)
    }
  },
  methods: {
    settle() {
      alert(`下单成功，总价: ${this.total}`)
    }
  },
}
</script>
```

emmm，数据视图分离、data、computed ...， 多么熟悉的画面，把这段逻辑挪到 React 中，它长这样：

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
    cart: [
      { name: '牙膏', price: 6.5 },
      { name: '香皂', price: 16 },
      { name: '洗发水', price: 19.5 },
    ]
  }
  // 计算总价
  total = () => this.state.cart.reduce((prev, curr) => prev + curr.price, 0)
  // 结账回调
  settle = () => {
    alert(`下单成功，总价: ${this.total()}`)
  }

  // 渲染视图
  render() {
    const {
      props: { title },
      state: { cart },
      total,
      settle
    } = this;

    // JSX 模板
    return (
      <div>
        <h3>{title}</h3>
        <ul>
          {
            cart.map((i) => (
              <li key={i.name}>
                <span>{i.name} - {i.price}</span>
              </li>
            ))
          }
        </ul>
        <p>总价： {total}</p>
        <button onClick={settle}>结账</button>
      </div>
    )
  }
}
```
hmmm, 除了 JSX （见下文），其他都是纯粹的 JavaScript，通过以上代码的对比，我们发现了几个信息：

1. 两个框架中模板、数据和回调这几个要素非常相似： `render` 函数对应 Vue 的 Template （提一嘴， Vue 也可以使用 JSX 编写 render 函数）； `state` 对应 Vue 中的 `data` 表示组件的状态； 而 `props` 意思相同，为父组件传下来的数据。
2. 从写法上来说，React 偏 JavaScript ，Vue 则是 HTML 与 JavaScript 的结合，内置许多指令属性。
3. React 使用了 JSX 作为模板， JSX 语法相对比较简单，基本就是元素`</>` + 表达式`{}`，相比 Vue 中 Template 集中编写，JSX 可以写得比较松散。

如果你倾向于 All in JavaScript ，追求代码的灵活度，那么 React 可能和你更有缘分。

## 详细对比

上文说到 React 相对灵活，但灵活是把双刃剑，使用不当容易掉进坑里。尽管 React 社区生态非常丰富，可以帮你解决绝大部分问题，但有些东西和 Vue 不太一样，刚上手的人要留意。下面我将罗列几个与 Vue 不相同的地方：

### 创建虚拟 DOM —— JSX vs Template

虚拟 DOM 的本质是 JavaScript 对象，使用 JavaScript 对象来描述真实 DOM，在数据变化更新时可以进行一定程度得优化，避免真实 DOM 的冗余更新。我们创建 React 的虚拟 DOM ，如果使用原生 JavaScript 会写成：
```
const myButton = React.createElement(
    'button',
    { onClick: () => doSth() },
    'Hello World'
)
```
这么写很难让人看出来是在创建一个 HTML 元素。
**JSX** 是一种 JavaScript 的语法扩展，借助 JSX 我们可以把上面的 button 元素写得更像 HTML：
```jsx
const myButton = (
    <button onClick={() => doSth()}>
        Hello World
    </button>
)
```

相比于 Template ，JSX 就显得比较简单纯粹了，在 Template 中可以使用各种便利的指令，而在 JSX 中只有属性 prop，没有指令这个概念，来看看具体有何不同：

#### 表单绑定

Tempalte 中一条 v-model 搞定

```jsx
<input v-model="value"/>
```

JSX 中，老老实实展开来写吧

```jsx
<input value={value} onChange={onChange}/>
```

#### 条件渲染

```jsx
<div v-if="show">Should I render?</div>
```

JSX 中花括号 `{}` 内可以写三目表达式，用它来替代条件渲染

```jsx
{
  show ? <div>Should I render?</div> : null
}
```

或者封装一个 `<If />` 高阶函数（似乎这么做的人不多）：

```jsx
const If = (props) => props.condition ? props.children : null;

<If condition={show}>
  <div>Should I render ?</div>
</If>
```
`props.children` 为子节点渲染，参考下文

#### 子节点渲染

Template 中需要使用 slot 作为占位：
```jsx
<div> this is default <slot></slot> </div>
<div> this is named <slot name="bar"></slot><div>
```
父节点传入：
```jsx
<Foo>
    <span> child node </span>
</Foo>

<Foo>
    <span slot="bar"> bar node </span>
</Foo>
```


JSX 中直接将节点当作 prop 传入即可，默认子节点会被转换成 `children` prop
```jsx
<div> this will render { props.children } </div>
<div> this will render { props.whatever } </div>
```
父节点传入
```jsx
<Foo>
    <span> child node </span>
</Foo>

<Foo whatever={<div>text, nodes or any valid element</div>} />
```

#### 列表渲染

为了优化列表更新的性能，我们在每个元素上声明一个 `key` 属性，这一点两家都一样：
```jsx
<ul>
    <li v-for="i in list" :key="i.id">{i.name}</li>
</ul>
```

JSX 中因为不能使用 `for` 语句，得利用 Array map 进行渲染:
```jsx
<ul>
    { list.map(i => <li key={i.id}>{i.name}</li>) }
</ul>
```

#### 碎片渲染

声明 JSX 节点，根元素必须唯一，像以下的写法是不行的：
```
const badNode = (
    <div>1</div>
    <div>2</div>
)
```
如果不希望添加多余的 DOM 元素，可以使用 React 碎片
```
const frag = (
  <React.Fragment>
    <div>1</div>
    <div>2</div>
  </React.Fragment>
)

//  或者简写成：
const frag = (
  <>
    <div>1</div>
    <div>2</div>
  </>
)
```

在 Vue 中 Template 的使用相对集中，碰到碎片化渲染的场景不多，但也有类似的场景，比如对一组元素做循环：

```
<template v-for="i in item" :key="i.id">
  <h3>{{i.title}}</h3>
  <p>{{i.name}}</p>
</template>
```


### 一言难尽的 this

这个是 JavaScript 的问题，框架不背锅。Vue 中，不管是在 `data` 、 `computed / watch` 还是 `methods` 中，`this` 始终指向当前组件，这是因为 Vue 在创建组件的时候帮你做了一次绑定。 而 React 就没那么贴心了（灵活嘛），这里有一段代码：

```jsx
class Comp extends Component {
  state = {
    a: 1
  }

  printA() {
    console.log(this.state.a); // "this" is undefined
  }

  render() {
    return (
      <button onClick={this.printA}>Click</button>
    )
  }
}
```

React 的行家一眼就能发现问题： 当点击 button 的时候，`printA` 方法中的 `this` 并不是指向当前组件，所以执行 `printA` 会报错。为了保证 `this` 指向，你可以从以下三个选项中挑一个来解决：

- 解法一：使用箭头函数（推荐） 利用箭头函数绑定上一层 this 的原理，可以将成员函数转成箭头函数：

```jsx
class Comp extends Component {
  printA = () => {
    console.log(this.state.a);
  }
}
```

或者在 render 函数一头处理，不过每次重渲染都会创建一个新的箭头函数：

```jsx
<button onClick="() => this.printA()">Click</button>
```

这种解法在编写 class 组件时心智负担相对比较小。

- 解法二： 使用 bind 改变 this 指向，和上面的问题一样：每次重渲染都会创建一个新的函数：

```jsx
<button onClick="this.printA.bind(this)">Click</button>
```

或者在 `constructor` 中处理，保证每次引用一样

```jsx
class Comp extends Component {
  constructor(props) {
    super(props);
    this.printA = this.printA.bind(this);
  }
}
```

- 解法三：使用函数组件（推荐）
既然 this 这么麻烦，咱不用 class 组件了可好？答案是可行的，React 16.8 之后开始支持 **React Hooks** ，可以使用函数组件替代 class 组件，不用再纠结 this 了！参见下文 **React Hooks**

### Immutable 不可变特性

第一次看到这个概念，本人也很懵：状态时刻都在变化，为什么说不可变呢？ 这里的不可变，是函数式编程的一个理念（过于深入，不做讲解）：假设把 React 组件比作函数，那么每次更新组件都不要直接修改 state 里的数据，而是生成一个新的 state 来替换。我们在 Vue 中习惯了响应式更新，修改状态时直接赋值：

```jsx
this.state.cart[1].price = 5.5;
this.state.cart.push({ name: '毛巾', price: 32.9 })
```

React 告诉你： Don't do that! 我为你提供了 `setState` 方法，调了我的 `setState` ，并且新值和旧值不相等（`Object.is(oldVal, newVal)`）我才认为你修改了状态：

```jsx
// 修改第一项的 price
this.setState({
  cart: this.state.cart.map((item, index) => index === 1 ? { ...item, price: 5.5 } : item)
})

// 添加一个商品
this.setState({
  cart: [...this.state.cart, { name: '毛巾', price: 32.9 }]
})
```

可以看到，除了调用 `setState` 方法，新数据与原数据的引用是不一样的，为的是让 React 比对旧值是发现数据的变化，从而触发更新。

> 会不会有性能问题?

比起 JS 引擎创建对象这种开销，不如关心一下你的 JS 文件体积过大影响加载以及 DOM 更新的粒度？

### 单向数据流

这个简单，子组件不要直接修改父组件的状态：

```jsx
function MyInput({ value, onChange }) {
  return (
    <input
      placeHolder="type something"
      value={value}
      onChange={e => onChange(e.target.value)}/>
  )
}
```

这一点上， Vue 的一个折中的办法是：把 value 和 onChange 封装成 v-model （抱歉，template 编译就是可以为所欲为），但原理是一样的：

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

### 生命周期钩子

组件不是一个持久化的东西，从创建、更新到销毁，每一个 timing 都可以处理一些逻辑：

- `constructor`: 对应 Vue 中的 `data` 函数（想必你们都知道 Vue 的 data 得写成一个函数吧），我想来想去，把它与 `data` 对比最合适，因为在 `constructor` 中可以初始化组件的
  state 。
- `componentDidMount`: 对应 Vue 中的 `mounted`，第一次渲染时调用，可以在该函数内发起初始化异步请求什么的。
- `componentDidUpdate`: 对应 Vue 中的 `updated`，组件更新（除了第一次渲染）时调用，处理 state 和 props 更新后的逻辑。
- `componentWillUnmount`: 对应 Vue 中的 `beforeDestroy`，组件卸载之前调用，一般用来取消定时器、退订事件等。
- `shouldComponentUpdate`: React 独有，根据传入的 props、state 的变化，返回 `true` 或者 `false` 来决定组件是否更新，有利于减少重渲染带来的性能开销和副作用。

剩下一些不常用的，可以移步文档 https://reactjs.org/docs/react-component.html#rarely-used-lifecycle-methods

React 生命周期函数名称都比较长，不是什么技术原因，主要是为了保持一个提醒的作用：哦，原来这里用了这么个钩子。

## 特性
讲完了对比，接下来介绍一些 React 的优势项

### Typescript 支持
由于 React 偏 JavaScript ，对 TypeScript 的支持是强于 Vue2.x 的（Vue 在 3.x 以上版本对 TS 支持有所改进），如果你理解静态类型检查对于复杂前端工程的意义，那么 React 是一个非常合适的选择。让我们使用 TypeScript 对 React Class 组件进行类型标注：
```typescript
import React, { Component } from 'react';

interface IProp {
  title: string;
}

interface IState {
  foo: number;
  bar: string;
  baz: string[];
}

// 第一个泛型表示组件中有哪些 Props ， 第二个表示组件的 State
class Comp extends Component<IProp, IState> {
    state = {
        foo: 0,
        bar: 'bar',
        baz: ['ak', 'm16', 'famas']
    }
}
```

有了静态类型除了能够对代码加强约束，还能让 IDE 放心地推导类型，给予合适的代码补全，可谓一次编写，处处受益。有关 TypeScript 支持请参考 https://zh-hans.reactjs.org/docs/static-type-checking.html#typescript 。


### React Hooks —— 函数式组件补完计划

事实上，除了上文使用 class 创建组件，也可以使用函数创建，并且 React 团队鼓励大家使用函数编写组件，继续折腾购物车，这回使用函数来组织代码：

```jsx
import React from 'react';

const defaultCart = [
  { name: '牙膏', price: 6.5 },
  { name: '香皂', price: 16 },
  { name: '洗发水', price: 19.5 },
]

// 第一个参数为函数组件的 prop
function Cart({ title, cart = defaultCart }) {

  const total = cart.reduce((prev, curr) => prev + curr.price, 0);

  const settle = () => {
    alert(`下单成功，总价: ${total}`)
  }

  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {
          cart.map((i) => (
            <li key={i.name}>
              <span>{i.name} - {i.price}</span>
            </li>
          ))
        }
      </ul>
      <p>总价： {total}</p>
      <button onClick={settle}>结账</button>
    </div>
  );
}
```

函数组件当中，第一个参数为父组件传入的 `props`， 问题来了：**state 怎么办**？目前我们的函数组件仅支持静态渲染，如果需要修改购物车的状态，不得不再引入一个 onChange 的 prop ，由父组件修改。有没有方法能让函数拥有自己的 state 呢？

答案是使用 **React Hooks**，它们是 React 内置的一组钩子函数（跟生命周期钩子有所区别，可以从零开始理解），函数名称以 `use` 起头。能够将状态与当前渲染的函数组件“关联”起来，且看：

```jsx
import React, { useState } from 'react';

const Cart = ({ title }) => {
  // 状态：购物车清单
  const [cart, setCart] = useState([
    { name: "牙膏", price: 6.5 },
    { name: "香皂", price: 16 },
    { name: "洗发水", price: 19.5 }
  ]);
  // 状态：新增货品名称
  const [name, setName] = useState("");
  // 状态：新增货品价格
  const [price, setPrice] = useState();

  const addItem = () => {
    setCart([...cart, { name, price }]);
  };

  const clearAll = () => {
    if (confirm("是否删除购物车里的商品?")) {
      setCart([]);
    }
  };

  const total = cart.reduce((prev, curr) => +prev + +curr.price, 0);

  const settle = () => {
    alert(`下单成功，总价: ${total}`);
  };

  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {cart.map((i) => (
          <li key={i.name}>
            <span>
              {i.name} - {i.price}
            </span>
          </li>
        ))}
      </ul>
      <div>
        <span>
          商品名称：
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </span>
        <span>
          价格：
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </span>
        <button onClick={addItem}>添加商品</button>
      </div>
      <p>总价： {total}</p>
      <button onClick={settle}>结账</button>
      <button onClick={clearAll}>删除</button>
    </div>
  );
};
```

我们从 `react` 中引入了 `useState` 钩子，这可能是编写函数组件最常用的钩子了——它的参数接受一个默认值，返回 `[value, setValue]` 的元组（就是约定好值的 JavaScript 数组啦），来帮助我们读取和修改数据。 有了 `useState`，我们终于让函数组件发挥出 class 组件的功能。

#### React Hooks 注意事项

为了保证函数组件知道它自己调用了什么钩子，React Hooks 被设计成执行顺序和组件渲染顺序**一致**（有兴趣的可以找专门的 React Hooks 文章了解），数据结构可以看作是一个链表：

> 组件A ->  组件B -> 组件C
> (useStateA1; useStateA2) -> (useStateB) -> (useStateC1; useStateC2)

为了保证 Hooks 调用顺序一致，下面几个用法都应该避免：

- 不要在 `if / while / for` 等流程语句中使用 Hooks

```jsx
// bad
if (someThing) {
  useState(a)
} else {
  useState(b)
}
```

- 不要在函数组件执行域之外调用 Hooks

```jsx
// bad, do not use outside the functional component
const [outer, setOuter] = useState()

// bad, do not use inside class component
class A extends Component {
  constructor () {
    this.state = useState()
  }
}
```

#### 其他 Hooks

除了 `useState` ， React 还内置了如 `useEffect` 、 `useLayoutEffect` 、 `useRef` `useMemo` 等钩子。这里介绍 `useEffect` 、 `useMemo`
和 `useCallback` 这三个带**依赖项**（参考下文 QA 解释）的钩子，剩下的参考文档 https://reactjs.org/docs/hooks-reference.html#gatsby-focus-wrapper

##### useEffect

这是个多面手，处理组件更新后副作用的回调，当 state 或者 props 改变引发函数重新渲染时，根据参数和返回值的定义**选择性执行**。大致可以驾驭以下场景：

- `componentDidMount` 和 `componentDidUpdate` 的合体，只要重新渲染始终会执行：

```
// 只传一个回调，函数重新渲染就执行
useEffect(() => { console.log('updated') })
```

- 指定某些**依赖**作为数组传入第二个参数，只要有一项依赖发生变化就执行，类似 Vue 中的 `watch`：

```
function Comp({ title }) {
  const [count, setCount] = useState(0);
  // 第二个参数指定一个数组，放入你想监听的依赖：
  useEffect(() => {
    console.log('title or count has changed.')
  }, [title, count])
}
```

原则上，函数中用到的所有依赖都应该放进数组里。

- 处理组件第一次渲染时的回调，类似 Vue 中的 `mounted`

```
// 第二个参数传一个空数组，表示没有依赖，只会在第一次渲染时执行
useEffect(() => {
  alert('mounted');
}, [])
```

- 处理首次渲染和销毁，类似 Vue 中 `mounted` 和 `beforeDestroy` 组合

```
useEffect(() => {
    const onKeyPress = e => console.log(`You've press ${e.key} .`);
    document.addEventListener('keyPress', onKeyPress);
    // 如果返回值是函数，组件销毁之前 React 会调用这个函数来清理副作用
    return () => document.removeEventListener('keyPress', onKeyPress);
}, [])
```

- 注意：Effect 钩子的依赖使用不当会导致组件无限更新（死循环）：

```jsx
// 1. 依赖一个 state 又在 effect 中更新这个 state
function Bad1() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count++);
  }, [count])
}

// 2. 每次依赖对象引用不一致
function Bad2() {
  // 组件重新渲染时 data 都是一个新对象。
  const data = { a: 1, b: 2 }
  useEffect(() => {
    console.log(data);
  }, [data])
}
```

##### useMemo/useCallback

useMemo 类似于 Vue 的 `computed`，表示一个记忆状态 接受一个求值函数和一串依赖数组：
> useMemo(getterFn, [dep1, dep2 ...])

用法

```
const [name, setName] = useState('John Smith');
const [age, setAge] = useState(17);

const getData = () => ({ name, age });
const data = useMemo(getData, [name, age])
```

第一次渲染时调用 `getData` 取值不必多说。当组件重新渲染时，如果元组中 name、age 其中一项变化，则仍会调用`getData`函数重新求值。如果二者都没变化，直接返回上一次渲染的数据给 data，避免了引用类型变化问题。

useCallback 是 useMemo 的函数版，防止组件重渲染时回调引用被覆盖：

```
const [count, setCount] = useState(0);
const setCount = useCallback(() => setCount(count + 1) , [count]);
```

由于函数闭包特性，依赖项`count`必须传入，如果不传则每次都只会得到初次渲染的值`0`。

一句话概括 `useEffect`, `useMemo` 和 `useCallback`:
> 只要依赖数组中的每一项和上次相同，那么 Hooks 的结果就相同

##### 自己封装

将多个 hooks 封装进一个函数，再在函数组件中调用是允许的，因为这样不会破坏执行顺序：

```
const useCount = () => {
  const [count, setCount] = useState(0);
  const text = useMemo(() => `You've click ${count} times!`);
  const add = useCallback(() => setCount(count + 1));
  const reset = useCallback(() => setCount(0));
  return {
    text,
    add,
    reset
  }
}

const Comp = () => {
  const { text, add, reset } = useCount();
}
```

不过也要注意：封装的钩子函数名称也要用 `use` 开头（这是一个约束）。

## 小结

React 和 Vue 是目前前端流行的三大框架之二。本文以对比的视角，通过单文件组件、JSX 和 Template 声明周期等各自特性的对比，介绍了 React 的基本写法和注意事项。为的是让大家更清晰地认识两者之间的区别和相似点，加深对这两者的理解。

## 问答环节

### 刚才在 React Hooks 中提到的依赖是啥

函数式组件，每一次更新都会重新执行一遍函数，所以将 `prop`、`state`、`memo` 、 `context` 和 `callback` 等**可能**会随着函数重新渲染而变的值叫做依赖。而 `ref` 、 `useState`
中返回的 `setXXX` 函数，不会随着组件重新渲染而改变，所以不算做依赖。

### setState 到底是同步还是异步

我觉得不应该过多关心这个问题，但鉴于许多面试都会问到这个，在此梳理一下：

1. 首先 setState 更新是同步的，但是调用完成后不会直接赋值给 state ，所以造成了调用后 state 没有立即变化的情况，但不是异步逻辑造成的。
2. 在同步的回调、componentDidMount 等钩子中，因为批处理机制的存在，必须要等到所有 setState 调用完毕，才会一次性更新：

```javascript
class A extends Component {
  state = { a: 1 }

  callSync() {
    this.setState({ a: 100 });
    console.log(this.state.a); // 1
    this.setState({ a: 200 });
    console.log(this.state.a); // 1
    this.setState({ a: 300 }, () => console.log(this.state.a)); // 300
  }
}
```

3. 在 setTimeout 、 Promise 等异步代码中，由于批处理流程已经结束了，所以 setState 会立即更新

```javascript
class A extends Component {
  callAfterTimeout = () => {
    setTimeout(() => {
      this.setState({ a: 100 });
      console.log(this.state.a) // 100
    }, 0)
  }

  callAfterPromise = () => {
    Promise
      .resolve()
      .then(() => {
        this.setState({ a: 100 });
        console.log(this.state.a) // 100
      })
  }

  callAfterAwait = async () => {
    await Promise.resolve();
    this.setState({ a: 100 });
    console.log(this.state.a) // 100
  }
}
```

### 能不能封装一个 v-model

借助 React Hooks 来做一层封装（花里胡哨的玩意，似乎这么做的人不多）：

```jsx
const useModel = ({ value = 'value', event = 'onChange' }, defaultValue) => {
  const [val, setVal] = useState(defaultValue);
  return {
    [value]: val,
    [event]: useCallback(e => setVal(e.target[value]), [])
  }
}

const MyInput = () => {
  const inputModel = useModel(); // { value: '', onChange: f }
  const checkboxModel = useModel({ value: 'checked' }, true); // { checked: true, onChange: f }

  return (
    <form>
      <input {...inputModel} />
      <input type="checkbox" {...checkboxModel} />
    </form>
  )
}
```

### JSX 不是 React 专用吗？ Vue 也能写 JSX ？
1. 不是，2. 能 https://cn.vuejs.org/v2/guide/render-function.html#JSX

### 有计划出镜像文章：写给 React 开发的 Vue 上手指南吗？

你好，有的

### 有计划带上 Angular 吗？

抱歉，Angular 用的不多，暂不编写。
