/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text } from 'react-native';
import styles from './style';

const BoldCustomText = (props) => {
  const { style, ellipsizeMode, numberOfLines } = props;

  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[style, styles.boldTextStyle]}
    >
      {props.children}
    </Text>
  );
};

export default BoldCustomText;
