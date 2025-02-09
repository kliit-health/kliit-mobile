import React, { PureComponent } from "react";
import { View, Alert, BackHandler, AppState } from "react-native";
import { connect } from "react-redux";
import AppNavigator from "./src/navigator";
import { showOrHideModal } from "./src/components/customModal/action";
import CustomLoader from "./src/components/customLoader";
import CustomModal from "./src/components/customModal";
import CustomToast from "./src/components/customToast";
import { getBottomSpace } from "./src/components/iPhoneXHelper";
import firebase from "react-native-firebase";
import {
  setFcmToken,
  setAppState,
  setAppScreen,
} from "./src/screens/authLoading/action";
import { signoutApihit } from "./src/screens/account/action";
import Constant from "./src/utils/constants";
import BackgroundTimer from "react-native-background-timer";
import { updateStatus } from "./src/utils/firebase";
import { NavigationService } from "./src/navigator";

class App extends PureComponent {
  constructor(props) {
    super(props);
    firebase.app();
    this.state = {
      appState: AppState.currentState,
    };
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentDidUpdate() {
    const { isActive, userData } = this.props;
    if (isActive && userData && userData.uid && !userData.isOnline) {
      const updateStatusParams = {
        uid: userData.uid,
        updatedData: {
          isOnline: isActive,
        },
      };
      updateStatus(updateStatusParams);
    } else if (!isActive && userData && userData.uid) {
      const updateStatusParams = {
        uid: userData.uid,
        updatedData: {
          isOnline: isActive,
        },
      };
      updateStatus(updateStatusParams);
    }
    console.log("isActive", isActive);
  }

  componentWillUnmount() {
    firebase.auth().signOut();
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  _handleAppStateChange = (nextAppState) => {
    const { setState, signOut } = this.props;
    console.log("---nextAppState---", nextAppState);
    if (nextAppState === "active") {
      console.log("App has come to the foreground!", nextAppState);
      setState(true);
      console.log("this.timer", this.timer);
      console.log("this.timeoutId", this.timeoutId);
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.timeoutId) {
        BackgroundTimer.clearTimeout(this.timeoutId);
      }
    } else {
      console.log("App has gone to the background!", nextAppState);

      setState(false);

      if (this.timeoutId) {
        BackgroundTimer.clearTimeout(this.timeoutId);
      }

      this.timeoutId = BackgroundTimer.setTimeout(() => {
        console.log("this.timeoutId", this.timeoutId);
        const payload = {
          navigation: this.navigator._navigation,
          isLoaderShow: false,
        };
        signOut(payload);
        Alert.alert(
          "Log Out",
          "For your security, you have been logged out due to 20 minutes of inactivity.",
          [{ text: "OK", onPress: () => {} }],
          { cancelable: false }
        );
      }, Constant.App.logoutInterval);
    }
  };

  handleBackButtonClick() {
    setTimeout(() => {
      Alert.alert(
        "Exit App",
        "Are you sure you want to exit the App?",
        [
          {
            text: "OK",
            onPress: () => {
              BackHandler.exitApp();
            },
          },
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel Pressed");
            },
          },
        ],
        { cancelable: false }
      );
    }, 400);
    return true;
  }

  getCurrentRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
      return this.getCurrentRouteName(route);
    }
    return route.routeName;
  }

  render() {
    const {
      spinnerState,
      errorMessage,
      hideErrorModal,
      showModalError,
      toastState,
      setScreen,
    } = this.props;
    console.log("spinnerState ", spinnerState);
    return (
      <View
        style={{
          flex: 1,
          marginBottom: getBottomSpace(),
        }}
      >
        <AppNavigator
          ref={(nav) => {
            this.navigator = nav;
            NavigationService.navigator = nav;
          }}
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = this.getCurrentRouteName(currentState);
            const prevScreen = this.getCurrentRouteName(prevState);
            console.log("currentScreen", currentScreen);
            console.log("prevScreen", prevScreen);
            const obj = {
              currentScreen,
              prevScreen,
            };
            setScreen(obj);
          }}
        />
        {showModalError ? (
          <CustomModal
            onPressErrorButtonOk={() => hideErrorModal()}
            showLoader={showModalError}
            errorMsg={errorMessage}
          />
        ) : null}

        {spinnerState.showLoader ? (
          <CustomLoader
            showLoader={spinnerState.showLoader}
            textMsg={spinnerState.textMessage}
          />
        ) : null}

        {toastState.showToast ? (
          <CustomToast
            showToast={toastState.showToast}
            textMsg={toastState.textMessage}
            dispatch={toastState.dispatch}
            delay={toastState.delay}
          />
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  spinnerState: state.loaderReducer,
  toastState: state.toastReducer,
  showModalError: state.modalReducer.showModalError,
  errorMessage: state.modalReducer.errorMessage,
  userData: state.authLoadingReducer.userData,
  isActive: state.authLoadingReducer.isActive,
});

const mapDispatchToProps = (dispatch) => ({
  hideErrorModal: () => dispatch(showOrHideModal()),
  setToken: (value) => dispatch(setFcmToken(value)),
  setState: (value) => dispatch(setAppState(value)),
  signOut: (value) => dispatch(signoutApihit(value)),
  setScreen: (value) => dispatch(setAppScreen(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
