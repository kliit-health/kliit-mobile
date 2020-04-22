/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text } from 'react-native';
import styles from './style';

const CustomText = (props) => {
  const { style, ellipsizeMode, numberOfLines } = props;

  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      allowFontScaling={false}
      style={[style, styles.textStyle]}
    >
      {props.children}
    </Text>
  );
};

export default CustomText;
