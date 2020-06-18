import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  inputStyle: {
    color: "#000",
    padding: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
  buttonStyle: {
    flex: 1,
  },
  containerStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    padding: 15,
    elevation: 2,
    position: "relative",
  },
}));
