/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { View, Modal, FlatList, TouchableOpacity } from "react-native";
import CustomText from "../customText";
import styles from "./style";
import CustomButton from "../customButton";
import { SearchBar } from "react-native-elements";
import Constant from "../../utils/constants/";

const CustomSelectModal = (props) => {
  const { states } = Constant.App.Modal;
  const [data, setData] = useState(props.data);
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [stateArr, setStateArr] = useState(states);
  const { onSelection, onClose, showSearch } = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {}}
      visible={true}
    >
      <View style={styles.modalParentContainer}>
        <View style={styles.modalSelectStateContainer}>
          <FlatList
            data={data}
            ItemSeparatorComponent={() => (
              <View style={styles.saparatorStyle} />
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainerStyle}>
                <CustomText style={styles.emptyTextStyle}>
                  {"No Data available"}
                </CustomText>
              </View>
            )}
            ListHeaderComponent={
              showSearch && (
                <SearchBar
                  containerStyle={styles.searchBarContaineStyle}
                  inputContainerStyle={styles.searchBarInputContainerStyle}
                  inputStyle={styles.searchBarInputTextStyle}
                  placeholder="Search Here..."
                  lightTheme
                  onChangeText={(text) => {
                    const newData = stateArr.filter((item) => {
                      const itemData = item.value.toUpperCase();
                      const textData = text.toUpperCase();
                      return itemData.indexOf(textData) > -1;
                    });
                    setSearch(text);
                    setData(newData);
                  }}
                  value={search}
                />
              )
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSearch("");
                  setSelectedState(item.value);
                  setData(stateArr);
                  onSelection(item);
                }}
                style={styles.stateTextContainerStyle}
              >
                <CustomText style={styles.stateTextStyle}>
                  {" "}
                  {item.value}{" "}
                </CustomText>
              </TouchableOpacity>
            )}
          />
          <CustomButton
            buttonStyle={styles.cancelSelectStateButtonStyle}
            textStyle={styles.cancelSelectStateButtonTextStyle}
            text={"Close"}
            onPress={() => {
              setData(stateArr);
              setSearch("");
              onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomSelectModal;
