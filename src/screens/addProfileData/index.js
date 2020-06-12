import React, { PureComponent } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Linking,
} from "react-native";
import { connect } from "react-redux";
import CustomText from "../../components/customText";
import styles from "./style";
import Constant from "../../utils/constants";
import CustomInputText from "../../components/customInputText";
import Language from "../../utils/localization";
import CustomButton from "../../components/customButton";
import ImagePicker from "react-native-image-picker";
import { displayConsole } from "../../utils/helper";
import { uploadUserDataToFirebase } from "./action";
import { showOrHideModal } from "../../components/customModal/action";
import CustomSelectModal from "../../components/customselectModal";
import DatePicker from "../../components/datePicker";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Avatar } from "react-native-elements";

let lang = Language.en;
const states = Constant.App.Modal.states;

class AddProfileData extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      imageSrc: "",
      imageUri: "",
      filepath: "",
      file: "",
      showIosDateModal: false,
      showSelectStateModal: false,
      progress: 0,
      dob: "",
      pronounsArr: [
        {
          title: lang.addProfileData.sheHer,
          selected: false,
        },
        {
          title: lang.addProfileData.heHim,
          selected: false,
        },
        {
          title: lang.addProfileData.theyThem,
          selected: false,
        },
      ],
      selectedState: null,
    };
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
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
        alert("And error occured: " + JSON.stringify(response));
      } else {
        const source = { uri: response.uri };
        this.setState({
          imageSrc: source,
          imageUri: source.uri,
          filepath: response.path,
          file: response,
        });
      }
    });
  };

  renderProfileImageView() {
    const { staticImages } = Constant.App;
    const { imageSrc } = this.state;
    return (
      <View style={styles.profileImgViewStyle}>
        {imageSrc ? (
          <Avatar size={150} rounded source={imageSrc} activeOpacity={0.7} />
        ) : (
          <Avatar
            size={150}
            imageProps={{ resizeMode: "contain" }}
            rounded
            source={staticImages.profilePlaceholderImg}
            activeOpacity={0.7}
          />
        )}
        <TouchableOpacity
          style={styles.cameraIconContainerStyle}
          onPress={() => {
            this.requestCameraPermission();
          }}
        >
          <Image
            resizeMode="contain"
            source={staticImages.cameraWhiteImg}
            style={styles.cameraIconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderTitleView() {
    return (
      <View style={styles.titleContainer}>
        <CustomText style={styles.titleTextStyle}>
          {lang.addProfileData.title}
        </CustomText>
      </View>
    );
  }

  renderInputTextView() {
    const {
      firstName,
      lastName,
      showSelectStateModal,
      selectedState,
    } = this.state;
    const { staticImages } = Constant.App;

    return (
      <View style={styles.inputTextParentContainerStyle}>
        <View style={styles.inputTextContainerStyle}>
          <View style={styles.inputTextFirstNameContainerStyle}>
            <CustomInputText
              autoCapitalize="words"
              onChangeText={(value) => this.setState({ firstName: value })}
              placeholder={lang.addProfileData.firstName}
              value={firstName}
              style={
                firstName
                  ? styles.inputTypeStyle
                  : [styles.inputTypeStyle, { fontWeight: "100" }]
              }
              placeholderTextColor={Constant.App.colors.blackColor}
            />
          </View>
          <View style={styles.inputTextFirstNameContainerStyle}>
            <CustomInputText
              autoCapitalize="words"
              onChangeText={(value) => this.setState({ lastName: value })}
              placeholder={lang.addProfileData.lastName}
              value={lastName}
              style={
                lastName
                  ? styles.inputTypeStyle
                  : [styles.inputTypeStyle, { fontWeight: "100" }]
              }
              placeholderTextColor={Constant.App.colors.blackColor}
            />
          </View>
        </View>

        <View style={styles.birthDayContainerStyle}>
          <DatePicker
            placeHolder={lang.addProfileData.yourBirthDay}
            textStyle={styles.birthDayTextStyle}
            onSelection={(date) => {
              this.setState({
                dob: date,
              });
            }}
          />
        </View>

        <View style={styles.stateDropDownContainerStyle}>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => {
              this.setState({ showSelectStateModal: !showSelectStateModal });
            }}
          >
            <CustomText style={styles.stateDropDownTextStyle}>
              {selectedState
                ? selectedState.value
                : lang.addProfileData.stateText}
            </CustomText>
            <Image
              resizeMode="contain"
              source={staticImages.downArrow}
              style={styles.dropDownIconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderPronounsView() {
    const { staticImages } = Constant.App;
    const { pronounsArr } = this.state;

    return (
      <View style={styles.pronounsParentContainerStyle}>
        <CustomText style={styles.pronounsTitleTextStyle}>
          {lang.addProfileData.pronounsTitle}
        </CustomText>
        {pronounsArr.map((item, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => {
              pronounsArr.forEach((element, index) => {
                if (element.selected) {
                  pronounsArr[index].selected = false;
                }
              });
              pronounsArr[key].selected = true;
              this.setState({
                pronounsArr: Object.assign([], [], pronounsArr),
              });
            }}
          >
            <View style={styles.pronounsContainerStyle}>
              <Image
                resizeMode="contain"
                source={
                  item.selected
                    ? staticImages.checkBoxSelectedIcon
                    : staticImages.checkBoxIcon
                }
                style={styles.pronounsChecboxIconStyle}
              />
              <CustomText style={styles.pronounsTextStyle}>
                {item.title}
              </CustomText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  isPronounSelected(pronounsArr) {
    let isSelected = false;
    pronounsArr.forEach((element) => {
      if (element.selected) {
        isSelected = true;
      }
    });
    return isSelected;
  }

  getSelectedPronoun(pronounsArr) {
    let selectedValue = "";
    pronounsArr.forEach((element) => {
      if (element.selected) {
        selectedValue = element.title;
      }
    });
    return selectedValue;
  }

  renderButtonView() {
    const { uploadUserData, showHideErrorModal, navigation } = this.props;
    const {
      firstName,
      lastName,
      imageSrc,
      dob,
      pronounsArr,
      imageUri,
      file,
      filepath,
      selectedState,
    } = this.state;

    return (
      <CustomButton
        buttonStyle={styles.buttonContainerStyle}
        textStyle={styles.buttonTextStyle}
        onPress={() => {
          displayConsole("selectedState", selectedState);
          if (!firstName.trim()) {
            showHideErrorModal(lang.addProfileData.emptyFirstNameMsg);
          } else if (!lastName.trim()) {
            showHideErrorModal(lang.addProfileData.emptyLastNameMsg);
          } else if (!selectedState) {
            showHideErrorModal(lang.addProfileData.emptyStateSelectionMsg);
          } else if (
            pronounsArr.length > 0 &&
            !this.isPronounSelected(pronounsArr)
          ) {
            showHideErrorModal(lang.addProfileData.emptyPronounsMsg);
          } else {
            if (imageSrc) {
              let name = imageUri.substring(
                imageUri.lastIndexOf("/") + 1,
                imageUri.length
              );
              const ext = file.type.split("/").pop(); // Extract image extension
              const filename =
                Platform.OS === "ios"
                  ? `${Math.floor(Date.now())}${name}`
                  : `${Math.floor(Date.now())}${name}.${ext}`;
              const payloadData = {
                userParams: {
                  firstName: firstName.trim(),
                  lastName: lastName.trim(),
                  dob: dob ? dob : "",
                  pronouns: this.getSelectedPronoun(pronounsArr),
                  state: selectedState,
                },
                imageParams: {
                  file: Platform.OS === "ios" ? imageUri : filepath,
                  filename,
                },
                navigation,
              };
              uploadUserData(payloadData);
            } else {
              const payloadData = {
                userParams: {
                  firstName: firstName.trim(),
                  lastName: lastName.trim(),
                  dob: dob ? dob : "",
                  pronouns: this.getSelectedPronoun(pronounsArr),
                  state: selectedState,
                },
                navigation,
              };
              console.log(payloadData);
              uploadUserData(payloadData);
            }
          }
        }}
        text={lang.addProfileData.save}
      />
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
            Linking.openURL(Constant.App.termsAndConditionsUrl);
          }}
        >
          <CustomText style={styles.termsConditionsTextHighlightedStyle}>
            {lang.signUp.termsConditionsText4}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { showSelectStateModal } = this.state;

    return (
      <View style={styles.parentContainerStyle}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainerStyle}>
            {this.renderProfileImageView()}
            {this.renderTitleView()}
            {this.renderInputTextView()}
            {this.renderPronounsView()}
            {this.renderButtonView()}
            {this.renderTermsConditionsView()}
            {showSelectStateModal ? (
              <CustomSelectModal
                data={states}
                onSelection={(item) => {
                  console.log("---onSelection CustomSelectModal---", item);
                  this.setState({
                    selectedState: item,
                    showSelectStateModal: false,
                  });
                }}
                onClose={() => {
                  console.log("---onClose CustomSelectModal---");
                  this.setState({
                    showSelectStateModal: false,
                  });
                }}
              />
            ) : null}
          </View>
        </ScrollView>
        {Platform.OS === "ios" && <KeyboardSpacer />}
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  showHideErrorModal: (value) => dispatch(showOrHideModal(value)),
  uploadUserData: (value) =>
    dispatch(uploadUserDataToFirebase(value, dispatch)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProfileData);
