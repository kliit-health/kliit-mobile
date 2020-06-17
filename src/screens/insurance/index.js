import React, { PureComponent } from "react";
import { View, TouchableOpacity, Image, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import RadioButtonRN from "../../components/verticalRadioButton";
import Language from "../../utils/localization";
import Constant from "../../utils/constants";
import { updateInsurance } from "./action";

let lang = Language["en"];
class Insurance extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      insurance: "",
      providers: [
        {
          label: "Aetna Health",
        },
        {
          label: "Blue Cross / Blue Shield",
        },
        {
          label: "Cigna",
        },
        {
          label: "Humana",
        },
        {
          label: "Kaiser",
        },
        {
          label: "United Health",
        },
        {
          label: "WellPoint",
        },
        {
          label: "Other",
        },
      ],
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
        <CustomText style={styles.titleTextStyle}>Insurance</CustomText>
        <CustomText style={styles.doneTextStyle}>{}</CustomText>
      </View>
    );
  }

  render() {
    const { navigation, updateInsurance, userData } = this.props;
    const { insurance, providers } = this.state;

    const payloadData = {
      InsuranceParams: {
        uid: userData.uid,
        insurance: {
          provider: insurance,
        },
      },
      navigation,
    };

    return (
      <View style={styles.container}>
        {this.renderHeaderView()}
        <ScrollView
          style={{ marginTop: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.questionContainer}>
            <Text style={styles.title}>What insurance do you have?</Text>
          </View>
          <RadioButtonRN
            box={false}
            textColor={Constant.App.colors.greyColorText}
            textStyle={{ fontSize: 14 }}
            data={providers}
            selectedBtn={(provider) =>
              this.setState({ insurance: provider.label })
            }
          />
          <CustomButton
            buttonStyle={styles.buttonContainerStyle}
            textStyle={styles.buttonTextStyle}
            onPress={() => updateInsurance(payloadData)}
            text="Save"
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.authLoadingReducer.userData,
});

const mapDispatchToProps = (dispatch) => ({
  updateInsurance: (value) => dispatch(updateInsurance(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Insurance);
