// 把模板字符串编译成tokens数组

import Scanner from './Scanner.js'
import nestTokens from './nestTokens.js'

export default function parseTemplateToTokens() {
  const tokens = []

  // 实例化一个扫描器
  const scanner = new Scanner(templateStr)

  while (!scanner.eos()) {
    let words = scanner.scanUtil('{{')
    if (words !== '') {
      switch (words[0]) {
        case '#':
          tokens.push(['#', words.substring(1)])
          break
        case '/':
          tokens.push(['/', words.substring(1)])
          break
        default:
          tokens.push(['text', words])// 把text部分存好: 左括号之前的是text
      }
    }

    scanner.scan('{{')

    words = scanner.scanUtil('}}')
    if (words !== '') {
      switch (words[0]) {
        case '#':
          tokens.push(['#', words.substring(1)])
          break
        case '/':
          tokens.push(['/', words.substring(1)])
          break
        default:
          tokens.push(['name', words]) // 把name部分存好: 右括号之前的是name
      }
    }

    scanner.scan('}}')
  }

  return nestTokens(tokens)
}