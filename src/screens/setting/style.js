import { StyleSheet } from 'react-native';
import Constant from '../../utils/constants';
import metrices from '../../utils/metrices';
import { getStatusBarHeight } from '../../components/iPhoneXHelper';

let parentPaddingValue = metrices.DEVICE_WIDTH * 0.05;
let parentPadding = parentPaddingValue * 2;

const styles = StyleSheet.create({
  birthDayContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrices.DEVICE_WIDTH - parentPadding,
    marginTop: metrices.DEVICE_HEIGHT * 0.03,
    borderBottomColor: Constant.App.colors.lightGrey,
    borderBottomWidth: 0.5,
    paddingBottom: metrices.DEVICE_HEIGHT * 0.01,
  },

  birthDayTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    alignSelf: 'center',
    width: metrices.DEVICE_WIDTH - parentPadding,
  },

  btnContainerStyle: {
    marginTop: metrices.DEVICE_HEIGHT * 0.02,
    marginBottom: metrices.DEVICE_HEIGHT * 0.02,
    borderBottomColor: Constant.App.colors.lightGrey,
    borderBottomWidth: 0.5,
    borderTopColor: Constant.App.colors.lightGrey,
    borderTopWidth: 0.5,
    padding: 10,
    backgroundColor: Constant.App.colors.whiteColor,
    width: metrices.DEVICE_WIDTH,
  },

  btnTextStyle: {
    textAlign: 'center',
    color: Constant.App.colors.blueColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  cancelTextStyle: {
    textAlign: 'left',
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Medium,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  changeProfileTextStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    textAlign: 'center',
    color: Constant.App.colors.blueColor,
    fontSize: Constant.App.textSize.Medium,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Constant.App.colors.offWhiteColor,
    marginTop: getStatusBarHeight(),
  },

  doneTextStyle: {
    padding: 5,
    textAlign: 'left',
    color: Constant.App.colors.blueColor,
    fontSize: Constant.App.textSize.Medium,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  dropDownIconStyle: {
    height: metrices.DEVICE_WIDTH * 0.04,
    width: metrices.DEVICE_WIDTH * 0.04,
  },

  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: parentPaddingValue * 0.5,
    backgroundColor: Constant.App.colors.whiteColor,
    borderBottomColor: Constant.App.colors.greyBgAsk,
    borderBottomWidth: 3,
  },

  inputTextParentContainerStyle: {
    backgroundColor: Constant.App.colors.whiteColor,
    flexDirection: 'column',
    width: metrices.DEVICE_WIDTH,
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
  },

  inputTextContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: metrices.DEVICE_WIDTH - parentPadding,
    marginTop: metrices.DEVICE_HEIGHT * 0.01,
  },

  inputTextFirstNameContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: (metrices.DEVICE_WIDTH - parentPadding) * 0.47,
    paddingBottom: Platform.OS === 'ios' ? metrices.DEVICE_HEIGHT * 0.01 : 0,
    borderBottomColor: Constant.App.colors.lightGrey,
    borderBottomWidth: 0.5,
  },

  inputTypeStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    width: (metrices.DEVICE_WIDTH - parentPadding) * 0.47,
  },

  profileImgViewStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: metrices.DEVICE_WIDTH,
    padding: parentPaddingValue,
    borderBottomColor: Constant.App.colors.lightGrey,
    borderBottomWidth: 0.5,
  },

  pronounsParentContainerStyle: {
    width: metrices.DEVICE_WIDTH,
    backgroundColor: Constant.App.colors.whiteColor,
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
    paddingTop: metrices.DEVICE_HEIGHT * 0.03,
    paddingBottom: metrices.DEVICE_HEIGHT * 0.03,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Constant.App.colors.lightGrey,
    borderBottomWidth: 0.5,
  },

  pronounsTitleTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    width: metrices.DEVICE_WIDTH - parentPadding,
  },

  pronounsContainerStyle: {
    marginTop: metrices.DEVICE_HEIGHT * 0.02,
    width: metrices.DEVICE_WIDTH - parentPadding,
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
    width: metrices.DEVICE_WIDTH - parentPadding - (metrices.DEVICE_WIDTH * 0.05),
  },

  pronounsChecboxIconStyle: {
    height: metrices.DEVICE_WIDTH * 0.05,
    width: metrices.DEVICE_WIDTH * 0.05,
  },

  stateDropDownContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrices.DEVICE_WIDTH - parentPadding,
    marginTop: metrices.DEVICE_HEIGHT * 0.03,
    borderBottomColor: Constant.App.colors.lightGrey,
    borderBottomWidth: 0.5,
    paddingBottom: metrices.DEVICE_HEIGHT * 0.01,
  },

  stateDropDownTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    alignSelf: 'center',
    width: metrices.DEVICE_WIDTH - parentPadding - (metrices.DEVICE_WIDTH * 0.05),
  },
  
  titleTextStyle: {
    textAlign: 'center',
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.headerBold,
  },
  
});

export default styles;
