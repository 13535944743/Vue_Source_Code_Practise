/*
* 扫描器类
*/

export default class Scanner {
  constructor(templateStr) {
    this.templateStr = templateStr
    // 指针
    this.pos = 0
    // 尾巴，用于获取除指定符号外的内容(即`{{`和`}}`)
    this.tail = this.templateStr
  }

  // 跳过指定内容，无返回值
  scan(tag) {
    if (this.tail.indexOf(tag) === 0) {
      this.pos += tag.length
      this.tail = this.templateStr.substring(this.pos)
      // console.log(this.tail)
    }
  }

  // 让指针进行扫描，遇到指定内容才结束，还会返回结束之前遍历过的字符
  scanUtil(stopTag) {
    const start = this.pos  // 存放开始位置，用于返回结束前遍历过的字符

    // 没到指定内容时，都一直循环，尾巴也跟着变化
    while (this.tail.indexOf(stopTag) !== 0 && this.pos < this.templateStr.length) {    // 后面的另一个条件必须，因为最后需要跳出循环
      this.pos++
      this.tail = this.templateStr.substring(this.pos)
    }

    return this.templateStr.substring(start, this.pos)      // 返回结束前遍历过的字符
  }

  // end of string：判断模板字符串是否已经走到尽头了
  eos() {
    return this.pos === this.templateStr.length
  }
}