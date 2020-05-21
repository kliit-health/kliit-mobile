import React, { PureComponent } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import CustomText from '../../components/customText';
import styles from './style';
import Constant from '../../utils/constants';
import CustomInputText from '../../components/customInputText';
import Language from '../../utils/localization';
import CustomButton from '../../components/customButton';
import { showOrHideModal } from '../../components/customModal/action';
import { isEmail } from '../../utils/helper';
import { loginApi, resetLoginState } from './action';
import KeyboardSpacer from 'react-native-keyboard-spacer';


let lang = Language['en'];
let rootRef;
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      isUser: true,
    };
  }

  componentDidUpdate() {
    const { clearState, loginFailure } = this.props;
    if (loginFailure) {
      this.setState({
        password: '',
      });
      clearState();
    }
  }

  renderInputTextView() {
    const { email, password, showPassword } = this.state;
    const { staticImages } = Constant.App;
    return (
      <View style={styles.inputTextParentContainerStyle}>
        <View style={styles.inputTextContainerStyle}>
          <CustomInputText
            autoCapitalize='none'
            onChangeText={(value) => this.setState({ email: value })}
            placeholder={lang.login.Email}
            value={email}
            style={
              email
                ? styles.inputTypeStyle
                : [styles.inputTypeStyle, { fontWeight: '100' }]
            }
            placeholderTextColor={Constant.App.colors.blackColor}
          />
        </View>
        <View style={styles.inputTextContainerStyle}>
          <CustomInputText
            autoCapitalize='none'
            onChangeText={(value) => {
              this.setState({ password: value });
            }}
            placeholder={lang.login.Password}
            value={password}
            secureTextEntry={!showPassword}
            style={
              password
                ? styles.inputTypePasswordStyle
                : [styles.inputTypePasswordStyle, { fontWeight: '100' }]
            }
            placeholderTextColor={Constant.App.colors.blackColor}
          />
          <TouchableOpacity
            onPress={() => this.setState({ showPassword: !showPassword })}
          >
            <Image
              resizeMode='contain'
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
          resizeMode='contain'
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
        resizeMode='contain'
        source={staticImages.loginLogoImage}
        style={styles.logoStyle}
      />
    );
  }

  renderToggleButtonView() {
    const { isUser } = this.state;
    return (
      <View style={styles.toggleButtonContainer}>
        <CustomButton
          buttonStyle={
            isUser
              ? [
                  styles.userButtonContainerStyle,
                  { backgroundColor: Constant.App.colors.whiteColor },
                ]
              : styles.userButtonContainerStyle
          }
          textStyle={styles.userButtonTextStyle}
          onPress={() => this.setState({ isUser: true })}
          text={lang.login.User}
        />
        <CustomButton
          buttonStyle={
            !isUser
              ? [
                  styles.expertButtonContainerStyle,
                  { backgroundColor: Constant.App.colors.whiteColor },
                ]
              : styles.expertButtonContainerStyle
          }
          textStyle={styles.expertButtonTextStyle}
          onPress={() => this.setState({ isUser: false })}
          text={lang.login.Expert}
        />
      </View>
    );
  }

  renderButtonView() {
    const { navigation, showHideErrorModal, login } = this.props;
    const { email, password, isUser } = this.state;
    return (
      <CustomButton
        buttonStyle={styles.loginButtonContainerStyle}
        textStyle={styles.loginButtonTextStyle}
        onPress={() => {
          if (!email.trim()) {
            showHideErrorModal(lang.login.EmptyEmailMsg);
          } else if (!isEmail(email.trim())) {
            showHideErrorModal(lang.login.InvalidEmailMsg);
          } else if (!password) {
            showHideErrorModal(lang.login.EmptyPasswordMsg);
          } else {
            const data = {
              params: {
                email: email.trim(),
                password: password.trim(),
              },
              isUser,
              navigation,
            };
            login(data);
          }
        }}
        text={lang.login.Login}
      />
    );
  }

  renderForgotPasswordView() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(Constant.App.screenNames.ForgotPassword);
        }}
      >
        <CustomText style={styles.forgotPasswordTextStyle}>
          {lang.login.ForgotPassword}
        </CustomText>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.parentContainerStyle}>
        <ScrollView
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
        >
          {this.renderCrossIconView()}
          <View style={styles.contentContainerStyle}>
            {this.renderLogoView()}
            {this.renderToggleButtonView()}
            {this.renderInputTextView()}
            {this.renderButtonView()}
            {this.renderForgotPasswordView()}
          </View>
        </ScrollView>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loginFailure: state.loginReducer.loginFailure,
});

const mapDispatchToProps = (dispatch) => ({
  showHideErrorModal: (value) => dispatch(showOrHideModal(value)),
  login: (value) => dispatch(loginApi(value, dispatch)),
  clearState: () => dispatch(resetLoginState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
