import React, { useState } from "react";
import { View, Modal, TouchableOpacity, Platform } from "react-native";
import CustomText from "../customText";
import styles from "./style";
import CustomButton from "../customButton";
import Moment from "moment";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = (props) => {
  const { placeHolder, textStyle, onSelection, selectedDate } = props;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(selectedDate);

  const dateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const doneButtonModalDatePickerClick = () => {
    const selectedDate = Moment(date).format("MMM Do YYYY");
    onSelection(selectedDate);
    setSelected(selectedDate);
    setShow(!show);
  };

  const renderDatePickerModalView = () => {
    const deliveryWindow = new Date();
    deliveryWindow.setDate(deliveryWindow.getDate() + 365);

    return (
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {}}
        visible={true}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <View style={styles.modalDatePickerContainer}>
            <CustomButton
              buttonStyle={styles.cancelDatePicketButtonStyle}
              textStyle={styles.cancelDatePicketButtonTextStyle}
              text={"Close"}
              onPress={() => setShow(!show)}
            />
            <CustomButton
              buttonStyle={styles.cancelDatePicketButtonStyle}
              textStyle={styles.cancelDatePicketButtonTextStyle}
              text={"Done"}
              onPress={doneButtonModalDatePickerClick}
            />
          </View>
          <View style={{ backgroundColor: "white" }}>
            <RNDateTimePicker
              value={date}
              maximumDate={deliveryWindow}
              mode="date"
              onChange={dateChange}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const renderDatePickerNonModalView = () => {
    const deliveryWindow = new Date();
    deliveryWindow.setDate(deliveryWindow.getDate() + 365);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View style={{ backgroundColor: "white" }}>
          <RNDateTimePicker
            value={date}
            maximumDate={deliveryWindow}
            mode="date"
            onChange={dateChange}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setShow(!show);
        }}
      >
        <CustomText style={textStyle ? textStyle : styles.dateTextStyle}>
          {selected ? selected : placeHolder ? placeHolder : "Select date"}
        </CustomText>
      </TouchableOpacity>
      {show && Platform.OS === "ios" ? renderDatePickerModalView() : null}
      {show && Platform.OS !== "ios" ? renderDatePickerNonModalView() : null}
    </View>
  );
};

export default DatePicker;
