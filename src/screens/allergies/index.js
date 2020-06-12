import React, { Fragment, PureComponent } from "react";
import { View, TouchableOpacity, Image, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import CustomText from "../../components/customText";
import CustomButton from "../../components/customButton";
import { showOrHideModal } from "../../components/customModal/action";
import Constant from "../../utils/constants";

class Allergies extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      question: 0,
      questions: [
        "Do you have any medication allergies?",
        "Medication allergies",
        "Do you have any food allergies?",
        "Food Allergies",
      ],
      answers: [],
      medAllergies: [
        {
          title: "Asprin",
          selected: false,
        },
        {
          title: "Codeine",
          selected: false,
        },
        {
          title: "Erythromycin, Biaxin, Zithromax",
          selected: false,
        },
        {
          title: "NSAIDS (ie: Advil, Motrin)",
          selected: false,
        },
        {
          title:
            "Penicillins  (ie: Amoxil, amoxicillin, ampicillin, Keflex, cephalexin)",
          selected: false,
        },
        {
          title: "Sulfa drugs (ie: Septra®, Bactrim®, TMP/SMX) ",
          selected: false,
        },
        {
          title: "Tetracycline antibiotics ",
          selected: false,
        },
      ],
      foodAllergies: [
        {
          title: "Shellfish",
          selected: false,
        },
        {
          title: "Wheat",
          selected: false,
        },
        {
          title: "Soy",
          selected: false,
        },
        {
          title: "Nuts",
          selected: false,
        },
        {
          title: "Dairy",
          selected: false,
        },
        {
          title: "Eggs",
          selected: false,
        },
        {
          title: "Other",
          selected: false,
        },
      ],
      medinceList: [],
      foodList: [],
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
        <CustomText style={styles.titleTextStyle}>Allergies</CustomText>
        <CustomText style={styles.doneTextStyle}>{}</CustomText>
      </View>
    );
  }

  handleNoClick = (question) => {
    const { answers } = this.state;

    this.setState({
      question: this.state.question + 2,
      answers: [...answers, "No", "None"],
    });
  };

  handleYesClick = (question) => {
    const { answers } = this.state;
    this.setState({
      question: this.state.question + 1,
      answers: [...answers, "Yes", ""],
    });
  };

  showYesNo() {
    const { question } = this.state;
    if (question === 0 || question === 2) {
      return true;
    } else {
      return false;
    }
  }

  showConfirm() {
    const { question } = this.state;
    if (question === 4) {
      return true;
    } else {
      return false;
    }
  }

  showAllergies = () => {
    const { question } = this.state;
    if (question === 1 || question === 3) {
      return true;
    } else {
      return false;
    }
  };

  handleConfirm = () => {
    const { question } = this.state;
    this.setState({
      question: question + 1,
    });
  };

  gatherAllergies = (allergies) => {
    const { question } = this.state;
    const allergyList = question === 1 ? "medinceList" : "foodList";
    const allergiesList = [];
    allergies.forEach((item) => {
      if (item.selected) {
        allergiesList.push(item.title);
      }
    });
    this.setState({ [allergyList]: allergiesList });
  };

  renderAllergiesView() {
    const { staticImages } = Constant.App;
    const { question, medAllergies, foodAllergies } = this.state;
    const allergies = question === 1 ? medAllergies : foodAllergies;

    return (
      <View style={styles.allergiesParentContainerStyle}>
        <CustomText style={styles.allergiesTitleTextStyle}>
          Check all that apply:
        </CustomText>
        {allergies.map((item, key) => (
          <TouchableOpacity
            key={key}
            onPress={(e) => {
              allergies[key].selected = !allergies[key].selected;
              this.setState({
                medAllergies: Object.assign([], [], allergies),
              });
            }}
          >
            <View style={styles.allergiesContainerStyle}>
              <Image
                resizeMode="contain"
                source={
                  item.selected
                    ? staticImages.checkBoxSelectedIcon
                    : staticImages.checkBoxIcon
                }
                style={styles.allergiesChecboxIconStyle}
              />
              <CustomText style={styles.allergiesTextStyle}>
                {item.title}
              </CustomText>
            </View>
          </TouchableOpacity>
        ))}
        <CustomButton
          buttonStyle={styles.buttonContainerStyle}
          textStyle={styles.buttonTextStyle}
          onPress={() => {
            this.gatherAllergies(allergies);
            this.handleConfirm();
          }}
          text="Confirm"
        />
      </View>
    );
  }

  renderQuestions() {
    const { questions, question } = this.state;

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
        {this.showAllergies() ? this.renderAllergiesView() : null}
        <View style={styles.inputTextParentContainerStyle}>
          {this.showConfirm() && (
            <CustomButton
              buttonStyle={styles.buttonContainerStyle}
              textStyle={styles.buttonTextStyle}
              onPress={this.handleConfirm}
              text="Confirm"
            />
          )}
        </View>
      </ScrollView>
    );
  }

  renderReview = () => {
    const { medinceList, foodList, question, questions, answers } = this.state;
    const allergies = [[], medinceList, [], foodList];

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
            {allergies[i].map((item) => {
              return (
                <Text key={item} style={styles.allery}>
                  {item}
                </Text>
              );
            })}
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
    const shouldShowReview = this.state.question === 4;

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
)(Allergies);
