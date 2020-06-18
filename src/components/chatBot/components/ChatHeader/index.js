import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

const ChatHeader = ({ chatHeader }) => (
  <View style={styles.viewStyle}>
    <Text style={styles.textStyle}>{chatHeader}</Text>
  </View>
);

export default ChatHeader;
