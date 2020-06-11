import { StyleSheet } from "react-native";
import Constant from "../../utils/constants";

export default StyleSheet.create({
  innerContainerStyle: {
    flexDirection: "row",
    borderRadius: 10,
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: Constant.App.colors.whiteColor,
  },

  parentContainerStyle: {
    flex: 1,
    backgroundColor: Constant.App.colors.modalBgSemiTransparentColor,
    justifyContent: "center",
    alignItems: "center",
  },

  textStyle: {
    color: Constant.App.colors.blackColor,
    textAlign: "center",
    fontSize: Constant.App.textSize.Large,
  },
});
