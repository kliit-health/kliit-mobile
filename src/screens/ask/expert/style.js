import { StyleSheet } from "react-native";
import Constant from "../../../utils/constants";
import { getStatusBarHeight } from "../../../components/iPhoneXHelper";
import metrics from "../../../utils/metrices";

let parentPaddingValue = metrics.DEVICE_WIDTH * 0.03;
let parentPadding = parentPaddingValue * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Constant.App.colors.offWhiteColor,
  },

  emptyViewContainerStyle: {
    width: metrics.DEVICE_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  emptyViewTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.xxLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: "500",
  },

  itemSeparator: {
    width: metrics.DEVICE_WIDTH,
    height: 1,
    backgroundColor: Constant.App.colors.greyBgAsk,
  },

  recentChatContainerStyle: {
    padding: parentPaddingValue,
    flexDirection: "row",
    width: metrics.DEVICE_WIDTH,
    backgroundColor: Constant.App.colors.whiteColor,
    alignSelf: "center",
    borderRadius: 5,
  },

  recentChatParentContainerStyle: {
    width: metrics.DEVICE_WIDTH,
    flexDirection: "column",
    backgroundColor: Constant.App.colors.whiteColor,
  },

  resolvedChatParentContainerStyle: {
    marginTop: metrics.DEVICE_WIDTH * 0.05,
    width: metrics.DEVICE_WIDTH,
    flexDirection: "column",
    backgroundColor: Constant.App.colors.whiteColor,
  },

  subtitleContainerStyle: {
    borderBottomColor: Constant.App.colors.greyBgAsk,
    borderBottomWidth: 1,
    width: metrics.DEVICE_WIDTH,
    paddingLeft: metrics.DEVICE_WIDTH * 0.05,
    paddingTop: metrics.DEVICE_WIDTH * 0.03,
    paddingBottom: metrics.DEVICE_WIDTH * 0.03,
  },

  subtitleTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.headerRegular,
  },

  titleContainerStyle: {
    paddingTop: getStatusBarHeight() + 10,
    paddingBottom: 10,
    backgroundColor: Constant.App.colors.whiteColor,
    borderBottomColor: Constant.App.colors.offWhiteColor,
    borderBottomWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    width: metrics.DEVICE_WIDTH,
  },

  titleTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.xxLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: "500",
  },

  unreadCountContainerStyle: {
    flexDirection: "column",
    width: 25,
    height: 25,
    alignSelf: "center",
    borderRadius: 12.5,
    justifyContent: "center",
    backgroundColor: Constant.App.colors.orangeUnreadNotifcationCountColor,
  },

  unreadCountTextStyle: {
    paddingTop: 5,
    textAlign: "center",
    fontSize: Constant.App.textSize.Normal,
    color: Constant.App.colors.whiteColor,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  userInfoContainerResolvedChatStyle: {
    flexDirection: "column",
    width: metrics.DEVICE_WIDTH - parentPadding - 90,
    marginLeft: 10,
    justifyContent: "center",
  },

  userInfoContainerStyle: {
    flexDirection: "column",
    width: metrics.DEVICE_WIDTH - parentPadding - 125,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
  },

  userInfoTextBoldStyle: {
    fontSize: Constant.App.textSize.Large,
    color: Constant.App.colors.blackColor,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: "400",
  },

  userInfoTextStyle: {
    fontSize: Constant.App.textSize.Normal,
    color: Constant.App.colors.greyColorText,
    fontWeight: "200",
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
});

export default styles;
