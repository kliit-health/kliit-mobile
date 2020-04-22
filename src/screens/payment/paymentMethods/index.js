import React, { PureComponent } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Language from '../../../utils/localization';
import CustomText from '../../../components/customText';
import { connect } from 'react-redux';
import styles from './style';
import Constant from '../../../utils/constants';
import {
  defaultPaymentMethods,
  PaymentMethodsTypes,
} from '../../../utils/helper/payment';

let lang = Language.en;
class PaymentMethods extends PureComponent {
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
          {lang.paymentMethods.title}
        </CustomText>
      </View>
    );
  }

  renderPaymentMethod(method, index) {
    const { navigation } = this.props;

    return (
      <TouchableOpacity
        key={index}
        style={styles.paymentMethodContainer}
        onPress={() => {
          navigation.goBack();
        }}
        disabled={true}
      >
        <Image
          style={styles.paymentMethodImage}
          resizeMode='contain'
          source={this.getPaymentMethodIcon(method.type)}
        />
        <CustomText style={styles.sectionText}>
          {method.type === PaymentMethodsTypes.card
            ? '···· ' + method.last4Digits
            : method.title}
        </CustomText>
        <View style={styles.expiredContainer}>
          <CustomText style={styles.expiredLabel}>
            {method.isExpired && index === 2 ? 'EXPIRED' : ''}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  }

  getPaymentMethodIcon = (methodType) => {
    const { cardIcon, applePayIcon, payPalIcon } = Constant.App.staticImages;
    switch (methodType) {
      case PaymentMethodsTypes.applePay:
        return applePayIcon;
      case PaymentMethodsTypes.payPal:
        return payPalIcon;
      default:
        return cardIcon;
    }
  };

  renderMyPaymentMethodsView() {
    const paymentMethods = [
      ...defaultPaymentMethods(this.props.isNativePaySupported),
      ...this.props.paymentMethods.map((method) => ({
        ...method,
        type: PaymentMethodsTypes.card,
      })),
    ];

    return (
      <View style={styles.parentContainerStyle}>
        <CustomText style={styles.sectionTitle}>
          {lang.paymentMethods.myPayment}
        </CustomText>
        {paymentMethods.map((item, index) =>
          this.renderPaymentMethod(item, index)
        )}
      </View>
    );
  }

  renderAddPaymentMethodView() {
    const { navigation } = this.props;
    const { staticImages } = Constant.App;

    return (
      <View style={styles.parentContainerStyle}>
        <CustomText style={styles.sectionTitle}>
          {lang.paymentMethods.addPayment}
        </CustomText>
        {/* Add credit card */}
        <TouchableOpacity
          style={styles.paymentMethodContainer}
          onPress={() => {
            navigation.navigate(Constant.App.screenNames.AddCreditOrDebitCard);
          }}
        >
          <Image
            style={styles.plusIcon}
            resizeMode='contain'
            source={staticImages.plusIcon}
          />
          <CustomText style={styles.sectionText}>
            {lang.paymentMethods.addCard}
          </CustomText>
        </TouchableOpacity>
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
          {this.renderMyPaymentMethodsView()}
          {this.renderAddPaymentMethodView()}
        </ScrollView>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  paymentMethods: state.paymentReducer.paymentMethods,
  isNativePaySupported: state.paymentReducer.isNativePaySupported,
});

export default connect(mapStateToProps)(PaymentMethods);
