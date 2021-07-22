# 如何通过babel配置使用可选链`?.`和双问号`??`

## 什么是可选链
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
当访问多层对象属性(如`o.a.b`)时，如果属性`a`为空，则会报引用错误
为此我们不得不这么处理：
```
const c = o.a && o.a.b ? o.a.b : undefined
```
有了可选链，就可以对一个为null或者undefined属性安全引用：
```
const o = {}

const tryA_B = o?.a?.b
console.log(tryA_B) // undefined
```
## 什么是双问号
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

```
value1 ?? value2
```
`??`在`value1`和`value2`之间，只有当`value1`为`null`或者 `undefined`时取`value2`，否则取`value1`（`0`,`false`,`""`被认为是有意义的，所以还是取`value1`）
```
const o = {}
const c_or_d = o.c ?? 'd'
console.log(c_or_d) // 'd'
console.log(0 ?? 1) // 0
console.log("" ?? "foo") // ""
```
等价于
```
const c_or_d = (o.c === null || typeof o.c === "undefined") ? o.c : 'd'
```

## 如何使用
首先检查你的项目依赖中的`babel`版本，如果你的babel版本<7，那么很遗憾，你得先解决babel版本升级的问题。
如果是babel7以上的版本，可以添加以下2个`devDependencies`依赖：
> @babel/plugin-proposal-optional-chaining // 可选链  
@babel/plugin-proposal-nullish-coalescing-operator // 双问号

然后在.babelrc或者babel.config.js中这加入2个插件(plugins属性放在JSON顶层)：
```
{
 "plugins": [
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining"
  ]
}
```
之后就可以愉快地使用了！

## 最简实践
为了检验插件是否真的有用，这里提供一个最小实践示例：
首先编写示例代码 `index.js`：
```
var foo = {
	a: 1,
	zero: 0,
}

var fooA = foo.a;
var fooB = foo?.b;
var fooNilValue = foo?.nil?.value;

var fooDefault = foo.default ?? 'default value';
var fooZeroDefault = foo.zero ?? 'zero value';

console.log(fooA); // 1
console.log(fooB); // undefined
console.log(fooNilValue); // undefined
console.log(fooDefault); // default value
console.log(fooZeroDefault); // 0
```
项目根目录下初始化npm仓库 `npm init`，然后安装下列依赖(现在是2020年了，默认都是7以上的版本)：
> npm i --save-dev @babel/cli @babel/core @babel/preset-env

项目根目录添加配置文件  `babel.config.js` ，不用加别的，可选链和双问号插件会根据你的语法自动转义：
```
module.exports = {
	presets: [
		"@babel/preset-env"
	]
}
``` 

执行编译命令：
> npx babel index.js -d dist

构建完毕，在`./dist/index.js` 中看到生成的文件，说明编译成功：
```
"use strict";

var _foo$nil, _foo$default, _foo$zero;

var foo = {
  a: 1,
  zero: 0
};
var fooA = foo.a;
var fooB = foo === null || foo === void 0 ? void 0 : foo.b;
var fooNilValue = foo === null || foo === void 0 ? void 0 : (_foo$nil = foo.nil) === null || _foo$nil === void 0 ? void 0 : _foo$nil.value;
var fooDefault = (_foo$default = foo["default"]) !== null && _foo$default !== void 0 ? _foo$default : 'default value';
var fooZeroDefault = (_foo$zero = foo.zero) !== null && _foo$zero !== void 0 ? _foo$zero : 'zero value';
console.log(fooA);
console.log(fooB);
console.log(fooNilValue);
console.log(fooDefault);
console.log(fooZeroDefault);
```
