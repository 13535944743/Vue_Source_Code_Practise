import Watcher from "./dataReactive/Watcher"

export default class Compile {
  constructor(el, vue) {
    console.log('模板编译的构造函数')
    // vue实例
    this.$vue = vue

    // 挂载的真实DOM
    this.$el = document.querySelector(el)

    if (this.$el) {
      // 让真实DOM节点变成fragment
      let $fragment = this.node2Fragement(this.$el)

      // 编译
      this.compile($fragment)

      this.$el.appendChild($fragment)
    }
  }

  node2Fragement(el) {
    const fragment = document.createDocumentFragment()
    // console.log(fragment)

    let child
    while (child = el.firstChild) {
      // 逐层把所有的子元素都添加到fragment节点中
      fragment.appendChild(child)
    }

    return fragment
  }

  compile(el) {
    // 获取子节点
    const childNodes = el.childNodes
    const self = this

    // 匹配{{data}}形式的内容
    const reg = /\{\{(.*)\}\}/

    childNodes.forEach(node => {
      const text = node.textContent

      if (node.nodeType === 1) {
        // 子节点是元素节点
        self.compileElement(node)
      } else if (node.nodeType === 3 && reg.test(text)) {
        // 子节点是文本节点，且不是空格，即是{{data}}形式的

        // 把花括号中的data取出来
        let data = text.match(reg)[1]
        self.compileText(node, data)
      }
    })
  }

  // 编译元素节点
  compileElement(node) {
    // 获取节点的属性，即class、id等
    const nodeAttrs = node.attributes

    const self = this

    // 把类数组转换为数组
    const nodeAttrsArr = [...nodeAttrs]

    nodeAttrsArr.forEach(attr => {
      // 在这里分析指令，因为指令也是节点的属性
      const attrName = attr.name
      const attrValue = attr.value

      // 获取具体指令，因为指令都是v-开头的
      const dir = attrName.substring(2)

      if (attrName.indexOf('v-') === 0) {
        // console.log('是指令')
        if (dir === 'model') {
          // console.log('是v-model指令')
          let value = this.parsePath(self.$vue, attrValue)
          node.value = value

          new Watcher(self.$vue, attrValue, val => {
            node.value = val
          })

          node.addEventListener('input', e => {
            const newValue = e.target.value

            self.parsePathSet(self.$vue, attrValue, newValue)

            console.log(self)
          })

        } else if (dir === 'if') {
          console.log('是v-if指令')
        }
      }
    })
  }

  compileText(node, data) {
    // 编译文本节点，即{{data}}
    // 因为data中可能会有点语法，所以需要parsePath方法
    node.textContent = this.parsePath(this.$vue, data)
    // console.log(node.textContent)

    new Watcher(this.$vue, data, (val) => {
      node.textContent = val
    })
  }

  // 实现点语法
  parsePath(obj, expression) {
    if (!obj) {
      return
    }

    const segments = expression.split('.')

    for (const key of segments) {
      obj = obj[key]
    }

    return obj
  }

  // 通过点语法设置新值
  parsePathSet(obj, expression, value) {
    if (!obj) {
      return
    }

    const segments = expression.split('.')

    segments.forEach((key, index) => {
      if (index < segments.length - 1) {
        obj = obj[key]
      } else {
        // 走到最后，设置新值
        obj[key] = value
      }
    })

    return obj
  }
}