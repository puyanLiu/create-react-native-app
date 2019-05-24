import { ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { borderColor, fontColor } from './color';
import { HairlineWidth } from './size';

export * from './utils';
export * from './color';
export * from './size';

interface IStyles {
  /** 字体颜色部分 */
  font_20: TextStyle;
  font_22: TextStyle;
  font_24: TextStyle;
  font_26: TextStyle;
  font_28: TextStyle;
  font_30: TextStyle;
  font_30_bold: TextStyle;
  font_32: TextStyle;
  font_34: TextStyle;
  font_36: TextStyle;
  borderTop: ViewStyle;
  centerFlex: ViewStyle;
}

const defaultStyles = StyleSheet.create<IStyles>({
  font_20: {
    fontSize: px2dp(20),
    color: fontColor,
    backgroundColor: 'transparent',
  },
  font_22: {
    fontSize: px2dp(22),
    color: fontColor,
    backgroundColor: 'transparent',
  },
  font_24: {
    fontSize: px2dp(24),
    color: fontColor,
    backgroundColor: 'transparent',
  },
  font_26: {
    fontSize: px2dp(26),
    color: fontColor,
    backgroundColor: 'transparent',
  },
  font_28: {
    fontSize: px2dp(28),
    color: fontColor,
    backgroundColor: 'transparent',
  },
  font_30: {
    fontSize: px2dp(30),
    color: fontColor,
    backgroundColor: 'transparent',
  },
  font_30_bold: {
    fontSize: px2dp(30),
    color: fontColor,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  font_32: {
    fontSize: px2dp(32),
    color: fontColor,
    backgroundColor: 'transparent',
  },
  font_34: {
    fontSize: px2dp(34),
    color: fontColor,
    backgroundColor: 'transparent',
  },
  font_36: {
    fontSize: px2dp(36),
    color: fontColor,
    backgroundColor: 'transparent',
  },
  borderTop: {
    borderTopWidth: HairlineWidth,
    borderTopColor: borderColor,
  },
  centerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default defaultStyles;
