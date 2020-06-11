import React, { useState } from "react";
import { Alert, Modal, Text, TouchableHighlight, View } from "react-native";
import CustomScrollPicker from "../customScrollPicker";
import styles from "./style";

function CustomPicker({ title, pickerText, data, setValue, pickerUnit, show }) {
  const [modalVisible, setModalVisible] = useState(show);
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <Text style={styles.pickerUnit}>{pickerUnit}</Text>
            <CustomScrollPicker
              dataSource={data}
              selectedIndex={1}
              onValueChange={(data) => {
                setSelectedValue(data);
              }}
              wrapperHeight={180}
              wrapperWidth={250}
              wrapperBackground={"#FFFFFF"}
              itemHeight={25}
              highlightColor={"#d8d8d8"}
              highlightBorderWidth={2}
              activeItemColor={"#222121"}
              itemColor={"#B4B4B4"}
            />

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setValue(selectedValue);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>{pickerText}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CustomPicker;
