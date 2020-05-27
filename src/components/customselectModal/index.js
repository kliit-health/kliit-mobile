/* eslint-disable react/prop-types */
import React, { PureComponent } from "react";
import { View, Modal, FlatList, TouchableOpacity } from "react-native";
import CustomText from "../customText";
import styles from "./style";
import CustomButton from "../customButton";
import { SearchBar } from "react-native-elements";

class CustomSelectModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      search: "",
      selectedState: "",
    };
  }

  render() {
    const { data, search } = this.state;
    const { onSelection, onClose, showSearch } = this.props;
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
                      const newData = this.stateArr.filter((item) => {
                        const itemData = item.value.toUpperCase();
                        const textData = text.toUpperCase();
                        return itemData.indexOf(textData) > -1;
                      });
                      this.setState({ data: newData, search: text });
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
                    this.setState({
                      search: "",
                      selectedState: item.value,
                      data: this.stateArr,
                    });
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
                this.setState({
                  data: this.stateArr,
                  search: "",
                });
                onClose();
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default CustomSelectModal;
