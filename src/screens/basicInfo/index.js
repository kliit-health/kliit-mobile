import React, { PureComponent } from "react";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import styles, { AVATAR_SIZE } from "./style";
import CustomText from "../../components/customText";
import Language from "../../utils/localization";
import { showOrHideModal } from "../../components/customModal/action";
// import { signoutApihit } from "./action";
import Constant from "../../utils/constants";
import CustomInputText from "../../components/customInputText";
import CustomButton from "../../components/customButton";
import DatePicker from "../../components/datePicker";
import CustomSelectModal from "../../components/customselectModal";
import CustomPicker from "../../components/customPicker";

let lang = Language["en"];
class BasicInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dob: "",
      showSelectGenderModal: false,
      selectedGender: null,
      showSelectHeight: false,
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
        <CustomText style={styles.titleTextStyle}>Basic Information</CustomText>
        <CustomText style={styles.doneTextStyle}>{}</CustomText>
      </View>
    );
  }

  render() {
    const { staticImages } = Constant.App;
    let {
      dob,
      showSelectGenderModal,
      selectedGender,
      showSelectHeight,
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
              <View style={styles.stateDropDownContainerStyle}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    this.setState({
                      showSelectGenderModal: !showSelectGenderModal,
                    });
                  }}
                >
                  <CustomText style={styles.stateDropDownTextStyle}>
                    {selectedGender ? selectedGender.value : "Gender"}
                  </CustomText>
                  <Image
                    resizeMode="contain"
                    source={staticImages.downArrow}
                    style={styles.dropDownIconStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.birthDayContainerStyle}>
              <DatePicker
                selectedDate={dob}
                placeHolder={lang.addProfileData.yourBirthDay}
                textStyle={styles.birthDayTextStyle}
                onSelection={(date) => {
                  this.setState({
                    dob: date,
                  });
                }}
              />
            </View>
            <View style={styles.inputTextContainerStyle}>
              <View style={styles.stateDropDownContainerStyle}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    console.log("SHOW ME THE HEIGHT");
                    this.setState({
                      showSelectHeight: !showSelectHeight,
                    });
                  }}
                >
                  <CustomText style={styles.stateDropDownTextStyle}>
                    {selectedGender ? selectedGender.value : "Height"}
                  </CustomText>
                  <Image
                    resizeMode="contain"
                    source={staticImages.downArrow}
                    style={styles.dropDownIconStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputTextContainerStyle}>
              <View style={styles.stateDropDownContainerStyle}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    this.setState({
                      showSelectStateModal: !showSelectStateModal,
                    });
                  }}
                >
                  <CustomText style={styles.stateDropDownTextStyle}>
                    Weight
                  </CustomText>
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
              text="Save My Basic Information"
            />
          </View>
          {showSelectHeight ? <CustomPicker /> : null}
        </ScrollView>
        {showSelectGenderModal ? (
          <CustomSelectModal
            data={Constant.App.Modal.gender}
            onSelection={(item) => {
              this.setState({
                selectedGender: item,
                showSelectGenderModal: false,
              });
            }}
            onClose={() => {
              this.setState({
                showSelectGenderModal: false,
              });
            }}
          />
        ) : null}
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
)(BasicInfo);
