import vnode from './vnode.js'
import createElement from './createElement.js'
import patchVnode from './patchVnode.js'

export default function (oldVnode, newVnode) {
  // 表示是真实DOM，真实DOM需要先转换成虚拟DOM后才进行下面的操作。因为真实DOM是没有sel这个属性的
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // 转换成虚拟DOM
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], '', oldVnode)
  }

  // 判断oldVnode和newVnode是不是同一个节点
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    // 是同一个虚拟节点，需要进行精细化比对，最小化更新
    patchVnode(oldVnode, newVnode)

  } else {
    // 不是同一个虚拟节点，暴力删除旧的，插入新的
    const newDomNode = createElement(newVnode)     // 把新虚拟节点变成真实DOM

    const pivot = oldVnode.elm

    // 将新创建的孤儿节点上树
    pivot.parentNode.insertBefore(newDomNode, pivot)
    // 删除旧的
    pivot.parentNode.removeChild(pivot)
  }
}