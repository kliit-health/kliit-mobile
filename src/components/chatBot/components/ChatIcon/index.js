import React from "react";
import { View, Image } from "react-native";
import styles from "./style";

const ChatIcon = ({ image }) => (
  <View style={styles.viewStyle}>
    <Image source={image} style={styles.imageStyle} />
  </View>
);

export default ChatIcon;
