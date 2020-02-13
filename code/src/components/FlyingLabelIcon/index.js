import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import Constants from '../../utils/constants';

const FlyingLabelIcon = (props) => {
  const { containerStyle, iconStyle, titleStyle, labelStyle, source, title, label, onPress } = props;
  const disabled = !onPress;

  return (
    <View style={[styles.topContainer, containerStyle]}>
      <View style={styles.iconContainer}>
        <Image source={source} style={[styles.icon, iconStyle]} />
      </View>
      <View style={styles.flyingContainer}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <TouchableOpacity style={styles.labelContainer} disabled={disabled} onPress={onPress}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {!disabled && <Image source={Constants.App.staticImages.greyDownArrow} style={styles.arrowIcon} />}
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    </View>
  );
};

export default FlyingLabelIcon;
