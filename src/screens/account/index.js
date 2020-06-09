import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { connect } from "react-redux";
import styles, { AVATAR_SIZE } from "./style";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import Language from "../../utils/localization";
import { showOrHideModal } from "../../components/customModal/action";
import { signoutApihit } from "./action";
import Constant from "../../utils/constants";
import { Avatar } from "react-native-elements";

let lang = Language["en"];
class Account extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {}

  render() {
    const { navigation, signOut, userData } = this.props;
    const { staticImages } = Constant.App;
    return (
      userData && (
        <View style={styles.container}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerStyle}>
              <View style={styles.profileInfoParentContainerStyle}>
                <CustomText style={styles.nameTextStyle}>
                  {`${userData.profileInfo.firstName} ${
                    userData.profileInfo.lastName
                  }`}
                </CustomText>
                <CustomText style={styles.genderTextStyle}>
                  {userData.profileInfo.pronouns}
                </CustomText>
                <CustomText style={styles.creditTextStyle}>
                  {`${userData.credits} ${lang.askUser.credits}`}
                </CustomText>
                <CustomButton
                  onPress={() => {
                    navigation.navigate(Constant.App.screenNames.BuyingCredit);
                  }}
                  text={lang.askUser.buyMoreCredits}
                  buttonStyle={styles.creditButtonStyle}
                  textStyle={styles.creditButtonTextStyle}
                />
              </View>
              <View style={styles.profileImageParentContainerStyle}>
                <Avatar
                  renderPlaceholderContent={
                    <Image
                      style={{
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                      }}
                      resizeMode="stretch"
                      source={staticImages.profilePlaceholderImg}
                    />
                  }
                  size={AVATAR_SIZE}
                  rounded
                  source={{
                    uri: userData.profileInfo.profileImageUrl
                      ? userData.profileInfo.profileImageUrl
                      : "",
                  }}
                  activeOpacity={0.7}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.itemsParentContainerStyle}
              onPress={() => {
                navigation.navigate(Constant.App.screenNames.Appointments);
              }}
            >
              <CustomText style={styles.itemTextStyle}>
                {lang.account.appointments}
              </CustomText>
              <Image
                style={{
                  width: 20,
                  height: 40,
                }}
                resizeMode="contain"
                source={staticImages.rightChevronIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.itemsParentContainerStyle}
              onPress={() => {
                navigation.navigate(Constant.App.screenNames.HealthHistory);
              }}
            >
              <CustomText style={styles.itemTextStyle}>
                {lang.account.healthHistory}
              </CustomText>
              <Image
                style={{
                  width: 20,
                  height: 40,
                }}
                resizeMode="contain"
                source={staticImages.rightChevronIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.itemsParentContainerStyle}
              onPress={() => {
                navigation.navigate(Constant.App.screenNames.Setting);
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
                resizeMode="contain"
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
                resizeMode="contain"
                source={staticImages.rightChevronIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.itemsParentContainerStyle}
              onPress={() => {
                Linking.openURL(Constant.App.privacyPolicyurl);
              }}
            >
              <CustomText style={styles.itemTextStyle}>
                {lang.account.privacyPolicies}
              </CustomText>
              <Image
                style={{
                  width: 20,
                  height: 40,
                }}
                resizeMode="contain"
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
                resizeMode="contain"
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
                resizeMode="contain"
                source={staticImages.rightChevronIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.itemsParentContainerStyle}
              onPress={() => {
                navigation.navigate(Constant.App.screenNames.ReferFriend);
              }}
            >
              <CustomText style={styles.itemTextStyle}>
                {lang.account.refer}
              </CustomText>
              <Image
                style={{
                  width: 20,
                  height: 40,
                }}
                resizeMode="contain"
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
)(Account);
