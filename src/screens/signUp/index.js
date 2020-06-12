import React, { PureComponent } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import CustomText from "../../components/customText";
import styles from "./style";
import Constant from "../../utils/constants";
import CustomInputText from "../../components/customInputText";
import Language from "../../utils/localization";
import CustomButton from "../../components/customButton";
import { isEmail, hasSpecialCharactors } from "../../utils/helper";
import { showOrHideModal } from "../../components/customModal/action";
import { createUser } from "./action";
import KeyboardSpacer from "react-native-keyboard-spacer";
import _ from "lodash";

let lang = Language.en;

class SignUp extends PureComponent {
  constructor(props) {
    super(props);
    this.onSignUpClicked = _.debounce(this.onSignUp, 500);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      isUser: true,
      isPasswordHasSpecialChar: false,
      isPasswordContainsSevenChar: false,
      referalCode: "",
    };
  }

  renderInputTextView() {
    const { email, password, showPassword } = this.state;
    const { staticImages } = Constant.App;
    return (
      <View style={styles.inputTextParentContainerStyle}>
        <View style={styles.inputTextContainerStyle}>
          <CustomInputText
            autoCapitalize="none"
            onChangeText={(value) => this.setState({ email: value })}
            placeholder={lang.login.Email}
            value={email}
            style={
              email
                ? styles.inputTypeStyle
                : [styles.inputTypeStyle, { fontWeight: "100" }]
            }
            placeholderTextColor={Constant.App.colors.blackColor}
          />
        </View>
        <View style={styles.inputTextContainerStyle}>
          <CustomInputText
            autoCapitalize="none"
            onChangeText={(value) => {
              this.setState({ password: value });
              if (value.trim().length < 7) {
                this.setState({ isPasswordContainsSevenChar: false });
              } else {
                this.setState({ isPasswordContainsSevenChar: true });
              }
              if (hasSpecialCharactors(value)) {
                this.setState({ isPasswordHasSpecialChar: true });
              } else {
                this.setState({ isPasswordHasSpecialChar: false });
              }
            }}
            placeholder={lang.login.Password}
            value={password}
            secureTextEntry={!showPassword}
            style={
              password
                ? styles.inputTypePasswordStyle
                : [styles.inputTypePasswordStyle, { fontWeight: "100" }]
            }
            placeholderTextColor={Constant.App.colors.blackColor}
          />
          <TouchableOpacity
            onPress={() => this.setState({ showPassword: !showPassword })}
          >
            <Image
              resizeMode="contain"
              source={
                showPassword
                  ? staticImages.passwordVisibleIcon
                  : staticImages.passwordInvisibleIcon
              }
              style={styles.passwordHideShowIconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderTermsConditionsView() {
    return (
      <View style={styles.termsConditionsTextContainerStyle}>
        <CustomText style={styles.termsConditionsTextStyle}>
          {lang.signUp.termsConditionsText1}
        </CustomText>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(Constant.App.termsAndConditionsUrl);
          }}
        >
          <CustomText style={styles.termsConditionsTextHighlightedStyle}>
            {lang.signUp.termsConditionsText2}
          </CustomText>
        </TouchableOpacity>
        <CustomText style={styles.termsConditionsTextStyle}>
          {lang.signUp.termsConditionsText3}
        </CustomText>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(Constant.App.privacyPolicyurl);
          }}
        >
          <CustomText style={styles.termsConditionsTextHighlightedStyle}>
            {lang.signUp.termsConditionsText4}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  }

  renderCrossIconView() {
    const { navigation } = this.props;
    const { staticImages } = Constant.App;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image
          resizeMode="contain"
          source={staticImages.crossIcon}
          style={styles.backIconStyle}
        />
      </TouchableOpacity>
    );
  }

  renderLogoView() {
    const { staticImages } = Constant.App;
    return (
      <Image
        resizeMode="contain"
        source={staticImages.loginLogoImage}
        style={styles.logoStyle}
      />
    );
  }

  renderTitleView() {
    return (
      <View style={styles.titleContainer}>
        <CustomText style={styles.titleTextStyle}>
          {lang.signUp.titleText1}
        </CustomText>
        <CustomText style={styles.titleTextStyle}>
          {lang.signUp.titleText2}
        </CustomText>
      </View>
    );
  }

  renderPasswordValidationView() {
    const { staticImages } = Constant.App;
    const {
      isPasswordContainsSevenChar,
      isPasswordHasSpecialChar,
    } = this.state;
    return (
      <View>
        <View style={styles.passwordValidationContainerStyle}>
          <Image
            resizeMode="contain"
            source={
              isPasswordContainsSevenChar
                ? staticImages.checkGreenIcon
                : staticImages.checkGreyIcon
            }
            style={styles.passwordValidChecboxIconStyle}
          />
          <CustomText style={styles.passwordValidationTextStyle}>
            {lang.signUp.passwordCharLimitValidMsg}
          </CustomText>
        </View>
        <View style={styles.passwordValidationContainerStyle}>
          <Image
            resizeMode="contain"
            source={
              isPasswordHasSpecialChar
                ? staticImages.checkGreenIcon
                : staticImages.checkGreyIcon
            }
            style={styles.passwordValidChecboxIconStyle}
          />
          <CustomText style={styles.passwordValidationTextStyle}>
            {lang.signUp.passwordSpecialCharValidMsg}
          </CustomText>
        </View>
      </View>
    );
  }

  onSignUp = () => {
    const { navigation, showHideErrorModal, signUp } = this.props;
    const { email, password, referalCode } = this.state;
    if (!email.trim()) {
      showHideErrorModal(lang.signUp.EmptyEmailMsg);
    } else if (!isEmail(email.trim())) {
      showHideErrorModal(lang.signUp.InvalidEmailMsg);
    } else if (!password.trim()) {
      showHideErrorModal(lang.signUp.EmptyPasswordMsg);
    } else if (password.trim().length < 7) {
      showHideErrorModal(lang.signUp.passwordLimitErrorMsg);
    } else if (!hasSpecialCharactors(password)) {
      showHideErrorModal(lang.signUp.passwordSpecialCharErrorMsg);
    } else {
      const data = {
        params: {
          email: email.trim(),
          password: password.trim(),
        },
        navigation,
        referalCode,
      };
      signUp(data);
    }
  };

  renderButtonView() {
    return (
      <CustomButton
        buttonStyle={styles.buttonContainerStyle}
        textStyle={styles.buttonTextStyle}
        onPress={this.onSignUpClicked}
        text={lang.signUp.signup}
      />
    );
  }

  renderDescriptionView() {
    return (
      <CustomText style={styles.descriptionTextStyle}>
        {lang.signUp.description}
      </CustomText>
    );
  }

  renderReferralSceretCodeView() {
    const { referalCode } = this.state;
    return (
      <View style={styles.inputTextParentContainerStyle}>
        <View style={styles.referalCodeInputTextContainerStyle}>
          <CustomInputText
            autoCapitalize="none"
            onChangeText={(value) => {
              this.setState({
                referalCode: value,
              });
            }}
            placeholder={lang.signUp.referalCode}
            value={referalCode}
            style={
              referalCode
                ? styles.referalCodeInputTypeStyle
                : [styles.referalCodeInputTypeStyle, { fontWeight: "100" }]
            }
            placeholderTextColor={Constant.App.colors.blackColor}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.parentContainerStyle}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {this.renderCrossIconView()}
          <View style={styles.contentContainerStyle}>
            {this.renderLogoView()}
            {this.renderTitleView()}
            {this.renderInputTextView()}
            {this.renderPasswordValidationView()}
            {this.renderReferralSceretCodeView()}
            {this.renderButtonView()}
            {this.renderTermsConditionsView()}
            {this.renderDescriptionView()}
          </View>
        </ScrollView>
        {Platform.OS === "ios" && <KeyboardSpacer />}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  showHideErrorModal: (value) => dispatch(showOrHideModal(value)),
  signUp: (value) => dispatch(createUser(value, dispatch)),
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
