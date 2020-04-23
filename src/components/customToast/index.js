/* eslint-disable react/prop-types */
import React from 'react';
import { View, Modal } from 'react-native';
import CustomText from '../customText';
import style from './style';
import { hideToast } from './action';

const CustomToast = ({ showToast, textMsg, dispatch, delay }) => {
  if (showToast) {
    setTimeout(() => {
      dispatch(hideToast());
    }, delay);
  }

  return (
    <Modal
      animationType='fade'
      onRequestClose={() => {}}
      transparent
      isVisible={showToast}
    >
      <View style={style.parentContainerStyle}>
        <View style={style.innerContainerStyle}>
          <CustomText style={style.textStyle}>{textMsg}</CustomText>
        </View>
      </View>
    </Modal>
  );
};

export default CustomToast;
