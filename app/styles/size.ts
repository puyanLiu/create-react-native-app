import { Dimensions, StyleSheet } from 'react-native';
import './utils';

const window = Dimensions.get('window');
/**
 * 设备大小
 */
const width = window.width;
const height = window.height;
/**
 * tabbar height
 */
const tabbarHeight = px2dp(98);
/**
 * 当前平台最小宽度
 */
const HairlineWidth = StyleSheet.hairlineWidth * 2;
/**
 * 字体宽度
 */
const fontWeightMedium = '500';
const fontWeightThin = '200';

/**
 * TouchableOpacity的hitSlop,扩大点击范围
 */
const hitSlop = {
    top: px2dp(20),
    bottom: px2dp(20),
    left: px2dp(20),
    right: px2dp(20),
  };

export { width, height, tabbarHeight, HairlineWidth, hitSlop, fontWeightMedium, fontWeightThin };
