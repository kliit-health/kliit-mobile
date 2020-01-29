import { StyleSheet } from 'react-native';
import Constant from '../../utils/constants';

export default StyleSheet.create({
  parentContainerStyle: {
    flex: 1,
    backgroundColor: Constant.App.colors.modalBgSemiTransparentColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainerStyle: {
    flexDirection: 'row',
    borderRadius: 10,
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Constant.App.colors.whiteColor,
  },
  textStyle: {
    color: Constant.App.colors.blackColor,
    textAlign: 'center',
    fontSize: Constant.App.textSize.Large,
  },
});
