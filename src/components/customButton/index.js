/* eslint-disable react/prop-types */
import React from "react";
import { TouchableOpacity } from "react-native";
import CustomText from "../customText";

const CustomButton = ({ onPress, text, buttonStyle, disabled, textStyle }) => (
  <TouchableOpacity disabled={disabled} onPress={onPress} style={buttonStyle}>
    <CustomText style={textStyle}>{text}</CustomText>
  </TouchableOpacity>
);

export default CustomButton;
