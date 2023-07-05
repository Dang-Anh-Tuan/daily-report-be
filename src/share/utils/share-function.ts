export interface IObject<T = unknown> {
  [key: string]: T
}

/**
 * process data input format string
 * @param strInput data input type string
 * @param obj
 * @param prefixObjStr
 * @returns
 */
export const formatStringObj = (
  strInput: string,
  obj?: IObject<any>,
  prefixObjStr = ''
) => {
  if (!obj) {
    return strInput
  }
  let str = strInput
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      if (typeof obj[key] === 'object' && !(obj[key] instanceof Array)) {
        str = formatStringObj(str, obj[key], `${key}.`)
      }
      str = str.replace(
        new RegExp(`<<${prefixObjStr}${key}>>`, 'g'),
        obj[key].toString()
      )
    }
  })

  return str
}
