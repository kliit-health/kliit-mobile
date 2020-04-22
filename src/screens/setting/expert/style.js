import { StyleSheet } from 'react-native';
import Constant from '../../../utils/constants';
import metrices from '../../../utils/metrices';
import { getStatusBarHeight } from '../../../components/iPhoneXHelper';

let parentPaddingValue = metrices.DEVICE_WIDTH * 0.05;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Constant.App.colors.offWhiteColor,
    marginTop: getStatusBarHeight(),
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
  cancelTextStyle: {
    textAlign: 'left',
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Medium,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  titleTextStyle: {
    textAlign: 'left',
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.headerBold,
  },
  doneTextStyle: {
    padding: 5,
    textAlign: 'left',
    color: Constant.App.colors.blueColor,
    fontSize: Constant.App.textSize.Medium,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  profileImgViewStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: metrices.DEVICE_WIDTH,
    padding: parentPaddingValue,
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
  btnContainerStyle: {
    marginTop: metrices.DEVICE_HEIGHT * 0.05,
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
});
export default styles;
