/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text } from 'react-native';
import styles from './style';

const BoldCustomText = ({ style, ellipsizeMode, numberOfLines }) => (
  <Text
    ellipsizeMode={ellipsizeMode}
    numberOfLines={numberOfLines}
    style={[style, styles.boldTextStyle]}
  >
    {props.children}
  </Text>
);

export default BoldCustomText;
