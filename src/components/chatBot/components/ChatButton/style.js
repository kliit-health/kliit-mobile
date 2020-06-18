import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  textStyle: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    alignSelf: "stretch",
    backgroundColor: "#1991EB",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#1991EB",
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  },
  disabledButton: {
    alignSelf: "stretch",
    backgroundColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  },
}));
