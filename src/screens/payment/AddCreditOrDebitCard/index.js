import React from 'react';
import { View, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import Language from '../../../utils/localization';
import CustomText from '../../../components/customText';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import styles from './style';
import Constant from '../../../utils/constants';
import CustomInputText from '../../../components/customInputText';
import CustomButton from '../../../components/customButton';
import { createPaymentCard } from '../action';

let lang = Language.en;
class AddCreditOrDebitCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      securityCode: '',
      firstName: '',
      lastName: '',
      expireDate: '',
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
            style={styles.crossBottom}
            resizeMode='contain'
            source={staticImages.crossIcon}
          />
        </TouchableOpacity>

        <CustomText style={styles.titleTextStyle}>
          {lang.addCreditOrDebitCard.title}
        </CustomText>
      </View>
    );
  }
  renderInputTextView() {
    const { firstName, lastName, cardNumber, securityCode, expireDate } = this.state;

    return (
      <View style={styles.parentContainerStyle}>
        <View style={styles.inputTextMargin}>
          <CustomInputText
            autoCapitalize='words'
            onChangeText={value => this.setState({ cardNumber: value })}
            placeholder={lang.addCreditCardData.cardNumber}
            value={cardNumber}
            style={
              cardNumber
                ? styles.inputTypeStyle
                : [styles.inputTypeStyle, { fontWeight: '100' }]
            }
            placeholderTextColor={Constant.App.colors.blackColor}
          />
        </View>
        <View style={styles.inputTextContainerStyle}>
          <View>
            <CustomInputText
              maxLength={5}
              keyboardType={'number-pad'}
              autoCapitalize='words'
              onChangeText={value => {
                var formatted = value;
                if (value.length == 2) {
                  if (this.state.expireDate.indexOf('/') == -1) {
                    formatted = value + '/';
                  } else {
                    formatted = value;
                  }
                }
                this.setState({ expireDate: formatted });
              }}
              placeholder={lang.addCreditCardData.expireDate}
              value={expireDate}
              style={
                (expireDate
                  ? styles.inputTypeStyle
                  : [styles.inputTypeStyle, { fontWeight: '100' }],
                styles.expireDateWidh)
              }
              placeholderTextColor={Constant.App.colors.blackColor}
            />
          </View>
          <View>
            <CustomInputText
              maxLength={3}
              autoCapitalize='words'
              onChangeText={value => this.setState({ securityCode: value })}
              placeholder={lang.addCreditCardData.securityCode}
              value={securityCode}
              style={
                (securityCode
                  ? styles.inputTypeStyle
                  : [styles.inputTypeStyle, { fontWeight: '100' }],
                styles.securityCodeWidth)
              }
              placeholderTextColor={Constant.App.colors.blackColor}
            />
          </View>
        </View>

        <View style={styles.inputTextMargin}>
          <CustomInputText
            autoCapitalize='words'
            onChangeText={value => this.setState({ firstName: value })}
            placeholder={lang.addCreditCardData.firstName}
            value={firstName}
            style={
              firstName
                ? styles.inputTypeStyle
                : [styles.inputTypeStyle, { fontWeight: '100' }]
            }
            placeholderTextColor={Constant.App.colors.blackColor}
          />
        </View>
        <View style={styles.inputTextMargin}>
          <CustomInputText
            autoCapitalize='words'
            onChangeText={value => this.setState({ lastName: value })}
            placeholder={lang.addCreditCardData.lastName}
            value={lastName}
            style={
              lastName
                ? styles.inputTypeStyle
                : [styles.inputTypeStyle, { fontWeight: '100' }]
            }
            placeholderTextColor={Constant.App.colors.blackColor}
          />
        </View>
      </View>
    );
  }
  renderButtonView() {
    const { paymentCard, navigation } = this.props;
    const { firstName, lastName, cardNumber, securityCode, expireDate } = this.state;
    return (
      <View style={styles.parentContainerStyle}>
        <CustomButton
          buttonStyle={styles.buttonContainerStyle}
          textStyle={styles.buttonTextStyle}
          onPress={() => {
            var exp_date = expireDate.trim().split('/');
            const data = {
              params: {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                card_number: cardNumber.trim(),
                cvc: securityCode.trim(),
                exp_month: exp_date[0],
                exp_year: exp_date[1],
              },
              navigation,
            };
            paymentCard(data);
          }}
          text={lang.addCreditCardData.saveCard}
        />
      </View>
    );
  }
  renderFooter() {
    const { staticImages } = Constant.App;
    return (
      <View style={styles.parentContainerStyle}>
        <Image
          style={styles.lockImage}
          resizeMode='contain'
          source={staticImages.lockIcon}
        />
        <CustomText style={styles.footerTextStyle}>
          {lang.addCreditOrDebitCard.footer}
        </CustomText>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderHeaderView()}
        <ScrollView
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
        >
          {this.renderInputTextView()}
          {this.renderButtonView()}
          {this.renderFooter()}
        </ScrollView>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  paymentCard: value => dispatch(createPaymentCard(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddCreditOrDebitCard);
