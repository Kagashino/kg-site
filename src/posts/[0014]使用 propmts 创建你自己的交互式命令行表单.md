## 引言
**REPL** 是 R(read)、E(evaluate)、P(print)、L(loop) 的缩写，称为**交互式命令行**，是程序用来读取用户的输入的方式。比如在 C 语言中调用`<stdio.h>` 中的 `scanf` 函数收集用户输入的数据。在执行 `npm init` 时，也会出现 REPL 收集创建 npm 包时所需的信息。
再比如：我们在使用 `@vue-cli` 脚手架创建项目时，敲下`vue create my-app`命令后，会弹出配置选择交互菜单：

```sh
 Vue CLI v4.5.8
┌──────────────────────────────────────────┐
│                                          │
│   New version available 4.5.8 → 4.5.10   │
│     Run npm i -g @vue/cli to update!     │
│                                          │
└──────────────────────────────────────────┘

? Please pick a preset: (Use arrow keys)
  Default ([Vue 2] babel, eslint)
  Default (Vue 3 Preview) ([Vue 3] babel, eslint)
  Manually select features 
```

```sh
? Please pick a preset: Manually select features
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
 (*) createChoice Vue version
 (*) Babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
>( ) Router
 ( ) Vuex
 ( ) CSS Pre-processors
 (*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing 
 ```

这种便捷友好的 REPL 拓展工具，外形美观、功能强大，而实现起来也非常简单。下面就开始介绍一款 node 的 repl 工具：**prompts**

## Prompts 介绍和使用

> Lightweight, beautiful and user-friendly interactive prompts 
轻量、美观与易用的交互式命令提示工具

npm 安装，不必多言
```sh
npm install prompts
```

我们来实现一个简易表单，获取某射击游戏，玩家输入的用户名、密码、年龄等基本信息：
```javascript
const prompts = require('prompts');


~async function () {
	const createChoice = (title, disable) => ({ title, value: title, disable: !!disable });

	const res = await prompts([
		{
			type: 'text', // 文字类型
			name: 'user',
			message: 'input user'
		},
		{
			type: 'password', // 密码类型
			name: 'password',
			message: 'input: password'
		},
		{
			type: 'number', // 数字类型
			name: 'age',
			message: 'input age'
		},
		{
			type: 'select', // 单选
			name: 'gender',
			message: 'your gender',
			choices: [createChoice('male'), createChoice('female'), createChoice('others')]
		},
		{
			type: 'multiselect', // 多选
			name: 'weapons',
			message: 'select your weapon',
			choices: [
				createChoice('M16A4'),
				createChoice('AK-74'),
				createChoice('QBZ-95'),
				createChoice('MP5'),
				createChoice('P90'),
				createChoice('Kar-98K'),
				createChoice('Dragunov'),
				createChoice('DesertEagle'),
				createChoice('Glock-18'),
			]
		}
	]);

	console.log(JSON.stringify(res));
}();
```
运行脚本，填单过程如下，与上文 vue 脚手架工具相差无几：
```sh
√ input user ... Soap
√ input: password ... ***
√ input age ... 33
√ your gender » male
? select your weapon »
Instructions:
    ↑/↓: Highlight option
    ←/→/[space]: Toggle selection
    a: Toggle all
    enter/return: Complete answer
(*)   M16A4
( )   AK-74
( )   QBZ-95
( )   MP5
( )   P90
( )   Kar-98K
( )   Dragunov
(*)   DesertEagle
(*)   Glock-18 
```
最后输出结果：
```JSON
{"user":"Soap","password":"141","age":33,"gender":"male","weapons":["M16A4","DesertEagle","Glock-18"]}
```

