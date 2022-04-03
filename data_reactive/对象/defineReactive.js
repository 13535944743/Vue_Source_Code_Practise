import observe from './observe.js'

export default function defineReactive(data, key, val) {
  // console.log(data, key)
  if (arguments.length === 2) {
    val = data[key]
  }

  // 子元素进行observe
  let childOb = observe(val)

  Object.defineProperty(data, key, {
    // 可被枚举
    enumerable: true,
    // 可被配置，如被delete
    configurable: true,
    // getter
    get() {
      console.log(`试图访问${key}属性`)
      return val
    },
    // setter
    set(newValue) {
      console.log(`试图改变${key}属性`, newValue)

      if (val === newValue) {
        return
      }

      val = newValue
      // 设置的新值同样需要observe(防止赋值的新值是对象，同样需要侦测)
      childOb = observe(newValue)
    }
  })
}