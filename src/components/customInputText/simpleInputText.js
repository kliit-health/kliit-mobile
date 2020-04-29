/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { TextInput } from 'react-native';

const InputText = ({ style, ...otherProps }) => (
  <TextInput {...otherProps} style={style} />
);

export default InputText;
