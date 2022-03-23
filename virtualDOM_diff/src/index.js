import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'


const myVnode1 = h('ul', {}, [
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'd' }, 'd'),
])
const myVnode2 = h('ul', {}, [
  h('li', { key: 'd' }, 'd'),
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'e' }, 'e'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
])
// container只是占位符，上树后会消失
const container = document.getElementById('container')

patch(container, myVnode1)     // 上树

const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
  patch(myVnode1, myVnode2)
})



