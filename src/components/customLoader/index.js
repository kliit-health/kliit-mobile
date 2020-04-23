/* eslint-disable react/prop-types */
import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import CustomText from '../customText';
import style from './style';
import Constant from '../../utils/constants';

const CustomLoader = ({ showLoader, textMsg }) => (
  <Modal
    animationType='fade'
    onRequestClose={() => {}}
    transparent
    isVisible={showLoader}
  >
    <View style={style.parentContainerStyle}>
      <View style={style.innerContainerStyle}>
        <ActivityIndicator
          color={Constant.App.colors.blackColor}
          size='large'
        />
        <CustomText style={style.textStyle}>{textMsg}</CustomText>
      </View>
    </View>
  </Modal>
);

export default CustomLoader;
