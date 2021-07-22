在编写React组件的时候，如果要在元素中插入如点击等事件，需要这么处理：
```JSX
class Foo extends React.component {
    handleClick() {
      console.log('"this" is ', this)
    }
    render () {
        return (
          <button onClick={this.handleClick.bind(this)}>Try to Click this!</button>
        )
    }
}
```
或者传入匿名函数
```jsx
 <button onClick={()=>this.handleClick()}>Try to Click this!</button>
```
## 原因：
绑定this是为了保持组件的上下文关系，如果不这么做，回调函数中的this就不会指向当前class了
为什么会丢失上下文关系呢？
答：我们编写的JSX，最终编译成JS会变成如下代码：
```
function render() {
      return React.createElement(
         "button",
         { onClick: this.handleClick.bind(this) },
         "Try to Click this!"
      );
   }
```
对this指向熟悉的，看到这里应该足够理解了，如果不明白，请参阅[我的另一篇文章](https://www.jianshu.com/p/d0022f7c9e51)
