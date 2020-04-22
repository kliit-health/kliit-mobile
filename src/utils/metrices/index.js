import { Dimensions, Platform, StatusBar } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from '../../components/iPhoneXHelper';

const IS_ANDROID = Platform.OS === 'android';

const {
  height, width,
} = Dimensions.get('window');

export default {
  DEVICE_HEIGHT: IS_ANDROID ? height - StatusBar.currentHeight : height - getStatusBarHeight(),
  DEVICE_WIDTH: width,
  BOTTOM_SAVE_AREA: getBottomSpace(),
};
