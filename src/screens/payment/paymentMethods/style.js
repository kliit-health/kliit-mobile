import { StyleSheet } from "react-native";
import Constant from "../../../utils/constants";
import metrices from "../../../utils/metrices";
import { getStatusBarHeight } from "../../../components/iPhoneXHelper";

let parentPaddingValue = metrices.DEVICE_WIDTH * 0.08;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Constant.App.colors.whiteColor,
    marginTop: getStatusBarHeight(),
  },

  crossBottom: {
    width: 20,
    height: 20,
    marginTop: 12,
    marginRight: 44,
    marginBottom: 12,
  },

  expiredContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  expiredLabel: {
    paddingRight: 60,
    color: Constant.App.colors.redColorExpired,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: parentPaddingValue,
    backgroundColor: Constant.App.colors.whiteColor,
    borderBottomColor: Constant.App.colors.greyBgAsk,
    borderBottomWidth: 3,
  },

  parentContainerStyle: {
    backgroundColor: Constant.App.colors.whiteColor,
    flexDirection: "column",
    width: metrices.DEVICE_WIDTH,
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
  },

  paymentMethodContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: metrices.DEVICE_WIDTH,
    height: 42,
  },

  paymentMethodImage: {
    width: 36,
    height: 26,
    marginRight: 18,
  },

  plusIcon: {
    width: 22,
    height: 22,
    marginRight: 14,
  },

  sectionTitle: {
    color: Constant.App.colors.blackTwoColor,
    fontSize: Constant.App.textSize.xLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    lineHeight: 50,
  },

  sectionText: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  titleTextStyle: {
    textAlign: "center",
    color: Constant.App.colors.blackTwoColor,
    fontSize: Constant.App.textSize.xLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
  },
});

export default styles;
