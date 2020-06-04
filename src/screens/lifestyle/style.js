import { StyleSheet } from "react-native";
import Constant from "../../utils/constants";
import metrices from "../../utils/metrices";
import { getStatusBarHeight } from "../../components/iPhoneXHelper";

let parentPaddingValue = metrices.DEVICE_WIDTH * 0.1;
let parentPadding = parentPaddingValue * 2;

let childPaddingValue = metrices.DEVICE_WIDTH * 0.03;
let childPadding = parentPadding + childPaddingValue * 2;

const styles = StyleSheet.create({
  answer: {
    fontSize: 14,
    marginTop: 10,
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
    backgroundColor: "white",
    marginTop: getStatusBarHeight(),
  },

  content: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 40,
    marginVertical: 15,
    color: Constant.App.colors.grayColor,
  },

  dropDownContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: metrices.DEVICE_WIDTH - parentPadding,
    marginTop: metrices.DEVICE_HEIGHT * 0.03,
    borderBottomColor: Constant.App.colors.lightGrey,
    borderBottomWidth: 0.5,
    paddingBottom: metrices.DEVICE_HEIGHT * 0.01,
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

  partnersParentContainerStyle: {
    width: metrices.DEVICE_WIDTH,
    backgroundColor: Constant.App.colors.whiteColor,
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
    paddingTop: metrices.DEVICE_HEIGHT * 0.03,
    paddingBottom: metrices.DEVICE_HEIGHT * 0.03,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Constant.App.colors.lightGrey,
    borderBottomWidth: 0.5,
  },

  partnersTitleTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: "left",
    width: metrices.DEVICE_WIDTH - parentPadding,
  },

  partnersContainerStyle: {
    marginTop: metrices.DEVICE_HEIGHT * 0.02,
    width: metrices.DEVICE_WIDTH - parentPadding,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  partnersTextStyle: {
    paddingLeft: 10,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: "left",
    width: metrices.DEVICE_WIDTH - parentPadding - metrices.DEVICE_WIDTH * 0.05,
  },

  partnersChecboxIconStyle: {
    height: metrices.DEVICE_WIDTH * 0.05,
    width: metrices.DEVICE_WIDTH * 0.05,
  },

  titleTextStyle: {
    textAlign: "left",
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.headerBold,
  },

  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Constant.App.fontFamily.headerBold,
    margin: 30,
  },

  questionContainer: {
    marginLeft: 20,
    marginBottom: 20,
  },

  question: {
    fontSize: 16,
    fontWeight: "400",
  },
});

export default styles;
