import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
} from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import RadioButtonRN from "../../components/radioButton";
import Language from "../../utils/localization";
import { showOrHideModal } from "../../components/customModal/action";
import Constant from "../../utils/constants";

let lang = Language["en"];
class PregnancyHistory extends PureComponent {
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
        <CustomText style={styles.titleTextStyle}>Pregnancy History</CustomText>
        <CustomText style={styles.doneTextStyle}>{}</CustomText>
      </View>
    );
  }

  render() {
    const { navigation, signOut, userData } = this.props;
    const { staticImages } = Constant.App;
    const data = [
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
    ];
    return (
      userData && (
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
              textColor="darkGrey"
              textStyle={{ fontSize: 14 }}
              data={data}
              selectedBtn={(e) => console.log(e)}
            />

            <View style={styles.questionContainer}>
              <Text style={styles.question}>
                How many full-term babies have you had
              </Text>
              <Text style={styles.question}>(37+ weeks)?</Text>
            </View>
            <RadioButtonRN
              box={false}
              textColor="darkGrey"
              textStyle={{ fontSize: 14 }}
              data={data}
              selectedBtn={(e) => console.log(e)}
            />
            <View style={styles.questionContainer}>
              <Text style={styles.question}>
                How many premature babies have you had
              </Text>
              <Text style={styles.question}>(20-36 weeks)?</Text>
            </View>
            <RadioButtonRN
              box={false}
              textColor="darkGrey"
              textStyle={{ fontSize: 14 }}
              data={data}
              selectedBtn={(e) => console.log(e)}
            />
            <View style={styles.questionContainer}>
              <Text style={styles.question}>
                How many abortions have you had?
              </Text>
            </View>
            <RadioButtonRN
              box={false}
              textColor="darkGrey"
              textStyle={{ fontSize: 14 }}
              data={data}
              selectedBtn={(e) => console.log(e)}
            />
            <View style={styles.questionContainer}>
              <Text style={styles.question}>
                How many miscarriages have you had?
              </Text>
            </View>
            <RadioButtonRN
              box={false}
              textColor="darkGrey"
              textStyle={{ fontSize: 14 }}
              data={data}
              selectedBtn={(e) => console.log(e)}
            />
            <CustomButton
              buttonStyle={styles.buttonContainerStyle}
              textStyle={styles.buttonTextStyle}
              onPress={() => {
                console.log("");
              }}
              text="Save My Pregnancy History"
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
)(PregnancyHistory);
