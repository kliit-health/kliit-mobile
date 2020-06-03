import React, { PureComponent } from "react";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import CustomText from "../../components/customText";
import Language from "../../utils/localization";
import { showOrHideModal } from "../../components/customModal/action";
import Constant from "../../utils/constants";
import CustomButton from "../../components/customButton";
import DatePicker from "../../components/datePicker";
import moment from "moment";

let lang = Language["en"];
class AddChild extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dob: "",
    };
  }

  renderHeaderView() {
    const { navigation } = this.props;
    const { staticImages } = Constant.App;
    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            style={{
              width: 20,
              height: 40,
              transform: [{ rotate: "180deg" }],
            }}
            resizeMode="contain"
            source={staticImages.rightChevronIcon}
          />
        </TouchableOpacity>
        <CustomText style={styles.titleTextStyle}>Add Child</CustomText>
        <CustomText style={styles.doneTextStyle}>{}</CustomText>
      </View>
    );
  }

  render() {
    const { staticImages } = Constant.App;
    let {
      dob,
      gender,
      showSelectHeight,
      showSelectWeight,
      weight,
      height,
    } = this.state;

    return (
      <View style={styles.container}>
        {this.renderHeaderView()}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inputTextParentContainerStyle}>
            <View style={styles.inputTextContainerStyle}>
              <View style={styles.dropDownContainerStyle}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    this.setState({
                      showSelectHeight: !showSelectHeight,
                    });
                  }}
                >
                  <DatePicker
                    format="MMM Do YYYY"
                    selectedDate={dob}
                    placeHolder="Birth Date"
                    textStyle={styles.birthDayTextStyle}
                    onSelection={(date) => {
                      this.setState({
                        dob: date,
                      });
                    }}
                  />
                  <Image
                    resizeMode="contain"
                    source={staticImages.downArrow}
                    style={styles.dropDownIconStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <CustomButton
              buttonStyle={styles.buttonContainerStyle}
              textStyle={styles.buttonTextStyle}
              onPress={() => {
                console.log("");
              }}
              text="Save Birth Date"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.authLoadingReducer.userData,
});

const mapDispatchToProps = (dispatch) => ({
  showHideErrorModal: (value) => dispatch(showOrHideModal(value)),
  signOut: (value) => dispatch(signoutApihit(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddChild);
