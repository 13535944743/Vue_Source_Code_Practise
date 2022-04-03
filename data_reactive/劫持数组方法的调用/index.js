import observe from './observe.js'

const obj = {
  color: ['red', 'blue', 'purple']
}


observe(obj)

console.log(obj.color[2])
console.log('%c%s', 'font-size: 28px;color: red', '----------------------')

obj.color[2] = 'Purple'
console.log('%c%s', 'font-size: 28px;color: red', '----------------------')

obj.color.push({
  name: 'white'
})
console.log(obj.color)
console.log(obj.color[3].name)