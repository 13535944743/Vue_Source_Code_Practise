// 精细化比对，最小化更新

import createElement from './createElement.js'
import updateChildren from './updateChildren.js'

export default function patchVNode(oldVnode, newVnode) {
  if (oldVnode === newVnode) {
    // oldVnode和newVnode是内存上的同一对象，即完全相同，不做任何处理
    return
  }

  if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
    // newVnode的内容是text，而不是子节点
    if (newVnode.text === oldVnode.text) {
      return
    }

    oldVnode.elm.innerText = newVnode.text
  } else {
    // newVnode的内容是子节点
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // newVnode的内容是子节点，oldVnode的内容也是子节点
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      // newVnode的内容是子节点，而oldVnode的内容是text：需要清空oldVnode，然后再把newVnode的children添加DOM上
      oldVnode.elm.innerText = ''

      for (let i = 0; i < newVnode.children.length; i++) {
        let domNode = createElement(newVnode.children[i])
        oldVnode.elm.append(domNode)
      }
    }
  }
}