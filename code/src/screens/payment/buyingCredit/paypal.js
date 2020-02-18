import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import { capturePayment } from '../action';
class PayPalCheckout extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _onNavigationStateChange = webViewState => {
    console.log('_onNavigationStateChange ', webViewState.url);
    if (webViewState.url.includes('https://example.com/success')) {
      this.props.capturePayment(this.props.captureURL);
      this.props.navigation.goBack();
    } else if (webViewState.url.includes('https://example.com/fail')) {
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <WebView
          style={{ height: 400, width: 300 }}
          source={{ uri: this.props.approvalUrl }}
          onNavigationStateChange={this._onNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          style={{ marginTop: 50 }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  approvalUrl: state.paymentReducer.orderData.approvalUrl,
  captureURL: state.paymentReducer.orderData.capturePaymentURL,
});

const mapDispatchToProps = dispatch => ({
  capturePayment: captureURL => dispatch(capturePayment(captureURL)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PayPalCheckout);
