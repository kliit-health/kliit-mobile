import React, { PureComponent } from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import CustomText from '../../components/customText';
import styles from './style';
import Constant from '../../utils/constants';
import CustomInputText from '../../components/customInputText';
import Language from '../../utils/localization';
import CustomButton from '../../components/customButton';
import { showOrHideModal } from '../../components/customModal/action';
import { forgotPasswordApiHit, resertForgotPasswordState } from './action';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { isEmail } from '../../utils/helper';

let lang = Language['en'];
class ForgotPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }
  componentDidUpdate() {
    const { forgotPasswordSuccess, resetReducerState } = this.props;
    if (forgotPasswordSuccess) {
      this.setState({
        email: '',
      });
      resetReducerState();
    }
  }

  renderInputTextView() {
    const { email } = this.state;
    return (
      <View style={styles.inputTextParentContainerStyle}>
        <View style={styles.inputTextContainerStyle}>
          <CustomInputText
            autoCapitalize='none'
            onChangeText={(value) => this.setState({ email: value })}
            placeholder={lang.forgotPassword.Email}
            value={email}
            style={
              email
                ? styles.inputTypeStyle
                : [styles.inputTypeStyle, { fontWeight: '100' }]
            }
            placeholderTextColor={Constant.App.colors.blackColor}
          />
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

  renderTitleView() {
    return (
      <View style={styles.titleContainer}>
        <CustomText style={styles.titleTextStyle}>
          {lang.forgotPassword.Title}
        </CustomText>
        <CustomText style={styles.subTitleTextStyle}>
          {lang.forgotPassword.Subtitle}
        </CustomText>
      </View>
    );
  }

  renderButtonView() {
    const { email } = this.state;
    const { showHideErrorModal, forgotPassword } = this.props;
    return (
      <CustomButton
        buttonStyle={styles.buttonContainerStyle}
        textStyle={styles.buttonTextStyle}
        onPress={() => {
          if (!email.trim()) {
            showHideErrorModal(lang.login.EmptyEmailMsg);
          } else if (!isEmail(email.trim())) {
            showHideErrorModal(lang.login.InvalidEmailMsg);
          } else {
            const payload = {
              email,
            };
            forgotPassword(payload);
          }
        }}
        text={lang.forgotPassword.Submit}
      />
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
            {this.renderTitleView()}
            {this.renderInputTextView()}
            {this.renderButtonView()}
          </View>
        </ScrollView>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  forgotPasswordSuccess: state.forgotPasswordReducer.forgotPasswordSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  showHideErrorModal: (value) => dispatch(showOrHideModal(value)),
  forgotPassword: (value) => dispatch(forgotPasswordApiHit(value)),
  resetReducerState: () => dispatch(resertForgotPasswordState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
