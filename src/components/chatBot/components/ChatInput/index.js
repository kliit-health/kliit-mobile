import React from "react";
import { TextInput, View, Text } from "react-native";
import Button from "../ChatButton";
import styles from "./style";

const ChatInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  onPress,
  buttonDisabled,
}) => (
  <View style={styles.containerStyle}>
    <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      style={styles.inputStyle}
      value={value}
      onChangeText={onChangeText}
      autoCorrect
    />
    <Button
      style={styles.buttonStyle}
      onPress={onPress}
      disabled={buttonDisabled}
    >
      <Text>{label}</Text>
    </Button>
  </View>
);

export default ChatInput;
