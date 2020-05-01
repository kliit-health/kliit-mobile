/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, View } from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import Constant from '../../utils/constants';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getUserData,
  updateStatus,
  setDataTesting,
  addUserData,
  makeid,
} from '../../utils/firebase';
import { displayConsole } from '../../utils/helper';
import { setUserData, setFcmToken } from './action';

let isFirstTime = true;
class AuthLoadingScreen extends Component {
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
      this.initNavigation();
    }
  }

  async getToken() {
    const { setData, userData, setToken, navigation } = this.props;
    console.log('userData ', userData);
    if (!userData) {
      let token = await AsyncStorage.getItem('fcmToken');
      console.log('token', token);
      if (!token) {
        token = await firebase.messaging().getToken();
        if (token) {
          // user has a device token
          setToken(token);
          await AsyncStorage.setItem('fcmToken', token);
        }
      } else {
        await setToken(token);
      }
      this.initNavigation(token);
    } else {
      console.log('setData userData', userData);
      if (userData && userData.profileInfo) {
        setData(userData);
        if (userData.role == 'Expert') {
          navigation.navigate(Constant.App.stack.AppStackExpert);
        } else {
          navigation.navigate(Constant.App.stack.AppStack);
        }
      } else {
        navigation.navigate(Constant.App.screenNames.AddProfileData);
      }
      SplashScreen.close({
        animationType: SplashScreen.animationType.scale,
        duration: 3000,
        delay: 500,
      });
      // setData(userData);
    }
  }

  initNavigation(token) {
    const { navigation, setData, userData } = this.props;
    const user = firebase.auth().currentUser;
    displayConsole('user', user);

    if (user && user.uid) {
      try {
        const obj = {
          tableName: Constant.App.firebaseTableNames.users,
          uid: user.uid,
        };
        const updateStatusParams = {
          uid: user.uid,
          updatedData: {
            fcmToken: token ? token : '',
          },
        };
        updateStatus(updateStatusParams);
        getUserData(
          obj,
          (querySnapshot) => {
            displayConsole('inside getUserData', querySnapshot.data());
            const data = querySnapshot.data();
            if (data) {
              if (!data.referalCode) {
                const updateStatusParams = {
                  uid: data.uid,
                  updatedData: {
                    referalCode: makeid(),
                  },
                };
                updateStatus(updateStatusParams);
              }
            }
            if (!userData && isFirstTime) {
              isFirstTime = false;
              if (data && data.profileInfo) {
                setData(data);
                if (data.role == 'Expert') {
                  navigation.navigate(Constant.App.stack.AppStackExpert);
                } else {
                  navigation.navigate(Constant.App.stack.AppStack);
                }
              } else {
                navigation.navigate(Constant.App.screenNames.AddProfileData);
              }
              SplashScreen.close({
                animationType: SplashScreen.animationType.scale,
                duration: 3000,
                delay: 500,
              });
            } else {
              setData(data);
            }
            displayConsole(
              '--------------**** getUserData end ********-----------\n\n'
            );
          },
          (error) => {
            const { message, code } = error;
            displayConsole('message', message);
            displayConsole('code', code);
            displayConsole(
              '--------------**** getUserData end ********-----------\n\n'
            );
          }
        );
      } catch (error) {
        displayConsole('getUserData  error ', error);
      }
    } else {
      navigation.navigate(Constant.App.stack.AuthStack);
      SplashScreen.close({
        animationType: SplashScreen.animationType.scale,
        duration: 3000,
        delay: 500,
      });
    }
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        console.log('Notification IOS', notification);
        if (Platform.OS === 'ios') {
          notification
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setBody(notification.body)
            .setSound('bell.mp3');
        }
        firebase.notifications().displayNotification(notification);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        console.log('inside onNotificationOpened');
        const { title, body } = notificationOpen.notification;
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      console.log('inside notificationOpen');
      const { title, body } = notificationOpen.notification;
      console.log('title', title);
      console.log('body', body);
      // this.showAlert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log('inside onMessage');
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  componentWillUnmount() {
    // this.notificationListener();
    // this.notificationOpenedListener();
  }

  render() {
    return (
      <View>
        <StatusBar barStyle='default' />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.authLoadingReducer.userData,
  fcmToken: state.authLoadingReducer.fcmToken,
});

const mapDispatchToProps = (dispatch) => ({
  setData: (data) => dispatch(setUserData(data)),
  setToken: (value) => dispatch(setFcmToken(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
