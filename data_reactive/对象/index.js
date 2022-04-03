import defineReactive from './defineReactive.js'
import Observer from './Observer.js'
import observe from './observe.js'

const obj = {
  job: {
    salary: 1111
  },
  sex: 'man'
}

observe(obj)

obj.job.salary = 2222
