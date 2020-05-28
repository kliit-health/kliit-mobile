import React, { PureComponent } from "react";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import CustomText from "../../components/customText";
import Language from "../../utils/localization";
import { showOrHideModal } from "../../components/customModal/action";
import Constant from "../../utils/constants";
import BasicInfoStaticData from "../../utils/constants/basicInfo";
import CustomInputText from "../../components/customInputText";
import CustomButton from "../../components/customButton";
import DatePicker from "../../components/datePicker";
import CustomPicker from "../../components/customPicker";

let lang = Language["en"];
class BasicInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dob: "",
      gender: "",
      showSelectHeight: false,
      showSelectWeight: false,
      weight: null,
      height: null,
    };
  }

  setWeight = (value) => {
    this.setState({ weight: value });
  };

  setHeight = (value) => {
    this.setState({ height: value });
  };

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
                <CustomInputText
                  autoCapitalize="words"
                  onChangeText={(value) => this.setState({ gender: value })}
                  placeholder="Gender"
                  value={gender}
                  style={
                    gender
                      ? styles.inputTypeStyle
                      : [styles.inputTypeStyle, { fontWeight: "100" }]
                  }
                  placeholderTextColor={Constant.App.colors.blackColor}
                />
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
              <View style={styles.dropDownContainerStyle}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    this.setState({
                      showSelectHeight: !showSelectHeight,
                    });
                  }}
                >
                  <CustomText style={styles.dropDownTextStyle}>
                    {height ? height : "Height"}
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
              <View style={styles.dropDownContainerStyle}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    this.setState({
                      showSelectWeight: !showSelectWeight,
                    });
                  }}
                >
                  <CustomText style={styles.dropDownTextStyle}>
                    {weight ? weight + " lbs" : "Weight"}
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
          {showSelectHeight ? (
            <CustomPicker
              show={true}
              title={"Height"}
              pickerText={"Save"}
              data={BasicInfoStaticData.height}
              setValue={this.setHeight}
            />
          ) : null}
          {showSelectWeight ? (
            <CustomPicker
              show={true}
              title={"Weight"}
              pickerText={"Save"}
              data={BasicInfoStaticData.weight}
              setValue={this.setWeight}
              pickerUnit="lbs"
            />
          ) : null}
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
)(BasicInfo);
