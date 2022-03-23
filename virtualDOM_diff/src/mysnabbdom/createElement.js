// 真正创建节点，将vnode创建为DOM

export default function createElement(vnode) {
  // 创建一个DOM节点，此时还是孤儿节点
  const domNode = document.createElement(vnode.sel)

  // 看一下，内部是文字还是子节点
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    // 内部是文字
    domNode.innerText = vnode.text

  } else if (Array.isArray(vnode.children) && vnode.children.length >= 0) {
    // 内部是子节点,需要递归创建子节点
    for (let i = 0; i < vnode.children.length; i++) {
      const childDomNode = createElement(vnode.children[i])   // 递归创建子节点

      // 创建的子节点需要添加到DOM节点里
      domNode.appendChild(childDomNode)
    }
  }

  // 设置好虚拟节点对应的真实DOM节点
  vnode.elm = domNode

  // 返回真实DOM对象
  return vnode.elm
}