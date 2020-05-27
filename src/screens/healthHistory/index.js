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
// import { signoutApihit } from "./action";
import Constant from "../../utils/constants";
import { Avatar } from "react-native-elements";

let lang = Language["en"];
class HealthHistory extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderHeaderView() {
    const { navigation } = this.props;
    const { staticImages } = Constant.App;
    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            style={{
              width: 20,
              height: 40,
              transform: [{ rotate: "180deg" }],
            }}
            resizeMode="contain"
            source={staticImages.rightChevronIcon}
          />
        </TouchableOpacity>
        <CustomText style={styles.titleTextStyle}>My Health History</CustomText>
        <CustomText style={styles.doneTextStyle}>{}</CustomText>
      </View>
    );
  }

  render() {
    const { navigation, signOut, userData } = this.props;
    const { staticImages } = Constant.App;
    return (
      userData && (
        <View style={styles.container}>
          {this.renderHeaderView()}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={styles.itemsParentContainerStyle}
              onPress={() => {
                navigation.navigate(Constant.App.screenNames.BasicInfo);
              }}
            >
              <CustomText style={styles.itemTextStyle}>
                {lang.healthHistory.basicInfo}
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
                navigation.navigate(
                  Constant.App.screenNames.PregnancyAndChildren
                );
              }}
            >
              <CustomText style={styles.itemTextStyle}>
                {lang.healthHistory.pregnancy}
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
                navigation.navigate(Constant.App.screenNames.LifeStyle);
              }}
            >
              <CustomText style={styles.itemTextStyle}>
                {lang.healthHistory.lifestyle}
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
                navigation.navigate(Constant.App.screenNames.Allergies);
              }}
            >
              <CustomText style={styles.itemTextStyle}>
                {lang.healthHistory.allergies}
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
                navigation.navigate(Constant.App.screenNames.Medications);
              }}
            >
              <CustomText style={styles.itemTextStyle}>
                {lang.healthHistory.medications}
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
                navigation.navigate(Constant.App.screenNames.MedicalHistory);
              }}
            >
              <CustomText style={styles.itemTextStyle}>
                {lang.healthHistory.medicalHistory}
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
                navigation.navigate(Constant.App.screenNames.Insurance);
              }}
            >
              <CustomText style={styles.itemTextStyle}>
                {lang.healthHistory.insurance}
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
                navigation.navigate(
                  Constant.App.screenNames.PrevAppointmentNotes
                );
              }}
            >
              <CustomText style={styles.itemTextStyle}>
                {lang.healthHistory.notes}
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
)(HealthHistory);
