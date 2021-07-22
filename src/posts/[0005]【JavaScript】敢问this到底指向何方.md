2019.2.25 之前写的罗里吧嗦的，容易绕进去，现已更新

this是JavaScript的【关键字】，它不同于其他语言一样指向当前类的实例，JavaScript 中，函数的调用方式不同，this 指向也跟着变化，大致就4种情况：

### 一、函数挂在哪里调用，this指向哪里：
 对象引用调用，this指向该对象：
```
var person = {
  introduce:function(){
    console.log(this) 
  }
}
person.introduce()// 打印person对象
```
### 二、new调用后，this指向实例：
new调用，可以理解为'新'开辟了一个作用域（个人理解），this指向实例：
```
function Person(){
  console.log(this)
  this.itself = this;
}
var xm = new Person();// 打印xm，返回xm
console.log(xm.itself === xm) //true
```
### 三、函数直接调用，this指向全局（严格模式下为undefined）
非严格模式下，不挂在任何对象下的函数调用，this指向全局（浏览器的全局为window，amd/cmd等node环境下为global）

```
function outside(){
  console.log(this)
}
outside()// 全局
```
用 1 中的例子，原本person.introduce为对象方法，但是脱离了对象，作用域也不再跟对象绑定
```
var person = {
  name:'xiaoming',
  introduce:function(){
    console.log(this) 
  }
}
person.introduce()// person对象

var foo = person.introduce
foo()//window或者global
```

注意，如果将构造函数直接调用，不但不能派生实例，同时会让this指向全局，影响全局变量：
```
function Animal(name,age,color){
  this.name = name;
  this.age = age;
  this.color = color;
}
//bad
var dog = Animal('yaya',2,'white');
console.log(dog);// dog并没有实例化Animal，故作为普通函数调用，然而Animal也没有返回值，故为undefined
//函数一经调用，全局变量受到了影响
console.log(name);// yaya
console.log(age);// 2
console.log(color);// white

```
严格模式下，原本指向全局变量的this都会变为undefined
```
function outside(){
  'use strict'
  console.log(this)
}
outside()// undefined
```
use strict也是有作用域的，对于不在其作用域链的函数，他管不着
```
var person = {
  noStrict:function(){
    var printThis = function(){//非严格模式下
      console.log(this)
    }
    printThis()
  },
  introduce:function(){
    'use strict'
    var you = function(){//这个函数处于严格模式的作用域内
        console.log(this)
    }
    you()//   1
    console.log(this)//   2
  }
  
}
person.introduce()// 1:undefined 2:person
person.noStrict()// window/global
```

### 四、调用了call/apply/bind的函数，this指向call/apply/bind的第一个参数**(即如何改变this的指向)**：
call/apply/bind三者皆为Function.prototype中的方法，且看：
```
var Father = {
   name:"nibaba",
   callname:function(){
    console.log(this.name)
  }
}
var son = {
  name:"guai'erzi",
}
Father.callname() //nibaba
Father.callname.call(son) // guai'erzi
```


对于apply效果完全一样，call和apply的不同在于：call第一个参数（上文中的son）后面跟函数确切的参数，apply后面跟数组作为参数组

**有啥用（举例说明）：**
在没有拓展运算符 **...** 的ES版本（ES6之前），call/apply，可以让类数组对象使用数组的方法
```
//检测数字5作为第几个参数传入的，没有5返回0
function whichIsFive(){
  return arguments.indexOf(5)+1//-*- tips -*-argument是一个类数组对象，
//并不是数组，故无法调用数组的indexOf方法
}
whichIsFive(1,1,1,1,1,5,1)//报错
```
使用call，就能让arguments调用数组方法：
```
//检测数字5作为第几个参数传入的，没有5返回0
function whichIsFive(){
  return Array.prototype.indexOf.call(arguments,5)+1
//-*- tips -*-注意indexOf挂在prototype上
}
whichIsFive(1,1,1,1,1,5,1)//6
whichIsFive(1,1,5,1,1,3,1)//3
whichIsFive(2,2,2,2,2)//0
```
或者调用数组的slice方法，根据一个类数组对象（只要有具有length属性）生成一个新的、真正的数组：
```
var arrLike = {
	'0':1,
	'1':2,
	'2':3,
	'3':4,
	'4':5,
	length:5//-*- tips -*-:length填多少，数组长度就是多少
}
var realArray = Array.prototype.slice.call(arrLike)
```
再比如，使用apply输出一数组个中最大/最小值：
```
function maxElement(list){
	return Math.max.apply(null,list);//最小值方法为Math.min
}
maxElement([1,2,66666,4,5]);//66666
```

**bind方法**
同样是一个改变this的方法，这个方法会返回原函数的一个拷贝，原函数不执行：
```
var age = 99//window.age
function getAge(){
  console.log(this.age);
}
var xiaoming = {
  age:18
}
var xiaohong = {
  age:16
}

var getXiaomingAge = getAge.bind(xiaoming)
getAge()//99
getXiaomingAge()//18
getAge.call(xiaohong)//16
console.log(getXiaomingAge === getAge) //false
```
最后放张图，一图胜千言：

![this指向](https://upload-images.jianshu.io/upload_images/3132311-ad4f14efb03f7bbe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



当然，在ES6中，你有更多的方式避免踩入this的陷阱，详见：

[**ES6箭头函数(=>)和拓展运算符(...)**](https://www.jianshu.com/p/1cf9f3592942)
