import { Dimensions, Platform } from 'react-native';

const window = Dimensions.get('window');

/**
 * 判断是否IOS平台
 */
const isIOS = Platform.OS === 'ios';
/**
 * 判断是否Android平台
 */
const isAndroid = Platform.OS === 'android';

/**
 * 转换颜色为RGBA格式
 * @param {string} color 颜色值
 * @param {number} opacity 透明度
 * @returns {string}
 */
function convertToRGBA(color: string, opacity: number): string {
  let result = '';
  if (color.indexOf('#') === 0) {
    const _color = color.replace('#', '');
    const r = parseInt(_color.substring(0, 2), 16);
    const g = parseInt(_color.substring(2, 4), 16);
    const b = parseInt(_color.substring(4, 6), 16);
    result = `rgba(${r},${g},${b},${opacity})`;
  } else if (color.indexOf('rgb') === 0 && color.indexOf('rgba') === -1) {
    result = `rgba${color.slice(3, -1)},${opacity})`;
  } else if (color.indexOf('rgba') === 0) {
    const index = color.lastIndexOf(',');
    result = `${color.slice(0, index)},${opacity})`;
  }
  return result;
}

declare global {
  function px2dp(px: number): number;
}

declare const global: any;
/**
 * 根据750px的设计稿比例转换成dp
 * global.px2dp === global['px2dp']
 */
global.px2dp = (px: number) => (px / 750) * window.width;

export { isIOS, isAndroid, convertToRGBA };
