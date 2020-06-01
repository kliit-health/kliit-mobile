import {
  StyleSheet,
  Platform,
} from 'react-native';
import Constant from '../../utils/constants';
import metrics from '../../utils/metrices';
import { getStatusBarHeight } from '../../components/iPhoneXHelper';

let parentPaddingValue = metrics.DEVICE_WIDTH * 0.05;
let parentPadding = parentPaddingValue * 2;

const styles = StyleSheet.create({
  askedQuestionContainerStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    padding: parentPaddingValue,
    width: metrics.DEVICE_WIDTH - parentPadding,
    backgroundColor: Constant.App.colors.blueColor,
    alignSelf: 'center',
    borderRadius: 5,
  },

  askedQuestionExpertInfoTextStyle: {
    alignSelf: 'center',
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    marginLeft: 10,
    width: (metrics.DEVICE_WIDTH - parentPadding) - parentPadding - 60,
    color: Constant.App.colors.whiteColor,
    fontSize: Constant.App.textSize.Medium,
    fontWeight: '200',
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  askedQuestionTextStyle: {
    alignSelf: 'center',
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    width: (metrics.DEVICE_WIDTH - parentPadding) - parentPadding,
    color: Constant.App.colors.whiteColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '400',
  },

  badgeContainerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Constant.App.colors.blueColor,
    borderRadius: (metrics.DEVICE_WIDTH * 0.08) * 0.20,
    width: 25,
    height: 25,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  badgeTextStyle: {
    textAlign: 'center',
    color: Constant.App.colors.whiteColor,
    fontSize: Constant.App.textSize.xSmall,
  },

  buttonContainerStyle: {
    alignSelf: 'center',
    borderRadius: Constant.App.dimensions.btnBorderRadiusGlobal,
    padding: Constant.App.dimensions.btnPaddingGlobal,
    width: metrics.DEVICE_WIDTH - parentPadding,
    backgroundColor: Constant.App.colors.blueColor,
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
  },

  buttonTextStyle: {
    textAlign: 'center',
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    color: Constant.App.colors.whiteColor,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: getStatusBarHeight(),
  },

  creditTextStyle: {
    paddingLeft: parentPaddingValue + 4,
    color: Constant.App.colors.blueColorCreditText,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.headerRegular,
  },

  emptyCreditsContainerStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    padding: parentPaddingValue,
    width: metrics.DEVICE_WIDTH - parentPadding,
    backgroundColor: Constant.App.colors.greyBgAsk,
    alignSelf: 'center',
    borderRadius: 5,
  },

  emptyCreditsTextStyle: {
    alignSelf: 'center',
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    width: (metrics.DEVICE_WIDTH - parentPadding) - parentPadding,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.xLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '400',
  },

  expertInfoContainerStyle: {
    flexDirection: 'row',
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    width: (metrics.DEVICE_WIDTH - parentPadding) - parentPadding,
    alignSelf: 'center',
  },

  expertInfoTextStyle: {
    alignSelf: 'center',
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    marginLeft: 10,
    width: (metrics.DEVICE_WIDTH - parentPadding) - parentPadding - 60,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Medium,
    fontWeight: '200',
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  expertNameTextStyle: {
    textAlign: 'center',
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    color: Constant.App.colors.blueColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  expertProfTextStyle: {
    color: Constant.App.colors.blackColor,
    textAlign: 'center',
    fontSize: Constant.App.textSize.Medium,
    fontWeight: '200',
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  headingProfileImageParentContainer: {
    width: metrics.DEVICE_WIDTH,
    flexDirection: 'row',
    padding: parentPaddingValue,
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
  },

  headingTextContainerStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    width: (metrics.DEVICE_WIDTH - parentPadding) - 75,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  headingTextStyle: {
    padding: 2,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.xxxxLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '600',
  },

  headingTextHighlightedStyle: {
    padding: 2,
    color: Constant.App.colors.pinkColor,
    fontSize: Constant.App.textSize.xxxxLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '600',
  },

  inputTextContainerStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.05,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.DEVICE_WIDTH - parentPadding,
    paddingBottom: Platform.OS === 'ios' ? metrics.DEVICE_HEIGHT * 0.01 : 0,
    borderBottomColor: Constant.App.colors.lightGrey,
    borderBottomWidth: 0.5,
  },

  inputTypeStyle: {
    paddingHorizontal: 0,
    color: Constant.App.colors.blackColor,
    width: metrics.DEVICE_WIDTH - parentPadding,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: 'left',
    fontWeight: '200',
    textAlignVertical: 'top',
  },

  myRecentExpertTitleTextStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    paddingLeft: parentPaddingValue + 4,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.xLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '500',
  },

  myRecentExpertContainerStyleRef: {
    justifyContent: 'center',
    backgroundColor: 'green',
    alignItems: 'center',
    width: metrics.DEVICE_WIDTH * 0.4,
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    marginBottom: metrics.DEVICE_HEIGHT * 0.03,
    flexDirection: 'column',
  },

  myRecentExpertContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    marginBottom: metrics.DEVICE_HEIGHT * 0.03,
    flexDirection: 'column',
    paddingLeft: parentPaddingValue + 4,
    paddingRight: (parentPaddingValue + 4) * 0.5,
  },

  myRecentExpertContainer1Style: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    marginBottom: metrics.DEVICE_HEIGHT * 0.03,
    flexDirection: 'column',
    paddingLeft: (parentPaddingValue + 4) * 0.5,
    paddingRight: (parentPaddingValue + 4) * 0.5,
  },

  myRecentExpertContainer2Style: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    marginBottom: metrics.DEVICE_HEIGHT * 0.03,
    flexDirection: 'column',
    paddingLeft: (parentPaddingValue + 4) * 0.5,
    paddingRight: parentPaddingValue + 4,
  },

  myPrevQuestionParentContainerStyle: {
    paddingTop: metrics.DEVICE_HEIGHT * 0.03,
    paddingBottom: metrics.DEVICE_HEIGHT * 0.05,
    width: metrics.DEVICE_WIDTH,
    flexDirection: 'column',
    backgroundColor: Constant.App.colors.greyBgAsk,
  },

  myPrevQuestionTitleTextStyle: {
    paddingLeft: parentPaddingValue + 4,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.xLarge,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '500',
  },

  myPrevQuestionContainerStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    padding: parentPaddingValue,
    width: metrics.DEVICE_WIDTH - parentPadding,
    backgroundColor: Constant.App.colors.whiteColor,
    alignSelf: 'center',
    borderRadius: 5,
  },

  myPrevQuestionTextStyle: {
    alignSelf: 'center',
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    width: (metrics.DEVICE_WIDTH - parentPadding) - parentPadding,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: '400',
  },

  profileImgViewStyle: {
    alignItems: 'flex-end',
    width: 75,
    height: 75,
  },

  recentExpertParentContainerStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.03,
    width: metrics.DEVICE_WIDTH,
    flexDirection: 'column',
    backgroundColor: Constant.App.colors.greyBgAsk,
  },

});

export default styles;
