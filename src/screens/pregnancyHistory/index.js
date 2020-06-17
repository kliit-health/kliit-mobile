import React, { PureComponent } from "react";
import { View, TouchableOpacity, Image, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import RadioButtonRN from "../../components/horizontalRadioButton";
import { updatePregnancyHistory } from "./action";
import Constant from "../../utils/constants";

class PregnancyHistory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allPregnancy: "",
      fullTerm: "",
      premature: "",
      abortions: "",
      miscarriages: "",
      data: [
        {
          label: "0",
        },
        {
          label: "1",
        },
        {
          label: "2",
        },
        {
          label: "3+",
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
        <CustomText style={styles.titleTextStyle}>Pregnancy History</CustomText>
        <CustomText style={styles.doneTextStyle}>{}</CustomText>
      </View>
    );
  }

  render() {
    const {
      allPregnancy,
      fullTerm,
      premature,
      abortions,
      miscarriages,
      data,
    } = this.state;

    const { updatePregnancyHistory, navigation, userData } = this.props;

    const payloadData = {
      pregnancyHistoryParams: {
        uid: userData.uid,
        pregnancyHistory: {
          allPregnancy,
          fullTerm,
          premature,
          abortions,
          miscarriages,
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
            <Text style={styles.question}>
              How many times have you been pregnant
            </Text>
            <Text style={styles.question}>
              (including miscarriages and abortions)?
            </Text>
          </View>
          <RadioButtonRN
            box={false}
            textColor={Constant.App.colors.greyColorText}
            textStyle={{ fontSize: 14 }}
            data={data}
            selectedBtn={(option) =>
              this.setState({ allPregnancy: option.label })
            }
          />

          <View style={styles.questionContainer}>
            <Text style={styles.question}>
              How many full-term babies have you had
            </Text>
            <Text style={styles.question}>(37+ weeks)?</Text>
          </View>
          <RadioButtonRN
            box={false}
            textColor={Constant.App.colors.greyColorText}
            textStyle={{ fontSize: 14 }}
            data={data}
            selectedBtn={(option) => this.setState({ fullTerm: option.label })}
          />
          <View style={styles.questionContainer}>
            <Text style={styles.question}>
              How many premature babies have you had
            </Text>
            <Text style={styles.question}>(20-36 weeks)?</Text>
          </View>
          <RadioButtonRN
            box={false}
            textColor={Constant.App.colors.greyColorText}
            textStyle={{ fontSize: 14 }}
            data={data}
            selectedBtn={(option) => this.setState({ premature: option.label })}
          />
          <View style={styles.questionContainer}>
            <Text style={styles.question}>
              How many abortions have you had?
            </Text>
          </View>
          <RadioButtonRN
            box={false}
            textColor={Constant.App.colors.greyColorText}
            textStyle={{ fontSize: 14 }}
            data={data}
            selectedBtn={(option) => this.setState({ abortions: option.label })}
          />
          <View style={styles.questionContainer}>
            <Text style={styles.question}>
              How many miscarriages have you had?
            </Text>
          </View>
          <RadioButtonRN
            box={false}
            textColor={Constant.App.colors.greyColorText}
            textStyle={{ fontSize: 14 }}
            data={data}
            selectedBtn={(option) =>
              this.setState({ miscarriages: option.label })
            }
          />
          <CustomButton
            buttonStyle={styles.buttonContainerStyle}
            textStyle={styles.buttonTextStyle}
            onPress={() => {
              updatePregnancyHistory(payloadData);
            }}
            text="Save My Pregnancy History"
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
  updatePregnancyHistory: (value) => dispatch(updatePregnancyHistory(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PregnancyHistory);
