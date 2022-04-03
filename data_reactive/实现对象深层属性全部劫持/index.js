import observe from './observe.js'

const obj = {
  job: {
    salary: 1111
  }
}

observe(obj)

obj.job.salary = {
  rank1: 1111,
  rank2: 2222
}

obj.job.salary.rank1 = 11111

