import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Linking,
} from 'react-native';
import { setUserData, getExpertsData, clearExpertProfileState } from './action';
import styles from './style';
import CustomText from '../../components/customText';
import Constant from '../../utils/constants';
import { Avatar, Rating } from 'react-native-elements';
import Language from '../../utils/localization';
import CustomButton from '../../components/customButton';
import { displayConsole } from '../../utils/helper';

const lang = Language['en'];
class ExpertProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: '',
      imageUri: '',
      filepath: '',
      file: '',
    };
  }

  componentDidMount() {
    const { getData, navigation } = this.props;
    const { uid } = navigation.state.params;
    console.log("Navigation Props: ", navigation.state.props)
    displayConsole('navigation.state.params', navigation.state.params);
    const obj = {
      expertsParams: {
        tableName: Constant.App.firebaseTableNames.users,
        // uid: uid ? uid : 'KLp5EbO9IKVmCmYVFG9Iqh4HqIh2',
        uid: uid,
      },
    };
    getData(obj);
  }

  componentWillUnmount() {
    const { clearState } = this.props;
    clearState();
  }

  renderHeaderView() {
    const { navigation } = this.props;
    const { staticImages } = Constant.App;
    return (
      <View style={styles.titleContainerStyle}>
        <TouchableOpacity
          style={styles.backContainerStyle}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            resizeMode='contain'
            source={staticImages.backIcon}
            style={styles.backIconStyle}
          />
        </TouchableOpacity>
        <CustomText style={styles.titleTextStyle}>
          {lang.expertProfile.title}
        </CustomText>
      </View>
    );
  }

  renderExpertInfoView() {
    const { navigation } = this.props;
    const { isFrom } = navigation.state.params;
    const { staticImages } = Constant.App;
    const { expertData } = this.props;
    const { imageSrc } = this.state;
    return (
      <View style={styles.expertInfoParentContainerStyle}>
        {imageSrc ? (
          <Avatar
            renderPlaceholderContent={
              <Image
                style={{
                  width: 120,
                  height: 120,
                }}
                resizeMode='stretch'
                source={imageSrc}
              />
            }
            size={120}
            rounded
            source={{
              uri: expertData.profileInfo.profileImageUrl
                ? expertData.profileInfo.profileImageUrl
                : null,
            }}
            activeOpacity={0.7}
          />
        ) : (
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
              uri: expertData.profileInfo.profileImageUrl
                ? expertData.profileInfo.profileImageUrl
                : null,
            }}
            activeOpacity={0.7}
          />
        )}
        {expertData.isOnline ? (
          <View
            style={{
              alignSelf: 'center',
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 2,
              alignItems: 'center',
              justifyContent: 'center',
              top: 120,
              borderRadius: 10,
              backgroundColor: Constant.App.colors.greenColor,
              position: 'absolute',
            }}
          >
            <CustomText
              style={{
                color: Constant.App.colors.whiteColor,
                fontSize: Constant.App.textSize.Small,
                fontWeight: '200',
                fontFamily: Constant.App.fontFamily.bodyRegular,
              }}
            >
              {'Online'}
            </CustomText>
          </View>
        ) : (
          <View
            style={{
              alignSelf: 'center',
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 2,
              alignItems: 'center',
              justifyContent: 'center',
              top: 120,
              borderRadius: 10,
              backgroundColor: Constant.App.colors.grayColor,
              position: 'absolute',
            }}
          >
            <CustomText
              style={{
                color: Constant.App.colors.whiteColor,
                fontSize: Constant.App.textSize.Small,
                fontWeight: '200',
                fontFamily: Constant.App.fontFamily.bodyRegular,
              }}
            >
              {'Offline'}
            </CustomText>
          </View>
        )}
        <CustomText style={styles.expertNameTextBoldStyle}>
          {`${expertData.profileInfo.firstName} ${expertData.profileInfo.lastName}`}
        </CustomText>
        <CustomText style={styles.expertInfoProfessionTextStyle}>
          {expertData.profileInfo.profession.fullName}
        </CustomText>
        <CustomText style={styles.expertProfessionLoctionBoldStyle}>
          {`${expertData.profileInfo.city}, ${expertData.profileInfo.state.code}`}
        </CustomText>
        <Rating
          imageSize={20}
          readonly
          startingValue={parseFloat(expertData.rating / 2)}
        />
        {isFrom && isFrom === Constant.App.screenNames.ChooseExpert && (
          <CustomButton
            buttonStyle={styles.btnContainerStyle}
            textStyle={styles.btnTextStyle}
            text={lang.expertProfile.btnText}
            onPress={() =>
              navigation.navigate(Constant.App.screenNames.Chat, { expertData })
            }
          />
        )}
      </View>
    );
  }

  renderBioView() {
    const { expertData } = this.props;
    return (
      <View style={styles.bioContainerStyle}>
        <CustomText style={styles.bioTitleTextStyle}>
          {lang.expertProfile.bio}
        </CustomText>
        <CustomText style={styles.bioTextStyle}>
          {expertData.profileInfo.bio}
        </CustomText>
      </View>
    );
  }

  renderSpecialtiesView() {
    const { expertData } = this.props;
    return (
      <View style={styles.bioContainerStyle}>
        <CustomText style={styles.bioTitleTextStyle}>
          {lang.expertProfile.specialties}
        </CustomText>
        <CustomText style={styles.bioTextStyle}>
          {expertData.profileInfo.profession.specialities.map(
            (item, key) => `${item}    `
          )}
        </CustomText>
      </View>
    );
  }

  renderLanguagesView() {
    const { expertData } = this.props;
    return (
      <View style={styles.bioContainerStyle}>
        <CustomText style={styles.bioTitleTextStyle}>
          {lang.expertProfile.languages}
        </CustomText>
        <CustomText style={styles.bioTextStyle}>
          {expertData.profileInfo.languages.map(
            (item, key) => `${item.value}  `
          )}
        </CustomText>
      </View>
    );
  }

  renderClincInfoView() {
    const { expertData } = this.props;
    return (
      <View style={styles.bioContainerStyle}>
        <CustomText style={styles.bioTitleTextStyle}>
          {lang.expertProfile.clinicInfo}
        </CustomText>
        <CustomText style={styles.bioTextStyleBold}>
          {`${expertData.clinicInfo.name}`}
        </CustomText>
        <CustomText style={styles.bioTextStyle}>
          {`${expertData.clinicInfo.address}\n\n${expertData.clinicInfo.city}, ${expertData.clinicInfo.state.value} ${expertData.clinicInfo.zipcode}\n`}
        </CustomText>
        <TouchableOpacity
          onPress={() => {
            Platform.OS === 'android'
              ? Linking.openURL('tel:' + expertData.clinicInfo.phoneNumber)
              : Linking.openURL(
                  'telprompt:' + expertData.clinicInfo.phoneNumber
                );
          }}
        >
          <CustomText style={styles.phoneNumberTextStyleBold}>
            {`${expertData.clinicInfo.phoneNumber}`}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  }

  renderHoursView() {
    const { expertData } = this.props;
    return (
      <View style={styles.hoursContainerStyle}>
        <CustomText style={styles.bioTitleTextStyle}>
          {lang.expertProfile.hours}
        </CustomText>
        <CustomText style={styles.bioTextStyle}>
          {expertData.clinicInfo.hours.map((item, key) =>
            item.startTime && item.endTime
              ? `${item.day}: ${item.startTime} - ${item.endTime}\n\n`
              : `${item.day}: ${lang.expertProfile.closed}\n\n`
          )}
        </CustomText>
      </View>
    );
  }

  render() {
    const { expertData } = this.props;
    return (
      <View style={styles.parentContainerStyle}>
        {this.renderHeaderView()}
        <ScrollView
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
        >
          {expertData && (
            <View>
              {this.renderExpertInfoView()}
              {this.renderBioView()}
              {this.renderSpecialtiesView()}
              {this.renderLanguagesView()}
              {this.renderClincInfoView()}
              {this.renderHoursView()}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  expertData: state.expertProfileReducer.expertData,
});

const mapDispatchToProps = (dispatch) => ({
  setData: (data) => dispatch(setUserData(data)),
  getData: (value) => dispatch(getExpertsData(value)),
  clearState: () => dispatch(clearExpertProfileState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpertProfile);
