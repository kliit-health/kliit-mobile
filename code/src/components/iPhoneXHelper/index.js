import { Dimensions, Platform, StatusBar } from 'react-native';

export const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios'
    && !Platform.isPad
    && !Platform.isTVOS
    && (dimen.height === 812
      || dimen.width === 812
      || (dimen.height === 896 || dimen.width === 896))
  );
};

export const ifIphoneX = (iphoneXStyle, regularStyle) => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
};

export const getStatusBarHeight = safe => Platform.select({
  ios: ifIphoneX(safe ? 45 : 35, 20),
  // android: StatusBar.currentHeight,
  android: 0,
});

export const getBottomSpace = () => (isIphoneX() ? 34 : 0);
