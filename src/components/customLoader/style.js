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
    borderRadius: 10,
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'white',
  },
  textStyle: {
    color: Constant.App.colors.blackColor,
    textAlign: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: Constant.App.textSize.Large,
  },
});
