import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import { capturePayment } from '../action';
class PayPalCheckout extends React.PureComponent {
  _onNavigationStateChange = webViewState => {
    console.log('_onNavigationStateChange ', webViewState.url);
    if (webViewState.url.includes('https://example.com/success')) {
      const { captureURL, credits, navigation } = this.props;
      this.props.capturePayment(captureURL, credits, navigation);
      navigation.goBack();
    } else if (webViewState.url.includes('https://example.com/fail')) {
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <WebView
          style={{ marginTop: 50 }}
          source={{ uri: this.props.approvalUrl }}
          onNavigationStateChange={this._onNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  approvalUrl: state.paymentReducer.orderData.approvalUrl,
  captureURL: state.paymentReducer.orderData.capturePaymentURL,
  credits: state.paymentReducer.orderData.credits,
  userData: state.authLoadingReducer.userData,
});

const mapDispatchToProps = dispatch => ({
  capturePayment: (captureURL, credits, navigation) => dispatch(capturePayment(captureURL, credits, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PayPalCheckout);
