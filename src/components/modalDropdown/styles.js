import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 12,
  },

  dropdown: {
    position: "absolute",
    height: (33 + StyleSheet.hairlineWidth) * 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgray",
    borderRadius: 2,
    backgroundColor: "white",
    justifyContent: "center",
  },

  highlightedRowText: {
    color: "black",
  },

  loading: {
    alignSelf: "center",
  },

  modal: {
    flexGrow: 1,
  },

  rowText: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    fontSize: 11,
    color: "gray",
    backgroundColor: "white",
    textAlignVertical: "center",
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "lightgray",
  },
});

export default styles;
