import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

export default (styles = StyleSheet.create({
  viewStyle: {
    marginTop: 20,
    marginLeft: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
  },
  textStyle: {
    width: deviceWidth - 150,
    marginLeft: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    fontSize: 15,
    color: "#444444",
  },
  userViewStyle: {
    alignSelf: "flex-end",
    marginTop: 20,
    marginRight: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
  },
  userTextStyle: {
    width: deviceWidth - 150,
    marginRight: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#DCE9FA",
    fontSize: 15,
    color: "#444444",
  },
}));
