import React from 'react';
import {
  View,
  ScrollView,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import CustomText from '../../components/customText';
import styles from './style';
import Constant from '../../utils/constants';
import Language from '../../utils/localization';
import CustomButton from '../../components/customButton';

let lang = Language['en'];
class GetStarted extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isUser: true,
    };
  }

  renderLogoView() {
    const { staticImages } = Constant.App;
    return (
      <Image resizeMode="contain" source={staticImages.loginLogoImage} style={styles.logoStyle} />
    )
  }

  renderTitleView() {
    const { userData } = this.props;
    return (
      <View style={styles.titleContainer}>
        <CustomText style={styles.titleTextStyle}>
          {`${lang.getStarted.title}${userData.profileInfo.firstName} ${userData.profileInfo.lastName}`}
        </CustomText>
        <CustomText style={styles.subTitleTextStyle}>
          {lang.getStarted.content}
        </CustomText>
      </View>
    )
  }

  renderButtonView() {
    const { navigation } = this.props;
    return (
      <CustomButton
        buttonStyle={styles.buttonContainerStyle}
        textStyle={styles.buttonTextStyle}
        onPress={() => {
          navigation.navigate(Constant.App.stack.AppStack);
        }}
        text={lang.getStarted.btnText}
      />
    )
  }

  render() {
    return (
      <View style={styles.parentContainerStyle}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainerStyle}>
            {this.renderLogoView()}
            {this.renderTitleView()}
            {this.renderButtonView()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authLoadingReducer.userData,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GetStarted);
