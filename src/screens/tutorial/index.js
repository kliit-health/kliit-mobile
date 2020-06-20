import React, { PureComponent, Fragment } from "react";
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import Constant from "../../utils/constants";
import CustomButton from "../../components/customButton";
import Language from "../../utils/localization";
import Carousel from "react-native-banner-carousel";
let banner = [
  {
    id: 1,
    image: Constant.App.staticImages.tutorialImageOne,
  },
  {
    id: 2,
    image: Constant.App.staticImages.tutorialImageTwo,
  },
  {
    id: 3,
    image: Constant.App.staticImages.tutorialImageThree,
  },
];

let titles = ["Crystal", "I need", "some text"];
let lang = Language["en"];
class Tutorial extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderSliderView() {
    return (
      <View style={styles.sliderViewStyle}>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={Dimensions.get("window").width}
          activePageIndicatorStyle={{
            backgroundColor: Constant.App.colors.blueColor,
          }}
        >
          {banner.map((item, key) => (
            <View key={key}>
              <ImageBackground
                resizeMode={"contain"}
                source={item.image}
                style={styles.bannerImageStyle}
              >
                <View style={styles.bannerTextView}>
                  <Text style={styles.bannerTextView}>{titles[key]}</Text>
                </View>
              </ImageBackground>
              <Image
                resizeMode={"contain"}
                source={Constant.App.staticImages.logoHorizontal}
                style={styles.logoImageStyle}
              />
            </View>
          ))}
        </Carousel>
      </View>
    );
  }

  renderButtonView() {
    const { navigation } = this.props;
    return (
      <View style={styles.buttonContainerStyle}>
        <CustomButton
          text={lang.tutorial.signUp}
          textStyle={styles.signupButtonTextStyle}
          buttonStyle={styles.signupButtonStyle}
          onPress={() => navigation.navigate(Constant.App.screenNames.SignUp)}
        />
        <CustomButton
          text={lang.tutorial.login}
          textStyle={styles.loginButtonTextStyle}
          buttonStyle={styles.loginButtonStyle}
          onPress={() => navigation.navigate(Constant.App.screenNames.Login)}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {this.renderSliderView()}
          {this.renderButtonView()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tutorial);
