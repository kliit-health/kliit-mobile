import React, { PureComponent } from "react";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import CustomText from "../../components/customText";
import Language from "../../utils/localization";
import { showOrHideModal } from "../../components/customModal/action";
import Constant from "../../utils/constants";

let lang = Language["en"];
class CurrentPregnancy extends PureComponent {
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
        <CustomText style={styles.titleTextStyle}>Current Pregnancy</CustomText>
        <CustomText style={styles.doneTextStyle}>{}</CustomText>
      </View>
    );
  }

  render() {
    const { navigation, userData } = this.props;
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
                {lang.pregnancy.adjustDueDate}
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
                navigation.navigate(Constant.App.screenNames.Birth);
              }}
            >
              <CustomText style={styles.itemTextStyle}>
                {lang.pregnancy.birth}
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
              <CustomText style={styles.itemTextStyle}>
                {lang.pregnancy.loss}
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
)(CurrentPregnancy);
