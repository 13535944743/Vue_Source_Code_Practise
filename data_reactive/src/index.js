// import observe from './observe.js'
// import Watcher from './Watcher.js'

// const obj = {
//   job: {
//     salary: 1111
//   }
// }

// observe(obj)

// new Watcher(obj, "job.salary", (val) => {
//   console.log("watcher监听", val)
// })

// obj.job.salary = {
//   rank1: 1111,
//   rank2: 2222
// }

// obj.job.salary.rank1 = 9999

import Watcher from './Watcher.js'
import observe from './observe.js'

const obj = {
  color: ['red', 'blue', 'purple']
}


observe(obj)

new Watcher(obj, 'color', (val) => {
  console.log(val)
})

obj.color.push('white')