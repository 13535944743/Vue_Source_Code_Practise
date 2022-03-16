// 将tokens数组结合数据解析成dom字符串

import lookup from './lookup.js'

export default function renderTemplate(tokens, data) {
  let result = ''

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    if (token[0] === 'text') {
      result += token[1]

    } else if (token[0] === 'name') {
      result += lookup(data, token[1])

    } else if (token[0] === '#') {
      let datas = data[token[1]]  // 拿到所有的数据数组

      for (let i = 0; i < datas.length; i++) {   // 遍历数据数组，实现循环
        result += renderTemplate(token[2], {// 递归调用
          ...datas[i],     // 使用扩展字符串...，把对象展开，再添加.属性为对象本身
          '.': datas[i]
        })
      }
    }
  }

  return result
}