import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from '../../components/iPhoneXHelper';
import metrics from '../../utils/metrices';
import Constant from '../../utils/constants';

let parentPaddingValue = metrics.DEVICE_WIDTH * 0.10;
let parentPadding = parentPaddingValue * 2;
let titlePaddingValue = metrics.DEVICE_WIDTH * 0.05;
const styles = StyleSheet.create({
  parentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    marginTop: getStatusBarHeight(),
    backgroundColor: Constant.App.colors.greyBgAsk,
    flexDirection: 'column',
  },
  titleContainerStyle: {
    backgroundColor: Constant.App.colors.whiteColor,
    padding: titlePaddingValue,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH,
    borderBottomColor: Constant.App.colors.borderColorFilterModal,
    borderBottomWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backContainerStyle: {
    alignSelf: 'flex-start',
    marginTop: 3,
  },
  titleTextStyle: {
    alignSelf: 'center',
    position: 'absolute',
    color: Constant.App.colors.blackColor,
    textAlign: 'center',
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '600',
  },
  backIconStyle: {
    width: 20,
    height: 20,
  },
  expertInfoParentContainerStyle: {
    backgroundColor: Constant.App.colors.whiteColor,
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
    paddingBottom: parentPaddingValue * 0.2,
    paddingTop: parentPaddingValue * 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: metrics.DEVICE_WIDTH,
  },
  expertNameTextBoldStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontWeight: '500',
    fontFamily: Constant.App.fontFamily.headerBold,
  },
  expertInfoProfessionTextStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Small,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    fontWeight: '200',
  },
  expertProfessionLoctionBoldStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    color: Constant.App.colors.greyColorText,
    fontSize: Constant.App.textSize.Small,
    fontWeight: '200',
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  btnContainerStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.02,
    width: metrics.DEVICE_WIDTH - parentPadding,
    padding: 12,
    backgroundColor: Constant.App.colors.blueColor,
    borderRadius: 20,
  },
  btnTextStyle: {
    color: Constant.App.colors.whiteColor,
    textAlign: 'center',
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  bioContainerStyle: {
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
    paddingTop: parentPaddingValue,
    flexDirection: 'column',
    justifyContent: 'center',
    width: metrics.DEVICE_WIDTH,
  },
  bioTitleTextStyle: {
    width: metrics.DEVICE_WIDTH - parentPadding,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.xLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '500',
  },
  bioTextStyle: {
    width: metrics.DEVICE_WIDTH - parentPadding,
    marginTop: metrics.DEVICE_HEIGHT * 0.02,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Medium,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  bioTextStyleBold: {
    width: metrics.DEVICE_WIDTH - parentPadding,
    marginTop: metrics.DEVICE_HEIGHT * 0.02,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Medium,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '500',
  },
  phoneNumberTextStyleBold: {
    color: Constant.App.colors.blueColor,
    fontSize: Constant.App.textSize.Medium,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  hoursContainerStyle: {
    padding: parentPaddingValue,
    flexDirection: 'column',
    justifyContent: 'center',
    width: metrics.DEVICE_WIDTH,
  },
});

export default styles;
