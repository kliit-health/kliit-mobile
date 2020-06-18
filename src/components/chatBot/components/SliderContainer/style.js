import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  viewContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  valuesContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15,
    paddingLeft: 15,
    textAlign: "center",
  },
  markersContainerStyle: {
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
}));
