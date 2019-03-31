
/**
 * 把url中的一些特殊字符换掉，js默认的编码是把空格转换成 %2B
 * @param {string} url
 */
export function urlencode (url) {
  // ' ' ==> '+';   '+' ==> '%2B'; '\n' ==> '%0A'
  url = url.replace(/\n/g, '%0A');
  url = url.replace(/\+/g, '%2B');
  url = url.replace(/ /g, '+');
  return url;
}
