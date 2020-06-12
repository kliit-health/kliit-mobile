import React, { PureComponent } from "react";
import { View, TouchableOpacity, Image, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import CustomText from "../../components/customText";
import { showOrHideModal } from "../../components/customModal/action";
import Constant from "../../utils/constants";

class PregnancyCurrent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dob: "",
      gender: "",
      showSelectHeight: false,
      showSelectWeight: false,
      weight: null,
      height: null,
    };
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
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {this.renderHeaderView()}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inputTextParentContainerStyle}>
            <View style={styles.inputTextContainerStyle}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(Constant.App.screenNames.DueDate);
                }}
              >
                <View style={styles.dropDownContainerStyle}>
                  <Text>Add New Pregnancy</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PregnancyCurrent);
