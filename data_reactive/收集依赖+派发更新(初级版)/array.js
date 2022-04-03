// 重写7个数组方法
const ArrayPrototype = Array.prototype

// 以Array.prototype为原型创建arrayMethods对象(其实就是arrayMethods对象就能继承Array.prototype的方法)
export const arrayMethods = Object.create(ArrayPrototype)

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

})