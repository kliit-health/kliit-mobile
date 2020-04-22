import { StyleSheet, Platform } from 'react-native';
import Constant from '../../utils/constants';
import metrics from '../../utils/metrices';
import { getStatusBarHeight } from '../../components/iPhoneXHelper';

let parentPaddingValue = metrics.DEVICE_WIDTH * 0.08;
let parentPadding = parentPaddingValue * 2;
let childPaddingValue = metrics.DEVICE_WIDTH * 0.03;
let childPadding = parentPadding + (childPaddingValue * 2);
const styles = StyleSheet.create({
  parentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getStatusBarHeight(),
  },
  contentContainerStyle: {
    padding: parentPaddingValue
  },
  logoStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.04,
    alignSelf: 'center',
    height: metrics.DEVICE_WIDTH * 0.32,
    width: metrics.DEVICE_WIDTH * 0.32,
  },
  titleContainer: {
    marginTop: metrics.DEVICE_HEIGHT * 0.05,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH - parentPadding,
    paddingLeft: childPaddingValue,
    paddingRight: childPaddingValue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    textAlign: 'center',
    fontSize: Constant.App.textSize.xxxLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    color: Constant.App.colors.blackColor,
    width: metrics.DEVICE_WIDTH - childPadding,
  },
  subTitleTextStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.02,
    textAlign: 'center',
    fontSize: Constant.App.textSize.xxLarge,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    color: Constant.App.colors.blackColor,
    width: metrics.DEVICE_WIDTH - childPadding,
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    borderRadius: Constant.App.dimensions.btnBorderRadiusGlobal,
    padding: Constant.App.dimensions.btnPaddingGlobal,
    width: metrics.DEVICE_WIDTH - childPadding,
    backgroundColor: Constant.App.colors.blueColor,
    marginTop: metrics.DEVICE_HEIGHT * 0.06,
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontSize: Constant.App.textSize.Normal,
    color: Constant.App.colors.whiteColor,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
});

export default styles;
