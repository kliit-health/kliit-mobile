import { StyleSheet , Platform} from 'react-native';
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
  profileImgViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: metrics.DEVICE_WIDTH - parentPadding,
  },
  cameraIconContainerStyle: {
    alignItems: 'center',
    backgroundColor: Constant.App.colors.blueColor,
    borderRadius: (metrics.DEVICE_WIDTH * 0.08) * 0.5,
    height: metrics.DEVICE_WIDTH * 0.08,
    width: metrics.DEVICE_WIDTH * 0.08,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: metrics.DEVICE_WIDTH * 0.32 - (metrics.DEVICE_WIDTH * 0.32) * 0.2,
  },
  cameraIconStyle: {
    height: metrics.DEVICE_WIDTH * 0.04,
    width: metrics.DEVICE_WIDTH * 0.04,
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
    justifyContent: 'space-between',
    width: metrics.DEVICE_WIDTH - childPadding,
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
  },
  inputTextFirstNameContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: (metrics.DEVICE_WIDTH - childPadding) * 0.47,
    paddingBottom: Platform.OS === 'ios' ? metrics.DEVICE_HEIGHT * 0.01 : 0,
    borderBottomColor: Constant.App.colors.blackColor,
    borderBottomWidth: 0.5,
  },
  inputTypeStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    width: (metrics.DEVICE_WIDTH - childPadding) * 0.47,
  },
  birthDayContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.DEVICE_WIDTH - childPadding,
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    borderBottomColor: Constant.App.colors.blackColor,
    borderBottomWidth: 0.5,
    paddingBottom: metrics.DEVICE_HEIGHT * 0.01,
  },
  birthDayTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    alignSelf: 'center',
    width: metrics.DEVICE_WIDTH - childPadding,
  },
  stateDropDownContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.DEVICE_WIDTH - childPadding,
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    borderBottomColor: Constant.App.colors.blackColor,
    borderBottomWidth: 0.5,
    paddingBottom: metrics.DEVICE_HEIGHT * 0.01,
  },
  stateDropDownTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    alignSelf: 'center',
    width: metrics.DEVICE_WIDTH - childPadding - (metrics.DEVICE_WIDTH * 0.05),
  },
  dropDownIconStyle: {
    height: metrics.DEVICE_WIDTH * 0.04,
    width: metrics.DEVICE_WIDTH * 0.04,
  },
  pronounsParentContainerStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    width: metrics.DEVICE_WIDTH - parentPadding,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pronounsTitleTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    width: metrics.DEVICE_WIDTH - parentPadding,
  },
  pronounsContainerStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.02,
    width: metrics.DEVICE_WIDTH - parentPadding,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pronounsTextStyle: {
    paddingLeft: 10,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    width: metrics.DEVICE_WIDTH - parentPadding - (metrics.DEVICE_WIDTH * 0.05),
  },
  pronounsChecboxIconStyle: {
    height: metrics.DEVICE_WIDTH * 0.05,
    width: metrics.DEVICE_WIDTH * 0.05,
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
    marginBottom: metrics.DEVICE_HEIGHT * 0.03,
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
});

export default styles;
