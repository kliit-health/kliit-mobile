import React, { PureComponent } from "react";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import InputText from "../../components/customInputText/simpleInputText";
import CustomButton from "../../components/customButton";
import CustomText from "../../components/customText";
import Constant from "../../utils/constants";
import { updateMedicalHistory } from "./action";

class MedicalHistory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentConditions: "",
      pastConditions: "",
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
        <CustomText style={styles.titleTextStyle}>Medical History</CustomText>
        <CustomText style={styles.doneTextStyle}>{}</CustomText>
      </View>
    );
  }

  renderCurrentConditions() {
    const { question } = this.props;
    const { currentConditions } = this.state;
    return (
      <View style={styles.inputTextContainerStyle}>
        <InputText
          maxHeight={100}
          multiline={true}
          autoCapitalize="sentences"
          onChangeText={(value) => {
            this.setState({
              currentConditions: value,
            });
          }}
          placeholder="Do you have any ongoing health issues?"
          value={currentConditions}
          style={
            question
              ? styles.inputTypeStyle
              : [styles.inputTypeStyle, { lineHeight: 25 }]
          }
          placeholderTextColor={Constant.App.colors.lightGrey}
        />
      </View>
    );
  }

  renderPastConditions() {
    const { question } = this.props;
    const { pastConditions } = this.state;
    return (
      <View style={styles.inputTextContainerStyle}>
        <InputText
          maxHeight={100}
          multiline={true}
          autoCapitalize="sentences"
          onChangeText={(value) => {
            this.setState({
              pastConditions: value,
            });
          }}
          placeholder="Tell us about your medical history."
          value={pastConditions}
          style={
            question
              ? styles.inputTypeStyle
              : [styles.inputTypeStyle, { lineHeight: 25 }]
          }
          placeholderTextColor={Constant.App.colors.lightGrey}
        />
      </View>
    );
  }

  renderButtonView() {
    const { userData, navigation, updateMedicalHistory } = this.props;
    const { currentConditions, pastConditions } = this.state;

    const payloadData = {
      MedicalHistoryParams: {
        uid: userData.uid,
        medicalHistory: {
          currentConditions,
          pastConditions,
        },
      },
      navigation,
    };

    return (
      <CustomButton
        buttonStyle={styles.buttonContainerStyle}
        textStyle={styles.buttonTextStyle}
        onPress={() => {
          updateMedicalHistory(payloadData);
        }}
        text="Save"
      />
    );
  }

  render() {
    const { navigation, signOut, userData } = this.props;
    const { staticImages } = Constant.App;
    return (
      userData && (
        <View style={styles.container}>
          {this.renderHeaderView()}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {this.renderCurrentConditions()}
            {this.renderPastConditions()}
            {this.renderButtonView()}
          </ScrollView>
        </View>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.authLoadingReducer.userData,
});

const mapDispatchToProps = (dispatch) => ({
  updateMedicalHistory: (value) => dispatch(updateMedicalHistory(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicalHistory);
