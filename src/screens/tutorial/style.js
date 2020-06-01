import { StyleSheet } from 'react-native';
import metrices from '../../utils/metrices';
import Constant from '../../utils/constants';
import { getStatusBarHeight } from '../../components/iPhoneXHelper';

const styles = StyleSheet.create({
  bannerImageStyle: {
    height: metrices.DEVICE_HEIGHT * 0.90,
    width: metrices.DEVICE_WIDTH,
  },

  buttonContainerStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    height: metrices.DEVICE_HEIGHT * 0.10,
  },

  containerStyle: {
    flex: 1,
  },

  loginButtonStyle: {
    padding: Constant.App.dimensions.btnPaddingGlobal,
    width: metrices.DEVICE_WIDTH * 0.45,
    borderRadius: Constant.App.dimensions.btnBorderRadiusGlobal,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constant.App.colors.whiteColor,
    borderColor: Constant.App.colors.blueColor,
    borderWidth: 1
  },

  loginButtonTextStyle: {
    fontFamily: Constant.App.fontFamily.bodyRegular,
    fontSize: Constant.App.textSize.Normal,
    color: Constant.App.colors.blueColor,
    textAlign: 'center'
  },

  logoImageStyle: {
    top: getStatusBarHeight(),
    height: 100,
    width: 130,
    position: 'absolute',
    alignSelf: 'center',
  },

  signupButtonStyle: {
    padding: Constant.App.dimensions.btnPaddingGlobal,
    width: metrices.DEVICE_WIDTH * 0.45,
    borderRadius: Constant.App.dimensions.btnBorderRadiusGlobal,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constant.App.colors.blueColor,
    borderColor: Constant.App.colors.whiteColor,
    borderWidth: 1,
  },

  signupButtonTextStyle: {
    fontSize: Constant.App.textSize.Normal,
    color: Constant.App.colors.whiteColor,
    textAlign: 'center',
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  sliderViewStyle: {
    height: metrices.DEVICE_HEIGHT * 0.90,
    width: metrices.DEVICE_WIDTH,
  },
  
});

export default styles;
