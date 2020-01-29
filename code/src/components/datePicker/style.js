import { StyleSheet } from 'react-native';
import Constant from '../../utils/constants';
import metrics from '../../utils/metrices';

export default StyleSheet.create({
  modalDatePickerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Constant.App.colors.whiteColor,
    borderBottomColor: Constant.App.colors.blackColor,
    borderBottomWidth: 1,
  },
  cancelDatePicketButtonTextStyle: {
    color: Constant.App.colors.whiteColor,
    textAlign: 'center',
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
  cancelDatePicketButtonStyle: {
    backgroundColor: Constant.App.colors.blueColor,
    borderRadius: 5,
    padding: 5,
  },
  dateTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    alignSelf: 'center',
  },
});
