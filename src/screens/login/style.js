import { StyleSheet } from 'react-native';
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
    padding: parentPaddingValue,
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
  toggleButtonContainer: {
    flexDirection: 'row',
    width: metrics.DEVICE_WIDTH - parentPadding,
    backgroundColor: Constant.App.colors.lightGrey,
    borderRadius: 10,
    marginTop: metrics.DEVICE_HEIGHT * 0.08,
  },
  userButtonContainerStyle: {
    padding: 5,
    borderWidth: 1,
    borderColor: Constant.App.colors.lightGrey,
    borderRadius: 10,
    width: (metrics.DEVICE_WIDTH - parentPadding) * 0.5,
    backgroundColor: Constant.App.colors.lightGrey,
  },
  userButtonTextStyle: {
    textAlign: 'center',
    fontSize: Constant.App.textSize.Normal,
    color: Constant.App.colors.blackColor,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  expertButtonContainerStyle: {
    borderWidth: 1,
    padding: 5,
    borderColor: Constant.App.colors.lightGrey,
    borderRadius: 10,
    width: (metrics.DEVICE_WIDTH - parentPadding) * 0.5,
    backgroundColor: Constant.App.colors.lightGrey,
  },
  expertButtonTextStyle: {
    textAlign: 'center',
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    color: Constant.App.colors.blackColor,
  },
  inputTextParentContainerStyle: {
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH - parentPadding,
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    paddingLeft: childPaddingValue,
    paddingRight: childPaddingValue,
  },
  inputTextContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.DEVICE_WIDTH - childPadding,
    paddingBottom: Platform.OS === 'ios' ? metrics.DEVICE_HEIGHT * 0.01 : 0,
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    borderBottomColor: Constant.App.colors.blackColor,
    borderBottomWidth: 0.5,
  },
  inputTypeStyle: {
    color: Constant.App.colors.blackColor,
    width: metrics.DEVICE_WIDTH - parentPadding,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    width: metrics.DEVICE_WIDTH - childPadding,
  },
  inputTypePasswordStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    textAlign: 'left',
    width: metrics.DEVICE_WIDTH - childPadding - (metrics.DEVICE_WIDTH * 0.05),
  },
  passwordHideShowIconStyle: {
    height: metrics.DEVICE_WIDTH * 0.05,
    width: metrics.DEVICE_WIDTH * 0.05,
    marginTop: metrics.DEVICE_HEIGHT * 0.02,
  },
  loginButtonContainerStyle: {
    alignSelf: 'center',
    borderRadius: Constant.App.dimensions.btnBorderRadiusGlobal,
    padding: Constant.App.dimensions.btnPaddingGlobal,
    width: metrics.DEVICE_WIDTH - childPadding,
    backgroundColor: Constant.App.colors.blueColor,
    marginTop: metrics.DEVICE_HEIGHT * 0.05,
  },
  loginButtonTextStyle: {
    textAlign: 'center',
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    color: Constant.App.colors.whiteColor,
  },
  forgotPasswordTextStyle: {
    textAlign: 'center',
    marginTop: metrics.DEVICE_HEIGHT * 0.02,
    color: Constant.App.colors.blueColor,
    fontSize: Constant.App.textSize.Medium,
    width: metrics.DEVICE_WIDTH - parentPadding,
    paddingLeft: childPaddingValue,
    paddingRight: childPaddingValue,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    marginBottom: metrics.DEVICE_HEIGHT * 0.02,
  },
});

export default styles;
