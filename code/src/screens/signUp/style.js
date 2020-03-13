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
  titleContainer: {
    fontFamily: Constant.App.fontFamily.headerBold,
    marginTop: metrics.DEVICE_HEIGHT * 0.05,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH - parentPadding,
    paddingLeft: childPaddingValue,
    paddingRight: childPaddingValue,
  },
  titleTextStyle: {
    fontFamily: Constant.App.fontFamily.headerBold,
    textAlign: 'center',
    fontSize: Constant.App.textSize.xxLarge,
    color: Constant.App.colors.blackColor,
    width: metrics.DEVICE_WIDTH - childPadding,
  },
  inputTextParentContainerStyle: {
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH - parentPadding,
    paddingLeft: childPaddingValue,
    paddingRight: childPaddingValue,
    marginTop: metrics.DEVICE_HEIGHT * 0.02,
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
    width: metrics.DEVICE_WIDTH - childPadding,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    width: metrics.DEVICE_WIDTH - parentPadding,
  },
  inputTypePasswordStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    width: metrics.DEVICE_WIDTH - childPadding - (metrics.DEVICE_WIDTH * 0.05),
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
    width: metrics.DEVICE_WIDTH - parentPadding,
    paddingLeft: childPaddingValue,
    paddingRight: childPaddingValue,
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
  },
  passwordValidationTextStyle: {
    marginLeft: 3,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    width: metrics.DEVICE_WIDTH - childPadding - 15,
  },
  passwordValidChecboxIconStyle: {
    height: 12,
    width: 12,
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    borderRadius: Constant.App.dimensions.btnBorderRadiusGlobal,
    padding: Constant.App.dimensions.btnPaddingGlobal,
    width: metrics.DEVICE_WIDTH - childPadding,
    backgroundColor: Constant.App.colors.blueColor,
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    color: Constant.App.colors.whiteColor,
  },
  termsConditionsTextContainerStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    width: metrics.DEVICE_WIDTH - parentPadding,
    paddingLeft: childPaddingValue,
    paddingRight: childPaddingValue,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsConditionsTextStyle: {
    marginTop: 2,
    padding: 2,
    textAlign: 'center',
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Small,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  termsConditionsTextHighlightedStyle: {
    padding: 2,
    textAlign: 'center',
    color: Constant.App.colors.blueColor,
    fontSize: Constant.App.textSize.Small,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  descriptionTextStyle: {
    paddingTop: metrics.DEVICE_HEIGHT * 0.03,
    width: metrics.DEVICE_WIDTH - parentPadding,
    textAlign: 'center',
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.xSmall,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  referalCodeInputTextContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.DEVICE_WIDTH - childPadding,
    paddingBottom: Platform.OS === 'ios' ? metrics.DEVICE_HEIGHT * 0.01 : 0,
    borderBottomColor: Constant.App.colors.blackColor,
    borderBottomWidth: 0.5,
  },
  referalCodeInputTypeStyle: {
    color: Constant.App.colors.blackColor,
    width: metrics.DEVICE_WIDTH - childPadding,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    width: metrics.DEVICE_WIDTH - parentPadding,
  },
  orTextStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    width: metrics.DEVICE_WIDTH - parentPadding,
    textAlign: 'center',
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
});

export default styles;
