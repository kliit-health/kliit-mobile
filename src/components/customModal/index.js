/* eslint-disable react/prop-types */
import React from 'react';
import { View, Modal } from 'react-native';
import CustomText from '../customText';
import style from './style';
import CustomButton from '../customButton';

const CustomModal = ({ showLoader, errorMsg, onPressErrorButtonOk }) => (
  <Modal
    animationType='fade'
    onRequestClose={() => {}}
    transparent
    isVisible={showLoader}
  >
    <View style={style.parentContainerStyle}>
      <View style={style.innerContainerStyle}>
        <CustomText style={style.textStyle}>{errorMsg}</CustomText>
        <CustomButton
          buttonStyle={style.okBtnErrorContainerStyle}
          textStyle={style.okBtnErrorTextStyle}
          text='OK'
          onPress={onPressErrorButtonOk}
        />
      </View>
    </View>
  </Modal>
);

export default CustomModal;
