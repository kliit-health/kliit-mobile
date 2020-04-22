import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const IconButton = ({ containerStyle, source, iconStyle, onPress }) => (
  <TouchableOpacity style={[iconStyle, containerStyle]} onPress={onPress}>
    <Image source={source} style={iconStyle} />
  </TouchableOpacity>
);

export default IconButton;
