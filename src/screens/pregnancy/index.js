import React, { PureComponent } from "react";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import styles, { AVATAR_SIZE } from "./style";
import CustomText from "../../components/customText";
import Language from "../../utils/localization";
import { showOrHideModal } from "../../components/customModal/action";
import Constant from "../../utils/constants";

let lang = Language["en"];
class Pregnancy extends PureComponent {
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
        <CustomText style={styles.titleTextStyle}>
          Pregnancy and Children
        </CustomText>
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
                navigation.navigate(Constant.App.screenNames.PregnancyHistory);
              }}
            >
              <CustomText style={styles.itemTextStyle}>
                {lang.pregnancy.pregnancyHistory}
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
                {lang.pregnancy.currentPregnancy}
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
                {lang.pregnancy.children}
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
                navigation.navigate(Constant.App.screenNames.Loss);
              }}
            >
              <CustomText style={styles.itemTextStyle}>Loss</CustomText>
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
                navigation.navigate(Constant.App.screenNames.Birth);
              }}
            >
              <CustomText style={styles.itemTextStyle}>Birth</CustomText>
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
)(Pregnancy);
