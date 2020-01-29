import {
  StyleSheet,
  Platform,
} from 'react-native';
import Constant from '../../../utils/constants';
import metrices from '../../../utils/metrices';
import { getStatusBarHeight } from '../../../components/iPhoneXHelper';

let parentPaddingValue = metrices.DEVICE_WIDTH * 0.1;
let parentPadding = parentPaddingValue * 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Constant.App.colors.offWhiteColor,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue * 0.5,
    backgroundColor: Constant.App.colors.blueColor,
    paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() + metrices.DEVICE_HEIGHT * 0.05 : metrices.DEVICE_HEIGHT * 0.05,
    paddingBottom: metrices.DEVICE_HEIGHT * 0.05,
  },
  profileInfoParentContainerStyle: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: metrices.DEVICE_WIDTH - 120 - parentPadding,
  },
  profileImageParentContainerStyle: {
    flexDirection: 'column',
  },
  nameTextStyle: {
    textAlign: 'left',
    color: Constant.App.colors.whiteColor,
    fontSize: Constant.App.textSize.xLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
  },
  genderTextStyle: {
    textAlign: 'left',
    paddingTop: 5,
    color: Constant.App.colors.whiteColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  creditTextStyle: {
    textAlign: 'left',
    paddingTop: 10,
    color: Constant.App.colors.whiteColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '500',
  },
  itemsParentContainerStyle: {
    backgroundColor: Constant.App.colors.whiteColor,
    flexDirection: 'row',
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
    paddingTop: parentPaddingValue * 0.5,
    paddingBottom: parentPaddingValue * 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1.5,
  },
  itemTextStyle: {
    textAlign: 'left',
    paddingTop: 5,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  logoutParentContainerStyle: {
    marginTop: metrices.DEVICE_WIDTH * 0.1,
  },
  logoutTextStyle: {
    textAlign: 'center',
    paddingTop: 10,
    color: Constant.App.colors.redColorLogout,
    fontSize: Constant.App.textSize.xLarge,
    width: metrices.DEVICE_WIDTH,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
});
export default styles;
