import React from "react";
import { View, Text } from "react-native";
import ChatIcon from "../ChatIcon";
import styles from "./style";

const ChatBox = ({ text, user, userIcon, cpuIcon }) => {
  if (user) {
    return (
      <View style={styles.userViewStyle}>
        <Text style={styles.userTextStyle}>{text}</Text>
        <ChatIcon image={userIcon} />
      </View>
    );
  }
  return (
    <View style={styles.viewStyle}>
      <ChatIcon image={cpuIcon} />
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

export default ChatBox;
