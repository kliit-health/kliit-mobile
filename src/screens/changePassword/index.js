import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import Language from '../../utils/localization';
import { hasSpecialCharactors, displayConsole } from '../../utils/helper';
import Constant from '../../utils/constants';
import CustomInputText from '../../components/customInputText';
import CustomText from '../../components/customText';
import CustomButton from '../../components/customButton';
import { changePassword } from './action';
import { showOrHideModal } from '../../components/customModal/action';
import firebase from 'react-native-firebase';

let lang = Language['en'];
class ChangePassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      showNewPassword: false,
      showCurrentPassword: false,
      isPasswordHasSpecialChar: false,
      isPasswordContainsSevenChar: false,
    };
  }

  renderHeaderView() {
    const { navigation } = this.props;
    return (
      <View style={styles.headerStyle}>
        <CustomText style={styles.titleTextStyle}>
          {lang.changePassword.title}
        </CustomText>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <CustomText style={styles.cancelTextStyle}>
            {lang.changePassword.cancel}
          </CustomText>
        </TouchableOpacity>
      </View>
    )
  }

  renderInputTextView() {
    const { newPassword, currentPassword, showNewPassword, showCurrentPassword } = this.state;
    const { staticImages } = Constant.App;
    return (
      <View
        style={styles.inputTextParentContainerStyle}
      >
        <View style={styles.inputTextContainerStyle}>
          <CustomInputText
            autoCapitalize="none"
            onChangeText={value => {
              this.setState({ currentPassword: value })
            }}
            placeholder={lang.changePassword.currentPassword}
            value={currentPassword}
            secureTextEntry={!showCurrentPassword}
            style={currentPassword ? styles.inputTypePasswordStyle : [styles.inputTypePasswordStyle, { fontWeight: '100' }]}
            placeholderTextColor={Constant.App.colors.blackColor}
          />
          <TouchableOpacity
            onPress={() => this.setState({ showCurrentPassword: !showCurrentPassword })}
          >
            <Image
              resizeMode="contain"
              source={
                showCurrentPassword ? staticImages.passwordVisibleIcon : staticImages.passwordInvisibleIcon
              }
              style={styles.passwordHideShowIconStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputTextContainerStyle}>
          <CustomInputText
            autoCapitalize="none"
            onChangeText={value => {
              this.setState({ newPassword: value })
              if (value.trim().length < 7) {
                this.setState({ isPasswordContainsSevenChar: false })
              } else {
                this.setState({ isPasswordContainsSevenChar: true })
              }
              if (hasSpecialCharactors(value)) {
                this.setState({ isPasswordHasSpecialChar: true })
              } else {
                this.setState({ isPasswordHasSpecialChar: false })
              }
            }}
            placeholder={lang.changePassword.newPassword}
            value={newPassword}
            secureTextEntry={!showNewPassword}
            style={newPassword ? styles.inputTypePasswordStyle : [styles.inputTypePasswordStyle, { fontWeight: '100' }]}
            placeholderTextColor={Constant.App.colors.blackColor}
          />
          <TouchableOpacity
            onPress={() => this.setState({ showNewPassword: !showNewPassword })}
          >
            <Image
              resizeMode="contain"
              source={
                showNewPassword ? staticImages.passwordVisibleIcon : staticImages.passwordInvisibleIcon
              }
              style={styles.passwordHideShowIconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderPasswordValidationView() {
    const { staticImages } = Constant.App;
    const { isPasswordContainsSevenChar, isPasswordHasSpecialChar } = this.state;
    return (
      <View>
        <View style={styles.passwordValidationContainerStyle}>
          <Image
            resizeMode="contain"
            source={isPasswordContainsSevenChar ? staticImages.checkGreenIcon : staticImages.checkGreyIcon}
            style={styles.passwordValidChecboxIconStyle}
          />
          <CustomText style={styles.passwordValidationTextStyle}>
            {lang.signUp.passwordCharLimitValidMsg}
          </CustomText>
        </View>
        <View style={styles.passwordValidationContainerStyle}>
          <Image
            resizeMode="contain"
            source={isPasswordHasSpecialChar ? staticImages.checkGreenIcon : staticImages.checkGreyIcon}
            style={styles.passwordValidChecboxIconStyle}
          />
          <CustomText style={styles.passwordValidationTextStyle}>
            {lang.signUp.passwordSpecialCharValidMsg}
          </CustomText>
        </View>
      </View>
    )
  }

  renderButtonView() {
    const { changeUserPassword, showHideErrorModal, navigation } = this.props;
    const { newPassword, currentPassword } = this.state;
    return (
      <CustomButton
        buttonStyle={styles.buttonContainerStyle}
        textStyle={styles.buttonTextStyle}
        onPress={() => {
          if (!currentPassword.trim()) {
            showHideErrorModal(lang.changePassword.EmptyCurrentPasswordMsg);
          } else if (!newPassword.trim()) {
            showHideErrorModal(lang.changePassword.EmptyNewPasswordMsg);
          } else if (newPassword.trim().length < 7) {
            showHideErrorModal(lang.changePassword.passwordLimitErrorMsg);
          } else if (!hasSpecialCharactors(newPassword)) {
            showHideErrorModal(lang.changePassword.passwordSpecialCharErrorMsg);
          } else {
            const data = {
              params: {
                newPassword: newPassword.trim(),
                currentPassword: currentPassword.trim(),
              },
              navigation,
              // this_: this,
            }
            changeUserPassword(data);
          }
        }}
        text={lang.changePassword.updatePassword} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeaderView()}
        {this.renderInputTextView()}
        {this.renderPasswordValidationView()}
        {this.renderButtonView()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authLoadingReducer.userData,
});

const mapDispatchToProps = dispatch => ({
  showHideErrorModal: value => dispatch(showOrHideModal(value)),
  changeUserPassword: (value) => dispatch(changePassword(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);
