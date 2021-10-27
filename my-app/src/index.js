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
    } else {
        return <div>mmm {name}</div>
    }

    // 可以使用三元表达式
    // return res? (<div>ggg {name}</div>) : (<div>mmm {name}</div>)
}
// 调用函数 将返回值 赋予tag 操作变量 操作函数都要用{} 调用函数：函数名后面还要加括号
var tag = <h1>{rr()}</h1>

// 遍历数据
const colors = [
    {id: 1, color: 'red'},
    {id: 2, color: 'blue'},
    {id: 3, color: 'yellow'}
]

tag = (
    <ul>
        {/*一定要把key加上 不加也会显示，但控制台会报错*/}
        {colors.map(item => <li key={item.id}>{item.color}</li>)}
    </ul>
)

// 行内样式 不推荐这样 注意style里面是
tag = (<h1 style={{background: "blue"}}>ggg</h1>)

// 使用类名添加样式 注意 以前的class在这里叫className
tag = (<h1 className="tag">how are you</h1>)

// 渲染到index.html id为root的容器中
ReactDOM.render(tag, document.getElementById("root"))

// 下面基本都可以推荐，类创建组件比较不错
// 使用函数创建组件 函数名称必须大写字母开头 ， 函数必须有返回值，可以返回null(表示该住建的结构)
function Foo() {
    return (<h2> 你好 </h2>)
}

// 使用函数创建 组件 简写
const Simple = () => (<div>简写真方便</div>)


// 渲染函数组件,也可以用双标签<Foo></Foo>
ReactDOM.render(<Simple/>, document.getElementById("root"))


// 使用类创建组件 类名必须以大写字母开头 ,要继承React.Component 最少 有一个 render() 且必须有返回值

class Bar extends React.Component {
    render() {
        return (<div>使用类创建组件</div>)
    }

}

ReactDOM.render(<Bar/>, document.getElementById('root'))


// 在顶部引入外部组件good
ReactDOM.render(<Good/>, document.getElementById('root'))


// 事件绑定
function doit() {
    alert("hello")
}

// 1. 创建 一个类组件
class Hand extends React.Component {
    handClick() {
        alert("gogogo")
    }

    render() {
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
ReactDOM.render(<Hand/>, document.getElementById("root"))


// 事件处理之阻止浏览器的默认行为 比如 点击a标签做一件事 但是 不跳转页面(浏览器的默认行为)

class Stop extends React.Component {
    handClick() {
        alert("阻止浏览器默认行为")
    }

    render() {
        return (<button onClick={this.handClick}>阻止行为</button>)
    }
}

ReactDOM.render(<Stop/>, document.getElementById('root'))

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
    // 简化语法，
    state = {
        name: 'tom',
        age: 6
    }

    // 状态是私有的，只能在组件内部获取
    render() {
        return (<div>hello {this.state.name} 年龄：{this.state.age}
            <button onClick={() => {
                // 修改 必须在setState里面进行 ，这个函数可以抽取到render外面去
                this.setState({
                    age: this.state.age + 1
                })
            }}>+
            </button>
        </div>)
    }
}

ReactDOM.render(<Student/>, document.getElementById('root'))

// 将上面onclick中的方法抽取出来 注意this那个玩意儿！！！！！！！！！！！！！！！！！！！！！！！！！！

class Stu extends React.Component {
    state = {
        name: 'jack',
        age: 55
    }

    addAge() {
        this.setState({
            age: this.state.age + 1
        })
    }

    render() {
        return (<div>hello {this.state.name} 年龄：{this.state.age}
            {/*注意 onclick里面一定不要写 this.addAge
            如果非要那么写,有两个解决方案
                1.可以先在constructor里面把this和这个函数绑定一下 this.addAge = this.addAge.bind(this)
                或者2.改造 addAge函数的写法 addAge = () => { ..... }
            */}
            <button onClick={() => this.addAge()}>+</button>
        </div>)
    }
}

ReactDOM.render(<Stu/>, document.getElementById('root'))

// 受控组件 ， 所有变化的状态统一绑定到state,有点蠢啊，vue直接自动绑定

class InputContro extends React.Component{

    state = {
        txt:'',
        t:''
        // state 里面有多个 下面的绑定方法就要写很多个 ，有点蠢 ， 下面 介绍如何一个方法解决
    }

    setTxt = (e) => {
        this.setState({
            txt: e.target.value
        })
        console.log(e.target.value ,"state" ,this.state.txt)

    }
    setT = (e) => {
        this.setState({
            t: 100
        })
    }

    render() {
        return (<div>
            <input type='text' value={this.state.txt} onChange={this.setTxt} />
        </div>)
    }
}

ReactDOM.render(<InputContro />,document.getElementById('root'))

// 受控组件 一个方法解决所有绑定 包括 像 checkbox那种值不是value而是checked
// 首先 要给每个控件 添加一个name属性 name属性要和state里面的一致

class Ct extends React.Component {

    state = {
        txt:'',
        checked:false
    }
    updateValue = (e) => {
        const name = e.target.name
        const type = e.target.type
        const val = type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [name] : val
        })
    }

    render() {

        return (
            <div>
               {/*注意这里的name的值要和state里面保持一样 这样[name] 才能匹配上*/}
                <input name='txt' type='text' value={this.state.txt} onChange={this.updateValue} />
                <input name='checked' type='checkbox' checked={this.state.checked} onChange={this.updateValue}/>
            </div>

        )
    }
}

ReactDOM.render(<Ct />,document.getElementById('root'))


// 非受控组件 不绑定到 state上

class NotBind extends React.Component{
    constructor () {
        super()
        //创建ref
        this.txtRef = React.createRef()
    }

    getVal = () => {
        console.log(this.txtRef.current.value)
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.txtRef} />
                <button onClick={this.getVal}>获取输入框的值 consloe.log</button>
            </div>
        )
    }
}

ReactDOM.render(<NotBind />,document.getElementById('root'))



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
