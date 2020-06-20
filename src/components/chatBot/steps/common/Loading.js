import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import Bubbles from "./Bubbles";

const Loading = (props) => {
  const { custom, color } = props;
  console.log(props);

  if (custom) {
    style = {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    };
  }

  return (
    <View style={{ height: 15 }}>
      <Text style={{ color: "white" }}>. . . .</Text>
    </View>
  );
};

Loading.propTypes = {
  color: PropTypes.string.isRequired,
  custom: PropTypes.bool,
};

Loading.defaultProps = {
  custom: false,
};

export default Loading;
