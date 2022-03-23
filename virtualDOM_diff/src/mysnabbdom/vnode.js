
/*
 * 函数功能：把传入的参数组合成对象后返回
 * 
 * 参数介绍
 * children: 子元素，没有则为` undefined`
 * data(对象形式): 类名、属性、样式、事件
 * elm: 对应的真实DOM节点(如果还没上树，则为`undefined` )
 * sel：选择器
 * text：文字
 * key: 节点的唯一标识
*/

export default function (sel, data, children, text, elm) {
  return {
    sel,
    data,
    children,
    text,
    elm,
    key: data.key
  }
}