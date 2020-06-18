import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./style";

const ChatButton = ({ onPress, children, style, disabled }) => {
  const { buttonStyle, textStyle, disabledButton } = styles;
  if (disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[disabledButton, style]}
        disabled={disabled}
      >
        <Text style={textStyle}>{children}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ChatButton;
