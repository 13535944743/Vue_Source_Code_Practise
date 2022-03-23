// 精细化比对，最小化更新的，其中新旧节点的内容都是节点的情况

import createElement from "./createElement.js"
import patchVnode from "./patchVnode.js"

// parentElm：oldVnode对应的真实DOM，用于更新DOM
// oldCh：旧节点的子节点
// newCh：新节点的子节点

// 判断是不是同一个虚拟节点
function checkSamVnode(v1, v2) {
  return v1.sel === v2.sel && v1.key === v2.key
}

export default function updateChildren(parentElm, oldCh, newCh) {
  // 旧前指针
  let oldStartIdx = 0
  // 旧后指针
  let oldEndIdx = oldCh.length - 1
  // 旧前节点
  let oldStartVnode = oldCh[0]
  // 旧后节点
  let oldEndVnode = oldCh[oldEndIdx]

  // 新前指针
  let newStartIdx = 0
  // 新后指针
  let newEndIdx = newCh.length - 1
  // 新前节点
  let newStartVnode = newCh[0]
  // 新后节点
  let newEndVnode = newCh[newEndIdx]

  let map = {};

  while (oldStartIdx <= oldEndIdx & newStartIdx <= newEndIdx) {
    if (oldStartVnode === undefined) {
      // 跳过undefined
      oldStartVnode = oldCh[++oldStartIdx]
    }
    if (oldEndVnode === undefined) {
      // 跳过undefined
      oldEndVnode = oldCh[--oldEndIdx]
    }

    if (checkSamVnode(newStartVnode, oldStartVnode)) {
      // 新前旧前命中
      console.log('新前旧前命中')

      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (checkSamVnode(newEndVnode, oldEndVnode)) {
      // 新后旧后命中
      console.log('新后旧后命中')

      // 继续精细化比较两个节点
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSamVnode(newEndVnode, oldStartVnode)) {
      // 新后旧前命中
      console.log('新后旧前命中')

      // 继续精细化比较两个节点
      patchVnode(oldStartVnode, newEndVnode)

      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibiling)
      oldStartVnode = undefined

      newEndVnode = newCh[--newEndIdx]
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (checkSamVnode(newStartVnode, oldEndVnode)) {
      // 新前旧后命中
      console.log('新前旧后命中')

      // 继续精细化比较两个节点
      patchVnode(oldEndVnode, newStartVnode)

      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = undefined

      newStartVnode = newCh[++newStartIdx]
      oldEndVnode = oldCh[--oldEndIdx]
    } else {
      // 四种情况都没命中
      for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        const item = oldCh[i]
        if (item === undefined) {
          // 跳过undefined
          continue
        }
        const key = item.key
        map[key] = i
      }

      // 看一下map中有没有和新前指向的节点相同的
      const indexOld = map[newStartVnode.key]
      if (indexOld) {
        // 存在，则是移动
        const elmToMove = oldCh[indexOld]
        // 继续精细化比较
        patchVnode(elmToMove, newStartVnode)

        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
        oldCh[indexOld] = undefined
      } else {
        // 不存在，需要新增节点
        const newDomNode = createElement(newStartVnode)
        parentElm.insertBefore(newDomNode, oldStartVnode.elm)
      }

      newStartVnode = newCh[++newStartIdx]
    }
  }

  if (newStartIdx <= newEndIdx) {
    // 旧节点先循环完毕，需要新增`新前指针`、` 新后指针`之间节点
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      const item = newCh[i]
      if (item === undefined) {
        continue;
      }

      const newDomNode = createElement(item)

      if (!oldStartVnode) {
        // 如果此时旧前指针指向的是undefined，则直接在最后插入
        parentElm.appendChild(newDomNode)
      } else {
        parentElm.insertBefore(newDomNode, oldStartVnode.elm)
      }
    }
  } else if (oldStartIdx <= oldEndIdx) {
    // 新节点先循环完毕，需要删除`旧前指针`、` 旧后指针`之间节点
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      const item = oldCh[i]
      if (item === undefined) {
        continue;
      }
      parentElm.removeChild(item.elm)
    }
  }

}