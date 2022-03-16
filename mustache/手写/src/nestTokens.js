// 把#和/之间的tokens整合起来，作为#所在数组的下标为2的项

export default function nestTokens(tokens) {
  const nestTokens = []
  const sections = []   // 栈结构
  let collector = nestTokens

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    switch (token[0]) {
      case '#':
        collector.push(token)
        sections.push(token)    // 入栈

        token[2] = []
        collector = token[2]
        break
      case '/':
        sections.pop()
        collector = sections.length > 0 ? sections[sections.length - 1][2] : nestTokens
        break
      default:
        collector.push(token)
    }
  }

  return nestTokens
}