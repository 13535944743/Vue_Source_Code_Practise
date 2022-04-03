// 将一个正常的object对象转换为每个层级的属性都是响应式(可以被侦测到的object)

import { def } from './def.js'
import defineReactive from './defineReactive.js'
import { arrayMethods } from './array.js'
import observe from './observe.js'

export default class Observer {
  constructor(value) {
    // 给value添加__ob__属性，值是实例，且__ob__属性不可枚举
    // ` __ob__`属性用于标记是否已经被转换成响应式数据了，并且值是Observer的实例
    def(value, '__ob__', this, false)

    // 判断是不是数组
    if (Array.isArray(value)) {
      // 设置数组的原型，这样子才可以调用自己改写后的数组方法
      Object.setPrototypeOf(value, arrayMethods)

      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }


  // 遍历对象的属性，并让它们都变成响应式的
  walk(value) {
    for (let k in value) {
      defineReactive(value, k)
    }
  }

  // 遍历数组。因为数组是特殊的对象，属性名是索引值，所以不适合用和普通对象的遍历方式
  observeArray(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
      // 判断数组的每一项是否已经是响应式的了。
      observe(arr[i])
    }
  }
}