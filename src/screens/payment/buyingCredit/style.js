import { StyleSheet } from 'react-native';
import Constant from '../../../utils/constants';
import metrics from '../../../utils/metrices';


export const PaymentDropdownDimensions = {
  cellHeight: 42,
  marginVertical: 8,
  marginRight: 25,
  marginBottom: 121,
};

const ContainerHeight = 414 - metrics.BOTTOM_SAVE_AREA;

const PaymentDropDownCellStyle = {
  height: PaymentDropdownDimensions.cellHeight,
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: Constant.App.colors.whiteColor,
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Constant.App.colors.dark40,
  },
  container: {
    height: ContainerHeight,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    backgroundColor: Constant.App.colors.whiteColor,
    paddingTop: 25,
    paddingBottom: 55,
    shadowColor: Constant.App.colors.darkishBlue21,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 1,
  },
  header: {
    marginLeft: 23,
    flexDirection: 'row',
    height: 22,
    alignItems: 'center',
  },
  closeButton: {
    width: 18,
    height: 18,
  },
  title: {
    fontFamily: Constant.App.fontFamily.avenirBook,
    marginLeft: 25,
    color: Constant.App.colors.blueGrey,
    fontSize: Constant.App.textSize.Normal + 1,
    letterSpacing: -0.41,
    lineHeight: 22,
  },
  optionsContainer: {
    marginTop: 22,
    marginLeft: 41,
    marginRight: 37,
  },
  amountContainer: {
    marginTop: 12,
  },
  amountIcon: {
    width: 24,
    height: 23,
    marginBottom: 7,
  },
  creditCardIcon: {
    width: 31.6,
    height: 22.8,
    marginBottom: 8.2,
  },
  footerContainer: {
    flexDirection: 'row',
  },
  totalText: {
    fontFamily: Constant.App.fontFamily.headerSemiBold,
    fontSize: Constant.App.textSize.xLarge + 2,
    color: Constant.App.colors.blackColor,
    marginTop: 44,
    marginLeft: 45,
  },
  buyCreditsButton: {
    marginTop: 31,
    marginLeft: 26,
    width: 135,
    height: 52,
    borderRadius: 22,
    backgroundColor: Constant.App.colors.blueColor,
    justifyContent: 'center',
  },
  buyCreditsButtonText: {
    paddingLeft: 27,
    fontFamily: Constant.App.fontFamily.avenirMedium,
    fontSize: Constant.App.textSize.Normal,
    color: Constant.App.colors.whiteColor,
  },
  amountDropdownContainer: {
    position: 'absolute',
    flexDirection: 'row-reverse',
    bottom: ContainerHeight - 59, // Subtract the top margin of the dropdown,
    right: 24,
  },
  amountDropdownButton: {
    height: 0,
    width: 102,
  },
  amountDropdown: {
    height: 226,
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 1,
    paddingVertical: 8,
    borderColor: Constant.App.colors.brownGreyTwo,
    shadowColor: Constant.App.colors.black4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.625,
    shadowRadius: 24,
    elevation: 1,
  },
  amountDropdownCell: {
    height: 42,
    flex: 1,
    justifyContent: 'center',
  },
  amountDropdownOption: {
    fontFamily: Constant.App.fontFamily.avenirLight,
    fontSize: 18,
    color: Constant.App.colors.blackColor,
    marginLeft: 9,
  },
  paymentMethodsDropdownContainer: {
    position: 'absolute',
    bottom: PaymentDropdownDimensions.marginBottom - metrics.BOTTOM_SAVE_AREA,
    right: PaymentDropdownDimensions.marginRight,
  },
  paymentMethodsDropdownButton: {
    height: 0,
    width: 210,
  },
  paymentMethodsDropdown: {
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 1,
    paddingVertical: 7,
    borderColor: Constant.App.colors.brownGreyTwo,
    shadowColor: Constant.App.colors.black4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.625,
    shadowRadius: 24,
    elevation: 1,
  },
  addPaymentMethodCell: {
    ...PaymentDropDownCellStyle,
    paddingLeft: 14,
    paddingRight: 12,
  },
  addPaymentIcon: {
    height: 22,
    width: 22,
  },
  addPaymentTitle: {
    fontFamily: Constant.App.fontFamily.avenirLight,
    fontSize: Constant.App.textSize.Medium + 1,
    color: Constant.App.colors.blackColor,
    marginLeft: 14,
  },
  paymentMethodCell: {
    ...PaymentDropDownCellStyle,
    paddingLeft: 12,
  },
  paymentMethodIcon: {
    height: 22.8,
    width: 31.6,
  },
  paymentMethodNumber: {
    fontFamily: Constant.App.fontFamily.avenirLight,
    fontSize: Constant.App.textSize.Large,
    color: Constant.App.colors.blackColor,
    marginLeft: 14.6,
  },
  payPalIcon: {
    height: 24,
    width: 50,
  },
  payPalCell: {
    ...PaymentDropDownCellStyle,
    paddingLeft: 10,
  },
  applePayIcon: {
    height: 24,
    width: 37,
  },
});

export default styles;
