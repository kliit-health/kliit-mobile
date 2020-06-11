import { StyleSheet } from "react-native";
import Constant from "../../utils/constants";

const styles = StyleSheet.create({
  arrowIcon: {
    width: 19,
    height: 13,
    marginTop: 13,
    marginRight: 11,
  },

  flyingContainer: {
    flex: 1,
  },

  icon: {
    width: 18,
    height: 30,
    marginBottom: 2,
  },

  iconContainer: {
    width: 31.6,
    height: "100%",
    justifyContent: "flex-end",
    marginRight: 14.4,
  },

  label: {
    marginTop: 8,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.avenirLight,
  },

  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  separator: {
    height: 1,
    marginTop: 5,
    marginLeft: -10,
    backgroundColor: Constant.App.colors.brownGrey,
  },

  title: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Medium,
    fontFamily: Constant.App.fontFamily.proximaNovaSemiBold,
    lineHeight: 21,
  },

  topContainer: {
    height: 61,
    flexDirection: "row",
  },
});

export default styles;
