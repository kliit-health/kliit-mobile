import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const IconButton = (props) => {
  const { containerStyle, source, iconStyle, onPress } = props;

  return (
    <TouchableOpacity style={[iconStyle, containerStyle]} onPress={onPress}>
      <Image source={source} style={iconStyle} />
    </TouchableOpacity>
  );
};

export default IconButton;