/* eslint-disable react/prop-types */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import CustomText from '../customText';
import style from './style';

const CustomButton = ({
  onPress, text, buttonStyle, disabled, textStyle, ...otherProps
}) => (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={buttonStyle}>
      <CustomText style={textStyle}>{text}</CustomText>
    </TouchableOpacity>
  );

export default CustomButton;
