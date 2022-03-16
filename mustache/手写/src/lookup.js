// 把` obj[x.y]`的形式变为`obj[x][y] `的形式

export default function lookup(dataObj, keysStr) {
  if (keysStr.indexOf('.') === -1 || keysStr === '.') {
    return dataObj[keysStr]
  }


  const keys = keysStr.split('.')
  let temp = dataObj

  for (let i = 0; i < keys.length; i++) {
    temp = temp[keys[i]]
  }

  return temp
}