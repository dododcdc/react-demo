import React from 'react';
import ReactDOM from 'react-dom';
import Good from './comp/Good'
import './css/index.css'
// 相当不推荐
// var hello = React.createElement("h1",null,"hello wb");
//
// ReactDOM.render(hello,document.getElementById("root"))


// 比较不推荐
// 最好用小括号包裹一下
var name = "tom"
// var tag = (<h1>hello {name} <span /></h1> )
var res = true
//定义一个函数
const rr = () => {
    if (!res) {
        return <div>ggg {name}</div>
    }
    else {
        return <div>mmm {name}</div>
    }

    // 可以使用三元表达式
    // return res? (<div>ggg {name}</div>) : (<div>mmm {name}</div>)
}
// 调用函数 将返回值 赋予tag 操作变量 操作函数都要用{} 调用函数：函数名后面还要加括号
var tag = <h1>{rr()}</h1>

// 遍历数据
const colors = [
    {id:1 ,color:'red'},
    {id:2 ,color:'blue'},
    {id:3 ,color:'yellow'}
]

tag = (
    <ul>
        {/*一定要把key加上 不加也会显示，但控制台会报错*/}
        {colors.map(item => <li key={item.id}>{item.color}</li> )}
    </ul>
)

// 行内样式 不推荐这样 注意style里面是
tag = (<h1 style={{background:"blue"}}>ggg</h1>)

// 使用类名添加样式 注意 以前的class在这里叫className
tag = (<h1 className="tag">how are you</h1>)

// 渲染到index.html id为root的容器中
ReactDOM.render(tag,document.getElementById("root"))

// 下面基本都可以推荐，类创建组件比较不错
// 使用函数创建组件 函数名称必须大写字母开头 ， 函数必须有返回值，可以返回null(表示该住建的结构)
function Foo() {
    return (<h2> 你好 </h2>)
}
// 使用函数创建 组件 简写
const Simple = () => (<div>简写真方便</div>)


// 渲染函数组件,也可以用双标签<Foo></Foo>
ReactDOM.render(<Simple />,document.getElementById("root"))


// 使用类创建组件 类名必须以大写字母开头 ,要继承React.Component 最少 有一个 render() 且必须有返回值

class Bar extends React.Component {
    render() {
        return (<div>使用类创建组件</div>)
    }

}

ReactDOM.render(<Bar />,document.getElementById('root'))


// 在顶部引入外部组件good
ReactDOM.render(<Good />,document.getElementById('root'))


// 事件绑定
function doit() {
    alert("hello")
}
// 1. 创建 一个类组件
class Hand extends React.Component {
    handClick() {
        alert("gogogo")
    }
    render () {
        // this.调的函数是属于Hand的 doit是Hand外面的函数
        // 如果组件是函数组件那么是没有this的，直接调用
        // 其他事件 onMouseEnter onFocus 等等 都要用驼峰命名
        return (<div>
            <button type="button" onClick={this.handClick}>点我</button>
            <button type="button" onClick={doit}>点我</button>
        </div>)
    }
}
//渲染
ReactDOM.render(<Hand />,document.getElementById("root"))


// 事件处理之阻止浏览器的默认行为 比如 点击a标签做一件事 但是 不跳转页面(浏览器的默认行为)

class Stop extends React.Component {
    handClick () {
        alert("阻止浏览器默认行为")
    }
    render() {
        return (<button onClick={this.handClick}>阻止行为</button>)
    }
}

ReactDOM.render(<Stop />,document.getElementById('root'))

// 有状态组件和无状态组件 函数组件就是无状态组件 类组件就是有状态组件 状态即stage

// 页面不需要和后台数据交互 适合用函数组件 需要和后台数据交互 适合用 类组件

// 组件中的state 和 setState()
class Student extends React.Component {
    // constructor() {
    //     super();
    //     // this.state = {
    //     //     name: 'tom',
    //     //     age: 18
    //     // }
    //
    //
    // }
    // 简化语法
    state = {
        name: 'tom',
        age: 6
    }
    // 状态是私有的，只能在组件内部获取
    render () {
        return (<div>hello {this.state.name} 年龄：{this.state.age}
            <button onClick={() => {
                // 修改 必须在setState里面进行 ，这个函数可以抽取到render外面去
                this.setState({
                    age: this.state.age + 1
                })
            }}>+</button></div>)
    }
}

ReactDOM.render(<Student />,document.getElementById('root'))


// import './index.css';
// import App from './App';
//
//
// import reportWebVitals from './reportWebVitals';
//
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
//
//
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
