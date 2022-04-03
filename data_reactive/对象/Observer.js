// 将一个正常的object对象转换为每个层级的属性都是响应式(可以被侦测到的object)

import { def } from './utils.js'
import defineReactive from './defineReactive.js'

export default class Observer {
  constructor(value) {
    // 给value添加__ob__属性，值是实例，且__ob__属性不可枚举
    def(value, '__ob__', this, false)
    this.walk(value)
  }

  // 遍历
  walk(value) {
    for (let k in value) {
      defineReactive(value, k)
    }
  }
}