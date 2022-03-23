import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// 加载模块，没有对应模块的话，上树后，也对应没有。比如少事件监听模块，上树后，事件将不再生效
// 类名模块、属性模块、样式模块、事件监听模块
const patch = init([classModule, propsModule, styleModule, eventListenersModule])


const myVnode = h('button', {
  class: {            // 类名
    "btn": true
  },
  props: {            // 属性, id也在这里面
    id: 'btn',
    title: '赤蓝紫'
  },
  style: {          // 样式
    backgroundColor: 'red',
    border: 0,
    color: '#fff',
  },
  on: {             // 事件监听
    click: function () {
      location.assign('https://clz.vercel.app')
    }
  }
}, '赤蓝紫')

// // h函数嵌套使用
// const myVnode = h('ul', [     // 没有数据参数
//   h('li', '赤'),        // 可以没有数据参数
//   h('li', {}, '蓝'),    // 数据参数可为空
//   h('li', h('span', '紫'))    // 内容参数只有一个时，可以不是数组形式
// ])

console.log(myVnode)


const container = document.getElementById('container')
patch(container, myVnode)     // 上树

