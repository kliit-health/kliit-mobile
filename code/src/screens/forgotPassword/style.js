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
  backIconStyle: {
    margin: metrics.DEVICE_HEIGHT * 0.02,
    height: metrics.DEVICE_WIDTH * 0.05,
    width: metrics.DEVICE_WIDTH * 0.05,
    alignSelf: 'flex-end',
  },
  logoStyle: {
    alignSelf: 'center',
    height: metrics.DEVICE_WIDTH * 0.32,
    width: metrics.DEVICE_WIDTH * 0.32,
  },
  titleContainer: {
    marginTop: metrics.DEVICE_HEIGHT * 0.08,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH - parentPadding,
    paddingLeft: childPaddingValue,
    paddingRight: childPaddingValue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    textAlign: 'center',
    fontSize: Constant.App.textSize.xxLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    color: Constant.App.colors.blackColor,
    width: metrics.DEVICE_WIDTH - childPadding,
  },
  subTitleTextStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    textAlign: 'center',
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.headerRegular,
    color: Constant.App.colors.blackColor,
    width: metrics.DEVICE_WIDTH - childPadding,
  },
  inputTextParentContainerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.DEVICE_WIDTH - parentPadding,
    paddingLeft: childPaddingValue,
    paddingRight: childPaddingValue,
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
  },
  inputTextContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.DEVICE_WIDTH - childPadding,
    paddingBottom: Platform.OS === 'ios' ? metrics.DEVICE_HEIGHT * 0.01 : 0,
    borderBottomColor: Constant.App.colors.blackColor,
    borderBottomWidth: 0.5,
  },
  inputTypeStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    width: metrics.DEVICE_WIDTH - childPadding,
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    borderRadius: Constant.App.dimensions.btnBorderRadiusGlobal,
    padding: Constant.App.dimensions.btnPaddingGlobal,
    width: metrics.DEVICE_WIDTH - childPadding,
    backgroundColor: Constant.App.colors.blueColor,
    marginTop: metrics.DEVICE_HEIGHT * 0.02,
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontSize: Constant.App.textSize.Normal,
    color: Constant.App.colors.whiteColor,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
});

export default styles;
