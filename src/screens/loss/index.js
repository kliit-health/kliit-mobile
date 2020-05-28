import React, { PureComponent } from "react";
import { View, TouchableOpacity, Image, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import { showOrHideModal } from "../../components/customModal/action";
import Constant from "../../utils/constants";

class Loss extends PureComponent {
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
          I Have Experienced a Loss
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
            <Text style={styles.title}>We're so sorry to hear this.</Text>
            <Text style={styles.content}>
              Many folks experience this. You are not alone.
            </Text>
            <Text style={styles.content}>
              Kliit's network of experts is available to support you through
              this difficult time.
            </Text>
            <CustomButton
              buttonStyle={styles.buttonContainerStyle}
              textStyle={styles.buttonTextStyle}
              onPress={() => {
                console.log("");
              }}
              text="Confirm"
            />
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
)(Loss);
