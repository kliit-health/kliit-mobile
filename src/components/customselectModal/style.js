import { StyleSheet } from "react-native";
import Constant from "../../utils/constants";
import metrics from "../../utils/metrices";

export default StyleSheet.create({
  cancelSelectStateButtonTextStyle: {
    fontFamily: Constant.App.fontFamily.bodyRegular,
    color: Constant.App.colors.whiteColor,
    textAlign: "center",
    fontSize: Constant.App.textSize.Normal,
  },

  cancelSelectStateButtonStyle: {
    backgroundColor: Constant.App.colors.blueColor,
    padding: 15,
    width: metrics.DEVICE_WIDTH * 0.9,
  },

  emptyContainerStyle: {
    padding: 15,
    width: metrics.DEVICE_WIDTH * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTextStyle: {
    fontFamily: Constant.App.fontFamily.headerRegular,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
  },

  modalParentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalSelectStateContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: metrics.DEVICE_WIDTH * 0.9,
    backgroundColor: Constant.App.colors.whiteColor,
  },

  searchBarContaineStyle: {
    width: metrics.DEVICE_WIDTH * 0.9,
    backgroundColor: Constant.App.colors.whiteColor,
  },

  searchBarInputContainerStyle: {
    backgroundColor: Constant.App.colors.whiteColor,
  },

  searchBarInputTextStyle: {
    fontFamily: Constant.App.fontFamily.headerRegular,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
  },

  saparatorStyle: {
    borderBottomColor: Constant.App.colors.lightGrey,
    borderBottomWidth: 0.5,
    width: metrics.DEVICE_WIDTH * 0.9,
  },

  stateTextContainerStyle: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },

  stateTextStyle: {
    fontFamily: Constant.App.fontFamily.bodyRegular,
    alignSelf: "center",
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Normal,
  },
});
