import React, { PureComponent } from "react";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import InputText from "../../components/customInputText/simpleInputText";
import CustomButton from "../../components/customButton";
import CustomText from "../../components/customText";
import { showOrHideModal } from "../../components/customModal/action";
import Constant from "../../utils/constants";

class Medications extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      medicationCurrent: "",
      medicationPast: "",
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
        <CustomText style={styles.titleTextStyle}>Medications</CustomText>
        <CustomText style={styles.doneTextStyle}>{}</CustomText>
      </View>
    );
  }

  renderCurrentMedications() {
    const { question } = this.props;
    const { questionText } = this.state;
    return (
      <View style={styles.inputTextContainerStyle}>
        <InputText
          maxHeight={100}
          multiline={true}
          autoCapitalize="sentences"
          onChangeText={(value) => {
            this.setState({
              questionText: value,
            });
          }}
          placeholder="Do you take any medications regularly?"
          value={questionText}
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

  renderPastMedications() {
    const { question } = this.props;
    const { questionText } = this.state;
    return (
      <View style={styles.inputTextContainerStyle}>
        <InputText
          maxHeight={100}
          multiline={true}
          autoCapitalize="sentences"
          onChangeText={(value) => {
            this.setState({
              questionText: value,
            });
          }}
          placeholder="What medications have you taken in the past?"
          value={questionText}
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
    const { navigation, question } = this.props;
    return (
      <CustomButton
        disabled={question ? false : true}
        buttonStyle={styles.buttonContainerStyle}
        textStyle={styles.buttonTextStyle}
        onPress={() => {
          navigation.navigate(Constant.App.screenNames.ChooseExpert);
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
            {this.renderCurrentMedications()}
            {this.renderPastMedications()}
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
  showHideErrorModal: (value) => dispatch(showOrHideModal(value)),
  signOut: (value) => dispatch(signoutApihit(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Medications);
