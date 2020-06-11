import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centerProductBox: {
    flex: 6,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 4,
  },

  circle: {
    borderWidth: 1,
    borderRadius: 10000,
    alignItems: "center",
    justifyContent: "center",
  },

  circleFill: {
    borderWidth: 1,
    borderRadius: 10000,
  },

  icon: {
    borderWidth: 1,
    borderRadius: 10000,
    alignItems: "center",
    justifyContent: "center",
  },

  leftProductBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  productBox: {
    flexDirection: "row",
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10,
  },

  productBoxLess: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default styles;
