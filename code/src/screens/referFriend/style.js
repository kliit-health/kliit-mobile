import {
  StyleSheet,
  Platform,
} from 'react-native';
import Constant from '../../utils/constants';
import metrics from '../../utils/metrices';
import { getStatusBarHeight } from '../../components/iPhoneXHelper';

let parentPaddingValue = metrics.DEVICE_WIDTH * 0.08;
let parentPadding = parentPaddingValue * 2;
let titlePaddingValue = metrics.DEVICE_WIDTH * 0.05;
const styles = StyleSheet.create({
  parentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    marginTop: getStatusBarHeight(),
    backgroundColor: Constant.App.colors.offWhiteColor,
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
    fontSize: Constant.App.textSize.xLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '600',
  },
  backIconStyle: {
    width: 20,
    height: 20,
  },
  subTitleContainerStyle: {
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
    paddingTop: metrics.DEVICE_WIDTH * 0.05,
    paddingBottom: metrics.DEVICE_WIDTH * 0.05,
    flexDirection: 'column',
    justifyContent: 'center',
    width: metrics.DEVICE_WIDTH,
    backgroundColor: Constant.App.colors.whiteColor,
  },
  subTitleTextBoldStyle: {
    width: metrics.DEVICE_WIDTH - parentPadding,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.xLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '500',
  },
  subTitleTextRegularStyle: {
    width: metrics.DEVICE_WIDTH - parentPadding,
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Medium,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  referralCodeTitleContainerStyle: {
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
    paddingTop: metrics.DEVICE_WIDTH * 0.05,
    paddingBottom: metrics.DEVICE_WIDTH * 0.05,
    flexDirection: 'column',
    justifyContent: 'center',
    width: metrics.DEVICE_WIDTH,
  },
  referralCodeTitleTextBoldStyle: {
    width: metrics.DEVICE_WIDTH - parentPadding,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.xLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '500',
  },
  referralCodeTextStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.02,
    backgroundColor: Constant.App.colors.whiteColor,
    padding: parentPaddingValue,
    borderRadius: 10,
    width: metrics.DEVICE_WIDTH - parentPadding,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.xLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '600',
  },
  btnContainerStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.05,
    width: metrics.DEVICE_WIDTH - parentPadding,
    padding: metrics.DEVICE_HEIGHT * 0.02,
    backgroundColor: Constant.App.colors.blueColor,
    borderRadius: 20,
  },
  btnTextStyle: {
    color: Constant.App.colors.whiteColor,
    textAlign: 'center',
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  itemsParentContainerStyle: {
    marginTop: metrics.DEVICE_WIDTH * 0.05,
    backgroundColor: Constant.App.colors.whiteColor,
    flexDirection: 'row',
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
    paddingTop: parentPaddingValue * 0.5,
    paddingBottom: parentPaddingValue * 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTextStyle: {
    textAlign: 'left',
    paddingTop: 5,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  itemTextBlueStyle: {
    textAlign: 'left',
    paddingTop: 5,
    color: Constant.App.colors.blueColor,
    fontSize: Constant.App.textSize.Medium,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
});
export default styles;
