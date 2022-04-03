// 重写7个数组方法

import { def } from './def.js'

const ArrayPrototype = Array.prototype

// 以Array.prototype为原型创建arrayMethods对象(其实就是arrayMethods对象就能继承Array.prototype的方法)
export const arrayMethods = Object.create(ArrayPrototype)

// 要被改写的7个数组方法
const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsNeedChange.forEach(methodName => {
  // 备份原来的方法
  const original = ArrayPrototype[methodName]

  // 定义新的方法
  def(arrayMethods,
    methodName,
    function () {
      // 这里不能使用箭头函数，因为apply调用需要this来绑定调用此方法的数组

      // 恢复数组方法原有的功能
      const result = original.apply(this, arguments)

      // 把类数组变成数组
      const args = [...arguments]

      // 把数组的__ob__属性取出来。用于把数组的每一项都变成响应式
      const ob = this.__ob__

      // 新增数据也要变成响应式
      let inserted = []
      switch (methodName) {
        case 'push':
        case 'unshift':
          inserted = arguments
          break
        case 'splice':
          inserted = args.slice(2)
          break
      }

      if (inserted) {
        // 有新增的项，需要变为响应式
        this.__ob__.observeArray(inserted)
      }

      return result
    }, false)
})