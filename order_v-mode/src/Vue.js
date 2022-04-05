import Compile from "./Compile.js"
import observe from './dataReactive/observe.js'
import Watcher from './dataReactive/Watcher.js'

export default class Vue {
  constructor(options) {
    // Vue的设置，如el、data
    this.$options = options || {}

    // 数据
    this._data = options.data || undefined


    // 把数据变成响应式的
    observe(this._data)

    this._initData()
    this._initWatch()

    // 模板编译
    new Compile(options.el, this)
  }

  // 把数据直接给Vue实例，并实现数据劫持
  _initData() {
    const self = this

    Object.keys(this._data).forEach(key => {
      Object.defineProperty(self, key, {
        get() {
          console.log('访问数据')
          return self._data[key]
        },
        set(newVal) {
          console.log('改变数据')
          self._data[key] = newVal
        }
      })
    })

  }

  // 监听器初始化
  _initWatch() {
    const self = this
    const watch = this.$options.watch

    Object.keys(watch).forEach(key => {
      new Watcher(self, key, watch[key])
    })
  }

}