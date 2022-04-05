
import Dep from './Dep.js'

export default class Watcher {
  constructor(data, expression, callback) {
    // data: 数据对象。
    // expression: 表达式。如通过点语法访问深层属性。a.b.c
    // callback: 依赖发生变化后，执行的回调函数
    this.data = data
    this.expression = expression
    this.callback = callback

    // 订阅数据
    this.value = this.get()
  }

  get() {
    Dep.target = this    // 挂载实例到window对象上
    const value = parsePath(this.data, this.expression)

    Dep.target = null   // 重置Dep.target
    return value
  }

  update() {
    // 数据变化时，调用此方法
    const oldValue = this.value
    this.value = parsePath(this.data, this.expression) //更新数据
    console.log('派发更新, 更新后的数据', this.value)
    this.callback(this.value, oldValue) // 执行回调
  }

}

// 实现点语法。obj[a.b.c]变为obj[a][b][c]
function parsePath(obj, expression) {
  if (!obj) {
    return
  }

  const segments = expression.split('.')

  for (const key of segments) {
    obj = obj[key]
  }

  return obj
}