/* 监听value。
 * 如果value已经是响应式的对象了，那么就直接返回已经创建的` Observer`实例即可，
 * 否则创建` Observer`实例。
*/

import Observer from './Observer.js'

export default function observe(value) {
  // 如果value不是对象，就什么都不做
  if (typeof value !== 'object') {
    return
  }

  let ob
  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }

  return ob
}
