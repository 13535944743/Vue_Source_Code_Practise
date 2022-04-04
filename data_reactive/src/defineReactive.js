import observe from './observe.js'
import Dep from './Dep.js'

export default function defineReactive(data, key, val) {
  // console.log(data, key)
  if (arguments.length === 2) {
    val = data[key]
  }

  const dep = new Dep()

  // 对子属性进行侦测。避免子属性是对象，且还不是响应式的情况
  let childOb = observe(val)

  Object.defineProperty(data, key, {
    // 可被枚举
    enumerable: true,
    // 可被配置，如被delete
    configurable: true,

    // getter
    get() {
      if (Dep.target) {
        // 条件符合才收集依赖
        dep.depend()

        if (childOb) {
          // 如果有子元素
          childOb.dep.depend()
        }
      }

      return val
    },

    // setter
    set(newValue) {
      if (val === newValue) {
        return
      }

      val = newValue
      // 设置的新值同样需要observe(防止赋值的新值是对象，同样需要侦测)
      childOb = observe(newValue)

      dep.notify()    // 派发更新
    }
  })
}