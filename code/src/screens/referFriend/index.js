import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Share,
  Platform,
  Clipboard,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import CustomText from '../../components/customText';
import Language from '../../utils/localization';
import { showOrHideModal } from '../../components/customModal/action';
import Constant from '../../utils/constants';
import CustomButton from '../../components/customButton';

let lang = Language.en;
class ReferFriend extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
  }
  onShare = async () => {
    const { userData } = this.props;
    try {
      const result = await Share.share({
        message:
          `Refer a friend and get 20 credits for free! Enter referal code ${userData.referralCode} while registrating in application. You can also download the application from given link ${Platform.OS == 'android' ? Constant.App.appLiveLink.googlePlay : Constant.App.appLiveLink.appleStore}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  renderHeaderView() {
    const { navigation } = this.props;
    const { staticImages } = Constant.App;
    return (
      <View style={styles.titleContainerStyle}>
        <TouchableOpacity
          style={styles.backContainerStyle}
          onPress={() => { navigation.goBack(); }}>
          <Image
            resizeMode="contain"
            source={staticImages.backIcon}
            style={styles.backIconStyle}
          />
        </TouchableOpacity>
        <CustomText style={styles.titleTextStyle}>
          {lang.referFriend.title}
        </CustomText>
      </View>
    );
  }

  renderSubHeaderView() {
    return (
      <View style={styles.subTitleContainerStyle}>
        <CustomText style={styles.subTitleTextBoldStyle}>
          {lang.referFriend.subTitleText}
        </CustomText>
        <CustomText style={styles.subTitleTextRegularStyle}>
          {lang.referFriend.subTitleText2}
        </CustomText>
      </View>
    );
  }

  writeToClipboard = async () => {
    const { userData } = this.props;
    await Clipboard.setString(userData.referralCode);
    alert('Code copied to clipboard');
  };

  renderYourReferralTitleView() {
    const { userData } = this.props;
    return (
      <View style={styles.referralCodeTitleContainerStyle}>
        <CustomText style={styles.referralCodeTitleTextBoldStyle}>
          {lang.referFriend.yourReferralCode}
        </CustomText>
        <CustomText style={styles.referralCodeTextStyle}>
          {userData.referralCode}
        </CustomText>
        <CustomButton
          buttonStyle={styles.btnContainerStyle}
          textStyle={styles.btnTextStyle}
          text={lang.referFriend.btnText}
          onPress={() => {
            this.writeToClipboard();
          }}
        />
      </View>
    );
  }

  render() {
    const { navigation, userData } = this.props;
    const { staticImages } = Constant.App;
    return (
      userData &&
      <View style={styles.parentContainerStyle}>
        {this.renderHeaderView()}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View>
            {this.renderSubHeaderView()}
            {this.renderYourReferralTitleView()}
            <TouchableOpacity
              style={styles.itemsParentContainerStyle}
              onPress={() => {
                this.onShare();
              }}>
              <Image
                style={{
                  width: 20,
                  height: 40,
                }}
                resizeMode="contain"
                source={staticImages.shareIcon} />
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <CustomText style={styles.itemTextStyle}>
                  {lang.referFriend.moreWays}
                </CustomText>
                <CustomText style={styles.itemTextBlueStyle}>
                  {lang.referFriend.smsFb}
                </CustomText>
              </View>
              <Image
                style={{
                  width: 20,
                  height: 40,
                }}
                resizeMode="contain"
                source={staticImages.rightChevronIcon} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authLoadingReducer.userData,
});

const mapDispatchToProps = dispatch => ({
  showHideErrorModal: value => dispatch(showOrHideModal(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReferFriend);
