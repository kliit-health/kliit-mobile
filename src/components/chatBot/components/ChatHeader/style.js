import { StyleSheet } from "react-native";
import Constant from "../../../../utils/constants/";

export default (styles = StyleSheet.create({
  viewStyle: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  textStyle: {
    marginTop: 25,
    textAlign: "left",
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.xxLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
  },
}));
