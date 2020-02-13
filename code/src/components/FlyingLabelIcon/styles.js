import { StyleSheet } from 'react-native';
import Constant from '../../utils/constants';

const styles = StyleSheet.create({
  topContainer: {
    height: 61,
    flexDirection: 'row',
  },
  iconContainer: {
    width: 31.6,
    height: '100%',
    justifyContent: 'flex-end',
    marginRight: 14.4,
  },
  icon: {
    width: 18,
    height: 30,
    marginBottom: 2,
  },
  flyingContainer: {
    flex: 1,
  },
  title: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Medium,
    fontFamily: Constant.App.fontFamily.proximaNovaSemiBold,
    lineHeight: 21,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    marginTop: 8,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.avenirLight,
  },
  arrowIcon: {
    width: 19,
    height: 13,
    marginTop: 13,
    marginRight: 11,
  },
  separator: {
    height: 1,
    marginTop: 5,
    marginLeft: -10,
    backgroundColor: Constant.App.colors.brownGrey,
  },
});

export default styles;
