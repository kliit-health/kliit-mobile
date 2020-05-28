import React, { PureComponent } from "react";
import { View, TouchableOpacity, Image, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import { showOrHideModal } from "../../components/customModal/action";
import Constant from "../../utils/constants";

class Birth extends PureComponent {
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
          I Have Given Birth
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
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.content}>
              Our experts are here to help with your new parenting needs,
              including lactation consultation and mental health support.
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
)(Birth);
