/*
 * @Description:
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-07-01 10:08:18
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
 */

/**
 * copy properties from one object to another
 * to get a mixed result
 */
export function mixOptions(source, target) {
  if (
    toString.call(source) !== "[object Object]" ||
    toString.call(target) !== "[object Object]"
  ) {
    return target;
  }

  for (const p in target) {
    if (source.hasOwnProperty(p)) {
      if (p === "content" && typeof source[p] === "string") {
        source[p] = source[p]
          .trim()
          .split(",")
          .filter((n) => !!n);
      }

      const valS = source[p];

      if (toString.call(valS) === "[object Object]") {
        target[p] = mixOptions(valS, target[p]);
      } else {
        target[p] = valS;
      }
    }
  }
  return target;
}
