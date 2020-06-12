import React, { Fragment, PureComponent } from "react";
import { View, TouchableOpacity, Image, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import CustomPicker from "../../components/customPicker";
import { showOrHideModal } from "../../components/customModal/action";
import Constant from "../../utils/constants";
import HealthHistory from "../../utils/constants/healthHistory";

class Lifestyle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      question: 0,
      questions: [
        "Have you been sexually active in the last year?",
        "Have you ever been sexually active?",
        "Do you have sex with males?",
        "In the past 12 months, how many male partners have you had?",
        "Do you have sex with females?",
        "In the past 12 months, how many female partners have you had?",
      ],
      answers: [],
      showMalePartners: false,
      showFemalePartners: false,
      malePartners: null,
      femalePartners: null,
    };
  }

  setPartners = (value, gender) => {
    const { answers } = this.state;
    if (gender === "Male") {
      this.setState({
        answers: [...answers, value],
        malePartners: value,
      });
    }

    if (gender === "Female") {
      this.setState({
        answers: [...answers, value],
        femalePartners: value,
      });
    }
  };

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
        <CustomText style={styles.titleTextStyle}>Lifestyle</CustomText>
        <CustomText style={styles.doneTextStyle}>{}</CustomText>
      </View>
    );
  }

  handleNoClick = (question) => {
    const { answers } = this.state;

    if (question === 1) {
      this.setState({ question: 6, answers: [...answers, "No"] });
    } else if (question === 2 || question == 4) {
      this.setState({
        question: this.state.question + 2,
        answers: [...answers, "No", "0"],
      });
    } else {
      this.setState({
        question: this.state.question + 1,
        answers: [...answers, "No"],
      });
    }
  };

  handleYesClick = (question) => {
    const { answers } = this.state;
    this.setState({
      question: this.state.question + 1,
      answers: [...answers, "Yes"],
    });
  };

  showYesNo() {
    const { question } = this.state;
    if (question === 3 || question === 5 || question === 6) {
      return false;
    } else {
      return true;
    }
  }

  showConfirm() {
    const { question } = this.state;
    if (question === 3 || question === 5 || question === 6) {
      return true;
    } else {
      return false;
    }
  }

  showDropDown() {
    const { question } = this.state;
    if (question === 3 || question === 5) {
      return true;
    } else {
      return false;
    }
  }

  handleConfirm = () => {
    const { question } = this.state;
    if (question < 6) {
      this.setState({
        question: question + 1,
      });
    }
  };

  renderQuestions() {
    const {
      questions,
      question,
      showMalePartners,
      showFemalePartners,
      malePartners,
      femalePartners,
    } = this.state;

    const { staticImages } = Constant.App;

    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{questions[question]}</Text>
        {this.showYesNo() && (
          <Fragment>
            <CustomButton
              buttonStyle={styles.buttonContainerStyle}
              textStyle={styles.buttonTextStyle}
              onPress={() => {
                this.handleYesClick(question);
              }}
              text="Yes"
            />
            <CustomButton
              buttonStyle={styles.buttonContainerStyle}
              textStyle={styles.buttonTextStyle}
              onPress={() => {
                this.handleNoClick(question);
              }}
              text="No"
            />
          </Fragment>
        )}

        <View style={styles.inputTextParentContainerStyle}>
          {this.showDropDown() && (
            <View style={styles.inputTextContainerStyle}>
              <View style={styles.dropDownContainerStyle}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    if (question === 3) {
                      this.setState({
                        showMalePartners: !showMalePartners,
                      });
                    } else {
                      this.setState({
                        showFemalePartners: !showFemalePartners,
                      });
                    }
                  }}
                >
                  <CustomText style={styles.dropDownTextStyle}>
                    {question === 3
                      ? malePartners || "Male Partners"
                      : femalePartners || "Female Partners"}
                  </CustomText>
                  <Image
                    resizeMode="contain"
                    source={staticImages.downArrow}
                    style={styles.dropDownIconStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {this.showConfirm() && (
            <CustomButton
              buttonStyle={styles.buttonContainerStyle}
              textStyle={styles.buttonTextStyle}
              onPress={this.handleConfirm}
              text="Confirm"
            />
          )}
        </View>
        {showMalePartners ? (
          <CustomPicker
            show={true}
            title={"Male Partners"}
            pickerText={"Save"}
            data={HealthHistory.BasicInfo.weight}
            setValue={(value) => this.setPartners(value, "Male")}
          />
        ) : null}
        {showFemalePartners ? (
          <CustomPicker
            show={true}
            title={"Female Partners"}
            pickerText={"Save"}
            data={HealthHistory.BasicInfo.weight}
            setValue={(value) => this.setPartners(value, "Female")}
          />
        ) : null}
      </ScrollView>
    );
  }

  renderReview = () => {
    console.log(this.state);
    const { question, questions, answers } = this.state;
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Review</Text>
        {answers.map((item, i) => (
          <View key={questions[i]} style={styles.questionContainer}>
            <Text style={styles.question}>{questions[i]}</Text>
            <Text style={styles.answer}>{answers[i]}</Text>
          </View>
        ))}
        <CustomButton
          buttonStyle={styles.buttonContainerStyle}
          textStyle={styles.buttonTextStyle}
          onPress={() =>
            this.setState({
              question: 0,
              answers: [],
              showMalePartners: false,
              showFemalePartners: false,
              malePartners: null,
              femalePartners: null,
            })
          }
          text="Edit"
        />
        <CustomButton
          buttonStyle={styles.buttonContainerStyle}
          textStyle={styles.buttonTextStyle}
          onPress={this.handleConfirm}
          text="Save"
        />
      </ScrollView>
    );
  };

  render() {
    const shouldShowReview = this.state.question === 6;

    return (
      <View style={styles.container}>
        {this.renderHeaderView()}
        {shouldShowReview ? this.renderReview() : this.renderQuestions()}
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
)(Lifestyle);
