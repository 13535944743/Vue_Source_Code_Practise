/*
 * 低配版本的h函数，必须接收3个参数
 * 调用可以有以下三种形式
 * 1. h('div', {}, '文字')
 * 2. h('div', {}, [])
 * 3. h('div', {}, h())
*/

import { h } from 'snabbdom'
import vnode from './vnode.js'


export default function (sel, data, content) {
  if (arguments.length !== 3) {
    throw new Error('这是低配版h函数, 必须接收3个参数')
  } else if (typeof content === 'string' || typeof content === 'number') {
    // 形式1
    return vnode(sel, data, undefined, content, undefined)

  } else if (Array.isArray(content)) {
    // 形式2
    const children = []

    for (let i = 0; i < content.length; i++) {
      if (!(typeof content[i] === 'object' && content[i].hasOwnProperty('sel'))) {
        throw new Error('传入的数组中又有不是调用h函数的')
      }

      children.push(content[i])      // 因为传的数组里的元素就是调用h函数的，即得到的已经是处理过后返回的对象了
    }

    return vnode(sel, data, children, undefined, undefined)

  } else if (typeof content === 'object' && content.hasOwnProperty('sel')) {
    // 形式3：因为h函数最终会返回一个一定会有`sel`属性的对象

    return vnode(sel, data, [content], undefined, undefined)    //把它当成只有一个元素的数组来处理

  } else {
    throw new Error('传入的第三个参数类型不对')
  }
}