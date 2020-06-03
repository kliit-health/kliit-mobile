const Constant = {
  App: {
    disclaimerTextForChat:
      'By opening and reading this, you agree to be bound to the following terms and conditions: Kliit is not a healthcare provider and does not substitute for a primary care physician, medical advice or professional services. The information provided through <a target="_blank" href="https://www.kliit.com/">kliit.com</a> is made for educational and informational purposes only and should not be used as a professional diagnosis or a treatment plan. No physician-patient relationship is created by this site or its use. If you have or suspect you may have, a health condition, you should consult your healthcare provider for specific medical advice.',
    asynckeys: "KlitLocalStorageKey",
    dateFormat: "MM/DD/YYYY",
    privacyPolicyurl: "https://www.kliit.com/privacy-policy",
    termsAndConditionsUrl: "https://www.kliit.com/terms-and-conditions",
    helpUrl: "http://www.kliit.com/help",
    rateUsUrl: "https://kliit-health-app.firebaseapp.com/devicedetection",
    learnTabUrl: "https://www.kliit.com/topics",
    appLiveLink: {
      googlePlay: "https://play.google.com/store/apps/details?id=com.klit",
      appleStore: "https://apps.apple.com/us/app/id1487436865",
    },
    logoutInterval: 1000 * 20 * 60,
    Toast: {
      SHORT: 200,
      LONG: 2000,
    },
    credits: 0,
    referalCredits: 10,
    questionCreditValue: 10,
    firebaseTableNames: {
      users: "users",
      questions: "questionsNew",
      questionList: "questionList",
      professions: "professions",
      languages: "languages",
      messages: "messagesNew",
    },
    firebaseTableKeyValuesNames: {
      expertsConditionKey: "role",
      expertsConditionValue: "Expert",
      questionConditionKey: "isResolved",
      questionUserConditionKey: "userInfo.uid",
      questionExpertConditionKey: "expertInfo.uid",
      filterConditionGenderKey: "profileInfo.gender",
      filterConditionProfessionKey: "profileInfo.profession.fullName",
    },
    colors: {
      offWhiteColor: "#F9F9F9",
      redColorLogout: "#D41F08",
      redColorExpired: "#d92405",
      blueColor: "#008AFC",
      chatHighLightedBgColor: "#C3CBDE",
      blueColorCreditText: "#002272",
      lightGrey: "#949394",
      greyBgAsk: "#F0F0F0",
      bgChooseExpertColor: "#E1E7F3",
      orangeUnreadNotifcationCountColor: "#F49C20",
      greenColor: "#57d596",
      redColor: "red",
      whiteColor: "#FFFFFF",
      blackColor: "black",
      greyColorText: "#B3B3B3",
      borderColorFilterModal: "#ECEBEB",
      searchLightText: "#666666",
      modalBgSemiTransparentColor: "rgba(0,0,0,0.5)",
      sideMenuBgColor: "rgb(87, 213, 150)",
      grayColor: "rgb(204, 204, 204)",
      vendorItemBackgroundColor: "rgba(0,0,0,.45)",
      bgSemiTransparentParentColor: "rgba(0,0,0,0.70)",
      vendorDetailMenuTabItemsBorderColor: "#F0F0F0",
      pinkColor: "#FE9FD8",
      dark40: "rgba(33, 43, 54, 0.4)",
      blueGrey: "#8e8e93",
      brownGrey: "#999999",
      brownGreyTwo: "#979797",
      paleLilac: "#e5e5ea",
      darkishBlue21: "#00267d",
      black4: "rgba(0, 0, 0, 0.04)",
      azureColor: "rgb(0, 138, 252)",
      blackTwoColor: "rgb(51,51,51)",
      pinkishGreyColor: "rgb(206 ,206 ,206)",
    },
    dimensions: {
      btnPaddingGlobal: 12,
      btnBorderRadiusGlobal: 20,
    },
    textSize: {
      xSmall: 10,
      Small: 12,
      Medium: 14,
      Normal: 16,
      Large: 18,
      xLarge: 20,
      xxLarge: 24,
      xxxLarge: 28,
      xxxxLarge: 32,
      xxxxxLarge: 35,
    },
    stack: {
      AuthStack: "Auth",
      AppStack: "App",
      AppStackExpert: "AppExpert",
      AuthLoading: "AuthLoading",
    },
    screenNames: {
      AddChild: "AddChild",
      AddCreditOrDebitCard: "AddCreditOrDebitCard",
      AddProfileData: "AddProfileData",
      Allergies: "Allergies",
      Appointments: "Appointments",
      AskUser: "Ask",
      AskExpert: "AskExpert",
      BasicInfo: "BasicInfo",
      Birth: "Birth",
      BottomTab: "BottomTab",
      BottomTabExpert: "BottomTabExpert",
      BuyingCredit: "BuyingCredit",
      ChangePassword: "ChangePassword",
      ChangePasswordExpert: "ChangePasswordExpert",
      Chat: "Chat",
      ChatExpert: "ChatExpert",
      Children: "Children",
      ChooseExpert: "ChooseExpert",
      DueDate: "DueDate",
      ExpertProfile: "ExpertProfile",
      ForgotPassword: "ForgotPassword",
      GetStarted: "GetStarted",
      HealthHistory: "HealthHistory",
      Insurance: "Insurance",
      Learn: "Learn",
      LearnExpert: "LearnExpert",
      LifeStyle: "Lifestyle",
      Login: "Login",
      Loss: "Loss",
      MedicalHistory: "MedicalHistory",
      Medications: "Medications",
      PaymentMethods: "PaymentMethods",
      PayPalApproval: "PayPalApproval",
      PrevAppointmentNotes: "PrevAppointmentNotes",
      PregnancyCurrent: "PregnancyCurrent",
      PregnancyHistory: "PregnancyHistory",
      PregnancyAndChildren: "PregnancyAndChildren",
      ReferFriend: "ReferFriend",
      Setting: "Setting",
      SettingExpert: "SettingExpert",
      SignUp: "SignUp",
    },
    fontFamily: {
      headerRegular: "Poppins-Regular",
      headerBold: "Poppins-Bold",
      bodyRegular: "AvenirLTStd-Roman",
      headerSemiBold: "Poppins-SemiBold",
      headerLight: "Poppins-Light",
      headerMedium: "Poppins-Medium",
      avenirMedium: "Avenir-Medium",
      avenirBook: "Avenir-Book",
      proximaNovaSemiBold: "ProximaNova-SemiBold",
      avenirLight: "Avenir-Light",
    },
    staticImages: {
      loginLogoImage: require("../../../assets/logo.png"),
      passwordVisibleIcon: require("../../../assets/eye.png"),
      passwordInvisibleIcon: require("../../../assets/eye_hide.png"),
      crossIcon: require("../../../assets/cross.png"),
      checkGreenIcon: require("../../../assets/check_green.png"),
      checkGreyIcon: require("../../../assets/check_grey.png"),
      tutorialImageOne: require("../../../assets/tutorial_one.png"),
      tutorialImageTwo: require("../../../assets/tutorial_two.png"),
      tutorialImageThree: require("../../../assets/tutorial_three.png"),
      logoHorizontal: require("../../../assets/logo_horizontal.png"),
      downArrow: require("../../../assets/down_arrow.png"),
      checkBoxIcon: require("../../../assets/uncheck.png"),
      checkBoxSelectedIcon: require("../../../assets/check.png"),
      profilePlaceholderImg: require("../../../assets/profile_img_placeholder.png"),
      cameraWhiteImg: require("../../../assets/camera_white.png"),
      filterIcon: require("../../../assets/filter.png"),
      rightChevronIcon: require("../../../assets/right_chevron.png"),
      radioCheckBlueIcon: require("../../../assets/check_blue.png"),
      radioUnCheckBlueIcon: require("../../../assets/uncheck_blue.png"),
      backIcon: require("../../../assets/back.png"),
      menuDotIcon: require("../../../assets/menu_dot.png"),
      sendIcon: require("../../../assets/send.png"),
      cameraGreyIcon: require("../../../assets/camera_grey.png"),
      readMsgIcon: require("../../../assets/read_msg_icon.png"),
      unreadMsgIcon: require("../../../assets/unread_msg_icon.png"),
      shareIcon: require("../../../assets/share.png"),
      xCloseIcon: require("../../../assets/xclose.png"),
      kliitCredit: require("../../../assets/kliit_credits.png"),
      basket: require("../../../assets/basket.png"),
      creditCard: require("../../../assets/credit_card.png"),
      greyDownArrow: require("../../../assets/grey_down_arrow.png"),
      addIcon: require("../../../assets/add_icon.png"),
      payPalIcon: require("../../../assets/paypal.png"),
      applePayIcon: require("../../../assets/apple_pay.png"),
      lockIcon: require("../../../assets/npLock.png"),
      cardIcon: require("../../../assets/card.png"),
      plusIcon: require("../../../assets/plus.png"),
    },
    Api: {
      BaseUrl: "",
      endPoints: {},
    },
    Modal: {
      gender: [{ value: "Male", code: "M" }, { value: "Female", code: "F" }],
      states: [
        {
          value: "Alabama",
          code: "AL",
        },
        {
          value: "Alaska",
          code: "AK",
        },
        {
          value: "American Samoa",
          code: "AS",
        },
        {
          value: "Arizona",
          code: "AZ",
        },
        {
          value: "Arkansas",
          code: "AR",
        },
        {
          value: "California",
          code: "CA",
        },
        {
          value: "Colorado",
          code: "CO",
        },
        {
          value: "Connecticut",
          code: "CT",
        },
        {
          value: "Delaware",
          code: "DE",
        },
        {
          value: "District Of Columbia",
          code: "DC",
        },
        {
          value: "Federated States Of Micronesia",
          code: "FM",
        },
        {
          value: "Florida",
          code: "FL",
        },
        {
          value: "Georgia",
          code: "GA",
        },
        {
          value: "Guam",
          code: "GU",
        },
        {
          value: "Hawaii",
          code: "HI",
        },
        {
          value: "Idaho",
          code: "ID",
        },
        {
          value: "Illinois",
          code: "IL",
        },
        {
          value: "Indiana",
          code: "IN",
        },
        {
          value: "Iowa",
          code: "IA",
        },
        {
          value: "Kansas",
          code: "KS",
        },
        {
          value: "Kentucky",
          code: "KY",
        },
        {
          value: "Louisiana",
          code: "LA",
        },
        {
          value: "Maine",
          code: "ME",
        },
        {
          value: "Marshall Islands",
          code: "MH",
        },
        {
          value: "Maryland",
          code: "MD",
        },
        {
          value: "Massachusetts",
          code: "MA",
        },
        {
          value: "Michigan",
          code: "MI",
        },
        {
          value: "Minnesota",
          code: "MN",
        },
        {
          value: "Mississippi",
          code: "MS",
        },
        {
          value: "Missouri",
          code: "MO",
        },
        {
          value: "Montana",
          code: "MT",
        },
        {
          value: "Nebraska",
          code: "NE",
        },
        {
          value: "Nevada",
          code: "NV",
        },
        {
          value: "New Hampshire",
          code: "NH",
        },
        {
          value: "New Jersey",
          code: "NJ",
        },
        {
          value: "New Mexico",
          code: "NM",
        },
        {
          value: "New York",
          code: "NY",
        },
        {
          value: "North Carolina",
          code: "NC",
        },
        {
          value: "North Dakota",
          code: "ND",
        },
        {
          value: "Northern Mariana Islands",
          code: "MP",
        },
        {
          value: "Ohio",
          code: "OH",
        },
        {
          value: "Oklahoma",
          code: "OK",
        },
        {
          value: "Oregon",
          code: "OR",
        },
        {
          value: "Palau",
          code: "PW",
        },
        {
          value: "Pennsylvania",
          code: "PA",
        },
        {
          value: "Puerto Rico",
          code: "PR",
        },
        {
          value: "Rhode Island",
          code: "RI",
        },
        {
          value: "South Carolina",
          code: "SC",
        },
        {
          value: "South Dakota",
          code: "SD",
        },
        {
          value: "Tennessee",
          code: "TN",
        },
        {
          value: "Texas",
          code: "TX",
        },
        {
          value: "Utah",
          code: "UT",
        },
        {
          value: "Vermont",
          code: "VT",
        },
        {
          value: "Virgin Islands",
          code: "VI",
        },
        {
          value: "Virginia",
          code: "VA",
        },
        {
          value: "Washington",
          code: "WA",
        },
        {
          value: "West Virginia",
          code: "WV",
        },
        {
          value: "Wisconsin",
          code: "WI",
        },
        {
          value: "Wyoming",
          code: "WY",
        },
      ],
    },
  },
};

export default Constant;
