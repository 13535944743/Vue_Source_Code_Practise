// 用于定义对象的属性，可传参控制是否可以枚举

export const def = function (obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    writable: true,
    configurable: true,   // 可被配置，如被delete
  })
}