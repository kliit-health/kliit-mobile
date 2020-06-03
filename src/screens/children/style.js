import { StyleSheet } from "react-native";
import Constant from "../../utils/constants";
import metrices from "../../utils/metrices";
import { getStatusBarHeight } from "../../components/iPhoneXHelper";

let parentPaddingValue = metrices.DEVICE_WIDTH * 0.1;
let parentPadding = parentPaddingValue * 2;

let childPaddingValue = metrices.DEVICE_WIDTH * 0.03;
let childPadding = parentPadding + childPaddingValue * 2;

const styles = StyleSheet.create({
  birthDayContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: metrices.DEVICE_WIDTH - parentPadding,
    marginTop: metrices.DEVICE_HEIGHT * 0.03,
    borderBottomColor: Constant.App.colors.lightGrey,
    borderBottomWidth: 0.5,
    paddingBottom: metrices.DEVICE_HEIGHT * 0.01,
  },

  birthDayTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: "left",
    alignSelf: "center",
    width: metrices.DEVICE_WIDTH - parentPadding,
  },

  buttonContainerStyle: {
    alignSelf: "center",
    borderRadius: Constant.App.dimensions.btnBorderRadiusGlobal,
    padding: Constant.App.dimensions.btnPaddingGlobal,
    width: metrices.DEVICE_WIDTH - childPadding,
    backgroundColor: Constant.App.colors.blueColor,
    marginTop: metrices.DEVICE_HEIGHT * 0.03,
  },

  buttonTextStyle: {
    textAlign: "center",
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    color: Constant.App.colors.whiteColor,
  },

  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Constant.App.colors.offWhiteColor,
    marginTop: getStatusBarHeight(),
  },

  dropDownContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: metrices.DEVICE_WIDTH - parentPadding,
    marginTop: metrices.DEVICE_HEIGHT * 0.03,
    borderColor: Constant.App.colors.lightGrey,
    borderWidth: 0.5,
    borderRadius: 4,
    padding: metrices.DEVICE_HEIGHT * 0.01,
  },

  dropDownIconStyle: {
    height: metrices.DEVICE_WIDTH * 0.04,
    width: metrices.DEVICE_WIDTH * 0.04,
  },

  dropDownTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: "left",
    alignSelf: "center",
    width: metrices.DEVICE_WIDTH - parentPadding - metrices.DEVICE_WIDTH * 0.05,
  },

  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: parentPaddingValue * 0.5,
    backgroundColor: Constant.App.colors.whiteColor,
    borderBottomColor: Constant.App.colors.greyBgAsk,
    borderBottomWidth: 3,
  },

  inputTextContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: metrices.DEVICE_WIDTH - parentPadding,
    marginTop: metrices.DEVICE_HEIGHT * 0.01,
  },

  inputTextParentContainerStyle: {
    backgroundColor: Constant.App.colors.whiteColor,
    flexDirection: "column",
    width: metrices.DEVICE_WIDTH,
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
  },

  titleTextStyle: {
    textAlign: "left",
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.headerBold,
  },
});

export default styles;
