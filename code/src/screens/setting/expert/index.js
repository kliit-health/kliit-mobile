import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import CustomText from '../../../components/customText';
import Language from '../../../utils/localization';
import Constant from '../../../utils/constants';
import { Avatar } from 'react-native-elements';
import { updateExpertDataToFirebase } from './action';
import ImagePicker from 'react-native-image-picker';
import { showOrHideModal } from '../../../components/customModal/action';

let lang = Language['en'];
class SettingExpert extends React.PureComponent {
  constructor(props) {
    super(props);
    const { userData } = this.props;
    this.state = {
      imageSrc: userData.profileInfo.profileImageUrl ? userData.profileInfo.profileImageUrl : null,
      imageUri: '',
      filepath: '',
      file: '',
    };
  }

  renderHeaderView() {
    const { navigation, updateUserData, userData } = this.props;
    const { imageUri, file, filepath } = this.state;
    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <CustomText style={styles.cancelTextStyle}>
            {lang.setting.cancel}
          </CustomText>
        </TouchableOpacity>
        <CustomText style={styles.titleTextStyle}>
          {lang.setting.title}
        </CustomText>
        <TouchableOpacity onPress={() => {
          if (imageUri) {
            let filename = null;
            let name = imageUri.substring(
              imageUri.lastIndexOf("/") + 1,
              imageUri.length
            );
            const ext = file.type.split("/").pop(); // Extract image extension
            filename = Platform.OS === 'ios' ? `${Math.floor(Date.now())}${name}` : `${Math.floor(Date.now())}${name}.${ext}`;
            const payloadData = {
              userParams: userData,
              navigation,
              imageParams: {
                file: Platform.OS == 'ios' ? imageUri : filepath,
                filename,
              }
            }
            updateUserData(payloadData);
          }
        }}>
          <CustomText style={styles.doneTextStyle}>
            {lang.setting.done}
          </CustomText>
        </TouchableOpacity>
      </View>
    )
  }

  requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const grantedAgain = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          );
          if (grantedAgain === PermissionsAndroid.RESULTS.GRANTED) {
            this.pickImage();
          } else {
            this.pickImage();
          }
        } else {
          this.pickImage();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      this.pickImage();
    }
  };

  pickImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("You cancelled image picker");
      } else if (response.error) {
        alert("And error occured: " + JSON.stringify(response));
      } else {
        const source = { uri: response.uri };
        this.setState({
          imageSrc: response.uri,
          imageUri: response.uri,
          filepath: response.path,
          file: response,
        });
      }
    });
  };


  renderProfileImageView() {
    const { staticImages } = Constant.App;
    const { userData } = this.props;
    const { imageSrc } = this.state;

    return (
      <View style={styles.profileImgViewStyle}>
        <Avatar
          containerStyle={{ alignSelf: 'center' }}
          renderPlaceholderContent={<Image
            style={{
              width: 120,
              height: 120,
            }}
            resizeMode="stretch"
            source={staticImages.profilePlaceholderImg}
          />}
          size={120}
          rounded
          source={{ uri: imageSrc }}
          activeOpacity={0.7} />
        <TouchableOpacity onPress={() => {
          this.requestCameraPermission();
        }}>
          <CustomText style={styles.changeProfileTextStyle}>
            {lang.setting.changePhoto}
          </CustomText>
        </TouchableOpacity>
      </View>
    )
  }

  renderButtonView() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        style={styles.btnContainerStyle}
        onPress={() => { navigation.navigate(Constant.App.screenNames.ChangePasswordExpert) }}>
        <CustomText style={styles.btnTextStyle}>
          {lang.setting.changePassword}
        </CustomText>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeaderView()}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {this.renderProfileImageView()}
          {this.renderButtonView()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authLoadingReducer.userData,
});

const mapDispatchToProps = dispatch => ({
  updateUserData: value => dispatch(updateExpertDataToFirebase(value)),
  showHideErrorModal: value => dispatch(showOrHideModal(value)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingExpert);
