import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import CustomText from '../../../components/customText';
import Language from '../../../utils/localization';
import { showOrHideModal } from '../../../components/customModal/action';
import { signoutApihit } from '../action';
import Constant from '../../../utils/constants';
import { Avatar } from 'react-native-elements';

let lang = Language['en'];
class AccountExpert extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation, signOut, userData } = this.props;
    const { staticImages } = Constant.App;
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <View style={styles.profileInfoParentContainerStyle}>
            <CustomText style={styles.nameTextStyle}>
              {`${userData.profileInfo.firstName} ${userData.profileInfo.lastName}`}
            </CustomText>
            <CustomText style={styles.genderTextStyle}>
              {userData.profileInfo.profession.fullName}
            </CustomText>
            <CustomText style={styles.creditTextStyle}>
              {userData.clinicInfo.name}
            </CustomText>
          </View>
          <View style={styles.profileImageParentContainerStyle}>
            <Avatar
              renderPlaceholderContent={
                <Image
                  style={{
                    width: 120,
                    height: 120,
                  }}
                  resizeMode='stretch'
                  source={staticImages.profilePlaceholderImg}
                />
              }
              size={120}
              rounded
              source={{
                uri: userData.profileInfo.profileImageUrl
                  ? userData.profileInfo.profileImageUrl
                  : null,
              }}
              activeOpacity={0.7}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.itemsParentContainerStyle}
          onPress={() => {
            navigation.navigate(Constant.App.screenNames.SettingExpert);
          }}
        >
          <CustomText style={styles.itemTextStyle}>
            {lang.account.setting}
          </CustomText>
          <Image
            style={{
              width: 20,
              height: 40,
            }}
            resizeMode='contain'
            source={staticImages.rightChevronIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemsParentContainerStyle}
          onPress={() => {
            Linking.openURL(Constant.App.termsAndConditionsUrl);
          }}
        >
          <CustomText style={styles.itemTextStyle}>
            {lang.account.termsPolicies}
          </CustomText>
          <Image
            style={{
              width: 20,
              height: 40,
            }}
            resizeMode='contain'
            source={staticImages.rightChevronIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemsParentContainerStyle}
          onPress={() => {
            Linking.openURL(Constant.App.helpUrl);
          }}
        >
          <CustomText style={styles.itemTextStyle}>
            {lang.account.help}
          </CustomText>
          <Image
            style={{
              width: 20,
              height: 40,
            }}
            resizeMode='contain'
            source={staticImages.rightChevronIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemsParentContainerStyle}
          onPress={() => {
            Linking.openURL(Constant.App.rateUsUrl);
          }}
        >
          <CustomText style={styles.itemTextStyle}>
            {lang.account.rate}
          </CustomText>
          <Image
            style={{
              width: 20,
              height: 40,
            }}
            resizeMode='contain'
            source={staticImages.rightChevronIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutParentContainerStyle}
          onPress={() => {
            const payload = {
              navigation,
              isLoaderShow: true,
            };
            signOut(payload);
          }}
        >
          <CustomText style={styles.logoutTextStyle}>
            {lang.account.logout}
          </CustomText>
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountExpert);
