import { StyleSheet } from 'react-native';
import Constant from '../../../utils/constants';
import metrics from '../../../utils/metrices';
import { getStatusBarHeight } from '../../../components/iPhoneXHelper';

let parentPaddingValue = metrics.DEVICE_WIDTH * 0.1;
let parentPadding = parentPaddingValue * 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Constant.App.colors.whiteColor,
    marginTop: getStatusBarHeight(),
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: parentPaddingValue * 0.5,
    backgroundColor: Constant.App.colors.whiteColor,
    borderBottomColor: Constant.App.colors.greyBgAsk,
    borderBottomWidth: 3,
  },
  cancelTextStyle: {
    textAlign: 'left',
    alignSelf: 'center',
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Medium,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  titleTextStyle: {
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
    width: metrics.DEVICE_WIDTH,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.headerBold,
  },
  inputTextParentContainerStyle: {
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH,
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
    marginTop: metrics.DEVICE_HEIGHT * 0.02,
  },
  inputTextContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.DEVICE_WIDTH - parentPadding,
    paddingBottom: Platform.OS === 'ios' ? metrics.DEVICE_HEIGHT * 0.01 : 0,
    marginTop: metrics.DEVICE_HEIGHT * 0.05,
    borderBottomColor: Constant.App.colors.blackColor,
    borderBottomWidth: 0.5,
  },
  inputTypeStyle: {
    color: Constant.App.colors.blackColor,
    width: metrics.DEVICE_WIDTH - parentPadding,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
  },
  inputTypePasswordStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    width: metrics.DEVICE_WIDTH - parentPadding - (metrics.DEVICE_WIDTH * 0.05),
  },
  passwordHideShowIconStyle: {
    height: metrics.DEVICE_WIDTH * 0.05,
    width: metrics.DEVICE_WIDTH * 0.05,
    marginTop: metrics.DEVICE_HEIGHT * 0.02,
  },
  passwordValidationContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.DEVICE_WIDTH,
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
  },
  passwordValidationTextStyle: {
    marginLeft: 3,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    width: metrics.DEVICE_WIDTH - parentPadding - 15,
  },
  passwordValidChecboxIconStyle: {
    height: 12,
    width: 12,
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    borderRadius: Constant.App.dimensions.btnBorderRadiusGlobal,
    padding: Constant.App.dimensions.btnPaddingGlobal,
    width: metrics.DEVICE_WIDTH - parentPadding,
    backgroundColor: Constant.App.colors.blueColor,
    marginTop: metrics.DEVICE_HEIGHT * 0.1,
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    color: Constant.App.colors.whiteColor,
  },
});
export default styles;
