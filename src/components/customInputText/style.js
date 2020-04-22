import { StyleSheet, I18nManager, Platform } from 'react-native';
import Constant from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.App.colors.whiteColor,
    justifyContent: 'center'
  },
  fieldLabel: {
    fontSize: Constant.App.textSize.Small,
    color: Constant.App.colors.blackColor,
    fontWeight: '100',
  },
  valueText: {
    fontSize: Constant.App.textSize.Normal,
    color: Constant.App.colors.blackColor,
    paddingTop: 20,
  },
  floatingLabel: {
    position: 'absolute',
    top: 0,
    left: 0
  },
});
export default styles;
