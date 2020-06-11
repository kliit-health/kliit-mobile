import { StyleSheet } from "react-native";
import Constant from "../../utils/constants";
import metrices from "../../utils/metrices";

export default StyleSheet.create({
  innerContainerStyle: {
    borderRadius: 10,
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: Constant.App.colors.whiteColor,
  },

  okBtnErrorContainerStyle: {
    width: metrices.DEVICE_WIDTH - 100,
    padding: 10,
    backgroundColor: Constant.App.colors.blueColor,
    marginTop: 15,
    borderRadius: 10,
  },

  okBtnErrorTextStyle: {
    color: Constant.App.colors.whiteColor,
    textAlign: "center",
    fontSize: Constant.App.textSize.Normal,
  },

  parentContainerStyle: {
    flex: 1,
    backgroundColor: Constant.App.colors.modalBgSemiTransparentColor,
    justifyContent: "center",
    alignItems: "center",
  },

  textStyle: {
    width: metrices.DEVICE_WIDTH - 80,
    color: Constant.App.colors.blackColor,
    textAlign: "center",
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: Constant.App.textSize.Large,
  },
});
