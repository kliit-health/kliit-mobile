import { StyleSheet } from 'react-native';
import Constant from '../../../utils/constants';
import metrices from '../../../utils/metrices';
import { getStatusBarHeight } from '../../../components/iPhoneXHelper';

let parentPaddingValue = metrices.DEVICE_WIDTH * 0.05;
let parentPadding = parentPaddingValue * 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Constant.App.colors.whiteColor,
    marginTop: getStatusBarHeight(),
  },
  headerStyle: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: parentPaddingValue * 0.5,
    backgroundColor: Constant.App.colors.whiteColor,
    borderBottomColor: Constant.App.colors.greyBgAsk,
    borderBottomWidth: 3,
  },
  titleTextStyle: {
    textAlign: 'center',
    color: Constant.App.colors.blackTwoColor,
    fontSize: Constant.App.textSize.xLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
  },
  crossBottom: {
    width: 20,
    height: 20,
    marginTop: 12,
    marginLeft: 23,
    marginRight: 23,
    marginBottom: 12,
  },
  inputTextContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: metrices.DEVICE_WIDTH - parentPadding,
    marginTop: metrices.DEVICE_HEIGHT * 0.01,
    marginLeft: 20,
    marginRight: 20,
  },
  inputTypeStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    width: (metrices.DEVICE_WIDTH - parentPadding) * 0.9,
    borderBottomWidth: 1,
    borderBottomColor: Constant.App.colors.pinkishGreyColor,
  },
  parentContainerStyle: {
    backgroundColor: Constant.App.colors.whiteColor,
    flexDirection: 'column',
    width: metrices.DEVICE_WIDTH,
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
    marginTop: 20,
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    borderRadius: Constant.App.dimensions.btnBorderRadiusGlobal,
    backgroundColor: Constant.App.colors.azureColor,
    width: '100%',
    paddingBottom: 15,
    paddingTop: 15,
    marginTop: 49,
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    color: Constant.App.colors.whiteColor,
  },
  lockImage: {
    marginTop: 24,
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  footerTextStyle: {
    textAlign: 'center',
    color: Constant.App.colors.blackTwoColor,
    marginTop: 5,
    fontSize: Constant.App.textSize.Small,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  inputTextMargin: { marginLeft: 20 },
  expireDateWidh: {
    width: (metrices.DEVICE_WIDTH - parentPadding) * 0.225,
    borderBottomWidth: 1,
    borderBottomColor: Constant.App.colors.pinkishGreyColor,
    marginRight: (metrices.DEVICE_WIDTH - parentPadding) * 0.125,
  },
  securityCodeWidth: {
    width: (metrices.DEVICE_WIDTH - parentPadding) * 0.55,
    borderBottomWidth: 1,
    borderBottomColor: Constant.App.colors.pinkishGreyColor,
  },
});

export default styles;
