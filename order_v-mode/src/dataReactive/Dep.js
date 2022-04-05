export default class Dep {
  constructor() {
    // dep数组。储存依赖的订阅者，即watcher的实例
    this.subs = []
  }

  // 添加依赖
  depend() {
    // 之前是添加到window对象上，但是实际上只要是全局的都可以
    console.log('添加依赖')
    this.addSub(Dep.target)
  }

  // 派发更新
  notify() {
    const subs = [...this.subs]
    subs.forEach(s => s.update())
  }

  // 添加订阅
  addSub(sub) {
    this.subs.push(sub)
  }
}