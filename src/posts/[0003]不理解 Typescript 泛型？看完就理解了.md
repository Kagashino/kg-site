## 如何理解泛型

泛型(Generic Type)存在于许多编程语言中，许多刚接触Typescript且没有Java、C++等带泛型的语言使用经验的程序员，理解起来会有一定的难度，特此开文扫盲


我们再来定义一个盒子box，盒子有number类型的id，而data是任意类型，你可能会想到`any`
```
interface Box {
  id: number,
  data: any
}
```
然而`any`一时爽，对后期的阅读和分析大为不利。
来看看使用泛型的方式，只要在头部使用尖括号`<T>`，代码块中使用T来表示类型即可：
``` typescript
interface Box<T> {
	id: number,
	data: T
}
```
使用带有泛型的`Box`的时候，我们再传入具体的值：
``` typescript
const box1: Box<string> = {
	id: 1,
	data: 'this is string box'
}

const box2: Box<boolean> = {
	id: 2,
	data: false
}
```
我们类比一个函数：
```
function square(a) {
  return a*a
}
```
上面的泛型`<T>`，类似于`square`函数中的形参`a`， 定义时用来表示**宽泛、不确定**的值（类型），使用的时候再传入具体的值（类型）
```
sum(4) // 16
```
我们可以将泛型理解为： **参数化的类型**
有了泛型，我们可以更加具体地描述一个不确定的类型。与`any`相比，泛型更具有约束力。


## 泛型的具体用法
上面提到了`interface`使用泛型的方法，下面将会介绍泛型的其他应用场景
### 在function/type/class中使用泛型：
泛型可以在function/type/class中声明。
还是以`Box`举例，type的泛型长得跟interface的基本一样
```
type Box<B> {
  id: number,
  value: B
}
```

写一个函数，让一个值变成Box类型：
```
function toBox<B>(value: B) {
  return {
    id: new Date().getTime(),
    value: value
  }
} 

const box3: Box<string> = toBox('string box')
const box4: Box<number[]> = toBox([1,2,3,4,5])
```
写一个class，把这个Box用class封装起来：
``` typescript
class MyBox<B> {
  private id: number;
  private value: B;

  public static from<B> (value: B) {
    return new MyBox(value)
  }
  constructor () {
      this.id = new Date().getTime();
      this.value = value;
  }
  // 只允许修改成相同类型的value
  public setValue(value: B): void {
    this.value = value;
  }

  public getValue(): B {
    return this.value;
  }
}
```

### 定义多个泛型
这次我们定义一个抽屉，抽屉有三层，三层可以放三种数据
```
type Drawer<L1, L2, L3> = [L1, L2, L3];
const myDrawer<string, string, string> = ['香烟', '茶叶', '啤酒']
```
如果一个React项目使用了TypeScript，那么组件可以接受Props泛型和State泛型
``` typescript
type CountProps = {
  initValue: number,
  step?: number
}

type CountState = {
  value: number
}
class Counter extends React.component<CountProps, CountState> {
  constructor(props) {
    super(props)
    this.state = {
      value: props.initValue || 0
    } 
  }
  // 以下略
}
```
### 默认泛型
如果某个泛型有默认值，使用的时候不传入类型即为默认值：
```
type Box<S = string> {
  id: number,
  value: S
}

var boxDefault: Box = { id: 6, value: 'default generic' }
var boxNumber: Box<number> = { id: 7, value: 3.1416 }
```

## 原生泛型的应用

#### Array
这个是最好理解的了，如果想定义一个类型固定的数组除了`type[]`外还可以使用泛型的方式：
```
const bools: Array<boolean> = [true, false, true, true, true]

const queue = Array<{id: number, value: string }> = [
  { id: 1, value: 'a' },
  { id: 2, value: 'b' },
  { id: 3, value: 'c' },
]
```
与`type[]`相比，如果定义一个带有键值类型的数组，使用Array泛型可读性会更高

#### Set和Map
```
const plants: Set<string> = new Set()

fruits.add('豌豆射手')
fruits.add('向日葵')
fruits.add('西瓜投手')
fruits.add('玉米大炮')

const subject: Map<string, number> = new Map()

subject.add('语文', 91)
subject.add('数学', 100)
subject.add('英语', 92)
subject.add('政治', 96)
```

#### Promise
```
type UserData = {
  id: number,
  name: string,
  age: number
}

function fetchData(): Promise<UserData> {
  return fetch('/userData').then(res => res.json())
}

async function fetchFollowList (): Promise<UserData> {
  const { id } = await fetchData();
  return fetch(`/follows/${id}`).then(res => res.json())
}
```
