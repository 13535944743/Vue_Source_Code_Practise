// 将一个正常的object对象转换为每个层级的属性都是响应式(可以被侦测到的object)

import { def } from './def.js'
import defineReactive from './defineReactive.js'

export default class Observer {
  constructor(value) {
    // 给value添加__ob__属性，值是实例，且__ob__属性不可枚举
    // ` __ob__`属性用于标记是否已经被转换成响应式数据了，并且值是Observer的实例
    def(value, '__ob__', this, false)
    this.walk(value)
  }


  // 遍历对象的属性，并让它们都变成响应式的
  walk(value) {
    for (let k in value) {
      defineReactive(value, k)
    }
  }
}