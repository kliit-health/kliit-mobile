import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import NavigationService from "./navigationService";
import { Image, View } from "react-native";

import Account from "../screens/account";
import AccountExpert from "../screens/account/expert";
import AddChild from "../screens/addChild";
import AddCreditOrDebitCard from "../screens/payment/AddCreditOrDebitCard";
import AddProfileData from "../screens/addProfileData";
import Allergies from "../screens/allergies";
import Appointments from "../screens/appointments/";
import Ask from "../screens/ask";
import AskExpert from "../screens/ask/expert";
import AuthLoadingScreen from "../screens/authLoading";
import BasicInfo from "../screens/basicInfo";
import Birth from "../screens/birth";
import BuyingCredit from "../screens/payment/buyingCredit";
import ChangePassword from "../screens/changePassword";
import ChangePasswordExpert from "../screens/changePassword/expert";
import Chat from "../screens/chat";
import ChatExpert from "../screens/chat/expert";
import Children from "../screens/children";
import ChooseExpert from "../screens/chooseExpert";
import Constant from "../utils/constants";
import CurrentPregnancy from "../screens/pregnancyCurrent";
import CustomText from "../components/customText";
import DueDate from "../screens/dueDate";
import ExpertProfile from "../screens/expertProfile";
import ForgotPassword from "../screens/forgotPassword";
import GetStarted from "../screens/getStarted";
import HealthHistory from "../screens/healthHistory/";
import Insurance from "../screens/insurance";
import Language from "../utils/localization";
import Learn from "../screens/learn";
import Lifestyle from "../screens/lifestyle";
import Loss from "../screens/loss";
import Login from "../screens/login";
import Medications from "../screens/medications";
import MedicalHistory from "../screens/medicalHistory";
import PaymentMethods from "../screens/payment/paymentMethods";
import PayPalApproval from "../screens/payment/buyingCredit/paypal";
import Pregnancy from "../screens/pregnancy";
import PregnancyHistory from "../screens/pregnancyHistory";
import PrevAppointmentNotes from "../screens/prevAppointmentsNotes";
import ReferFriend from "../screens/referFriend";
import SignUp from "../screens/signUp";
import Setting from "../screens/setting";
import SettingExpert from "../screens/setting/expert";
import Tutorial from "../screens/tutorial";

let lang = Language.en;
let tabIconSize = 25;
const screenNames = Constant.App.screenNames;

const TransparentStyle = {
  transparentCard: true,
  cardStyle: {
    opacity: 1,
  },
  transitionConfig: () => ({
    containerStyle: {
      backgroundColor: "transparent",
    },
  }),
};

const AuthStack = createStackNavigator(
  {
    Tutorial: { screen: Tutorial },
    Login: { screen: Login },
    ForgotPassword: { screen: ForgotPassword },
    SignUp: { screen: SignUp },
    AddProfileData: { screen: AddProfileData },
    GetStarted: { screen: GetStarted },
  },
  {
    headerMode: "none",
    initialRouteName: "Tutorial",
  }
);

const PaymentStack = createStackNavigator(
  {
    [screenNames.BuyingCredit]: { screen: BuyingCredit },
  },
  {
    mode: "modal",
    headerMode: "none",
    initialRouteName: screenNames.BuyingCredit,
    ...TransparentStyle,
  }
);
const BottomTab = createBottomTabNavigator(
  {
    Account: {
      screen: Account,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode={"contain"}
              style={{ width: tabIconSize, height: tabIconSize }}
              source={
                focused
                  ? require("../../assets/account_tab_active.png")
                  : require("../../assets/account_tab_inactive.png")
              }
            />
            <CustomText
              style={{
                color: focused
                  ? Constant.App.colors.blueColor
                  : Constant.App.colors.blackColor,
                fontSize: Constant.App.textSize.Small,
              }}
            >
              {lang.tabs.account}
            </CustomText>
          </View>
        ),
      },
    },
    Ask: {
      screen: Ask,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode={"contain"}
              style={{ width: tabIconSize, height: tabIconSize }}
              source={
                focused
                  ? require("../../assets/ask_tab_active.png")
                  : require("../../assets/ask_tab_inactive.png")
              }
            />
            <CustomText
              style={{
                color: focused
                  ? Constant.App.colors.blueColor
                  : Constant.App.colors.blackColor,
                fontSize: Constant.App.textSize.Small,
              }}
            >
              {lang.tabs.ask}
            </CustomText>
          </View>
        ),
      },
    },
    Learn: {
      screen: Learn,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode={"contain"}
                style={{ width: tabIconSize, height: tabIconSize }}
                source={
                  focused
                    ? require("../../assets/discuss_tab_active.png")
                    : require("../../assets/discuss_tab_inactive.png")
                }
              />
              <CustomText
                style={{
                  color: focused
                    ? Constant.App.colors.blueColor
                    : Constant.App.colors.blackColor,
                  fontSize: Constant.App.textSize.Small,
                }}
              >
                {lang.tabs.learn}
              </CustomText>
            </View>
          );
        },
      },
    },
  },
  {
    initialRouteName: "Ask",
    tabBarposition: "bottom",
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "black",
      showLabel: false,
      style: {
        backgroundColor: "white",
      },
    },
  }
);

const BottomTabExpert = createBottomTabNavigator(
  {
    AccountExpert: {
      screen: AccountExpert,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode={"contain"}
              style={{ width: tabIconSize, height: tabIconSize }}
              source={
                focused
                  ? require("../../assets/account_tab_active.png")
                  : require("../../assets/account_tab_inactive.png")
              }
            />
            <CustomText
              style={{
                color: focused
                  ? Constant.App.colors.blueColor
                  : Constant.App.colors.blackColor,
                fontSize: Constant.App.textSize.Small,
              }}
            >
              {lang.tabs.account}
            </CustomText>
          </View>
        ),
      },
    },
    AskExpert: {
      screen: AskExpert,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode={"contain"}
              style={{ width: tabIconSize, height: tabIconSize }}
              source={
                focused
                  ? require("../../assets/ask_tab_active.png")
                  : require("../../assets/ask_tab_inactive.png")
              }
            />
            <CustomText
              style={{
                color: focused
                  ? Constant.App.colors.blueColor
                  : Constant.App.colors.blackColor,
                fontSize: Constant.App.textSize.Small,
              }}
            >
              {lang.tabs.ask}
            </CustomText>
          </View>
        ),
      },
    },
    LearnExpert: {
      screen: Learn,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode={"contain"}
              style={{ width: tabIconSize, height: tabIconSize }}
              source={
                focused
                  ? require("../../assets/discuss_tab_active.png")
                  : require("../../assets/discuss_tab_inactive.png")
              }
            />
            <CustomText
              style={{
                color: focused
                  ? Constant.App.colors.blueColor
                  : Constant.App.colors.blackColor,
                fontSize: Constant.App.textSize.Small,
              }}
            >
              {lang.tabs.learn}
            </CustomText>
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: "AskExpert",
    tabBarposition: "bottom",
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "black",
      showLabel: false,
      style: {
        backgroundColor: "white",
      },
    },
  }
);

const AppStackExpert = createStackNavigator(
  {
    BottomTabExpert: { screen: BottomTabExpert },
    SettingExpert: { screen: SettingExpert },
    ChangePasswordExpert: { screen: ChangePasswordExpert },
    ChatExpert: { screen: ChatExpert },
    Learn: { screen: Learn },
  },
  {
    headerMode: "none",
    initialRouteName: "BottomTabExpert",
  }
);

const MainAppStack = createStackNavigator(
  {
    AddChild: { screen: AddChild },
    AddCreditOrDebitCard: { screen: AddCreditOrDebitCard },
    Allergies: { screen: Allergies },
    Appointments: { screen: Appointments },
    BasicInfo: { screen: BasicInfo },
    Birth: { screen: Birth },
    BottomTab: { screen: BottomTab },
    ChangePassword: { screen: ChangePassword },
    Chat: { screen: Chat },
    Children: { screen: Children },
    ChooseExpert: { screen: ChooseExpert },
    DueDate: { screen: DueDate },
    ExpertProfile: { screen: ExpertProfile },
    HealthHistory: { screen: HealthHistory },
    Insurance: { screen: Insurance },
    Learn: { screen: Learn },
    Lifestyle: { screen: Lifestyle },
    Loss: { screen: Loss },
    Medications: { screen: Medications },
    MedicalHistory: { screen: MedicalHistory },
    PaymentMethods: { screen: PaymentMethods },
    PayPalApproval: { screen: PayPalApproval },
    PregnancyAndChildren: { screen: Pregnancy },
    PregnancyCurrent: { screen: CurrentPregnancy },
    PrevAppointmentNotes: { screen: PrevAppointmentNotes },
    PregnancyHistory: { screen: PregnancyHistory },
    ReferFriend: { screen: ReferFriend },
    Setting: { screen: Setting },
  },
  {
    headerMode: "none",
    initialRouteName: "BottomTab",
  }
);

const AppStack = createStackNavigator(
  {
    MainApp: MainAppStack,
    Payment: PaymentStack,
  },
  {
    mode: "modal",
    headerMode: "none",
    initialRouteName: "MainApp",
    ...TransparentStyle,
  }
);

const AppNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
    AppExpert: AppStackExpert,
    AuthLoading: AuthLoadingScreen,
  },
  {
    initialRouteName: "AuthLoading",
    headerMode: "none",
  }
);

const prevGetStateForActionHomeStack = AuthStack.router.getStateForAction;

AuthStack.router.getStateForAction = (action, state) => {
  if (state && action.type === "ReplaceCurrentScreen") {
    const routes = state.routes.slice(0, state.routes.length - 1);
    routes.push(action);
    return {
      ...state,
      index: routes.length - 1,
      routes,
    };
  }
  return prevGetStateForActionHomeStack(action, state);
};

const prevGetStateForActionAppStack = AppStack.router.getStateForAction;

AppStack.router.getStateForAction = (action, state) => {
  if (state && action.type === "ReplaceCurrentScreen") {
    const routes = state.routes.slice(0, state.routes.length - 1);
    routes.push(action);
    return {
      ...state,
      index: routes.length - 1,
      routes,
    };
  }
  return prevGetStateForActionAppStack(action, state);
};

const prevGetStateForActionAppStackExpert =
  AppStackExpert.router.getStateForAction;

AppStackExpert.router.getStateForAction = (action, state) => {
  if (state && action.type === "ReplaceCurrentScreen") {
    const routes = state.routes.slice(0, state.routes.length - 1);
    routes.push(action);
    return {
      ...state,
      index: routes.length - 1,
      routes,
    };
  }
  return prevGetStateForActionAppStackExpert(action, state);
};

export default createAppContainer(AppNavigator);
export { NavigationService };
