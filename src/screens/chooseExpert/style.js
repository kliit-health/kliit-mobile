import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "../../components/iPhoneXHelper";
import metrics from "../../utils/metrices";
import Constant from "../../utils/constants";

let parentPaddingValue = metrics.DEVICE_WIDTH * 0.08;
let parentPadding = parentPaddingValue * 2;
let childPaddingValue = metrics.DEVICE_WIDTH * 0.03;

let parentPaddingValueFilterModal = metrics.DEVICE_WIDTH * 0.05;
let parentPaddingFilterModal = parentPaddingValueFilterModal * 2;

const styles = StyleSheet.create({
  cancelBtnEditQuestionModalContainerStyle: {
    width: (metrics.DEVICE_WIDTH - 100) * 0.48,
    padding: 10,
    backgroundColor: Constant.App.colors.grayColor,
    borderRadius: 10,
  },

  cancelBtnEditQuestionModalTextStyle: {
    color: Constant.App.colors.whiteColor,
    textAlign: "center",
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  cancelTextStyle: {
    fontSize: Constant.App.textSize.Medium,
    color: Constant.App.colors.blackColor,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    fontWeight: "100",
  },

  editTextStyle: {
    alignSelf: "flex-end",
    paddingRight: parentPaddingValue * 0.5,
    fontSize: Constant.App.textSize.Medium,
    color: Constant.App.colors.blueColor,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    fontWeight: "100",
  },

  editQuestionModalButtonContainerStyle: {
    flexDirection: "row",
    width: metrics.DEVICE_WIDTH - 100,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },

  editQuestionModalInnerContainerStyle: {
    flexDirection: "row",
    borderRadius: 10,
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: Constant.App.colors.whiteColor,
  },

  editQuestionModalInputTextContainerStyle: {
    width: metrics.DEVICE_WIDTH - 100,
    paddingBottom: Platform.OS === "ios" ? metrics.DEVICE_HEIGHT * 0.01 : 0,
    borderBottomColor: Constant.App.colors.lightGrey,
    borderBottomWidth: 0.5,
  },

  editQuestionModalInputTypeStyle: {
    color: Constant.App.colors.blackColor,
    width: metrics.DEVICE_WIDTH - 100,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: "left",
    fontWeight: "200",
    textAlignVertical: "top",
  },

  editQuestionModalParentContainerStyle: {
    flex: 1,
    backgroundColor: Constant.App.colors.modalBgSemiTransparentColor,
    justifyContent: "center",
    alignItems: "center",
  },

  expertInfoContainerStyle: {
    marginLeft: 10,
    width: metrics.DEVICE_WIDTH - parentPadding - 105,
    flexDirection: "column",
  },

  expertInfoParentContainerStyle: {
    borderTopColor: Constant.App.colors.bgChooseExpertColor,
    borderTopWidth: 1,
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
    paddingTop: metrics.DEVICE_WIDTH * 0.03,
    paddingBottom: metrics.DEVICE_WIDTH * 0.03,
    flexDirection: "row",
    width: metrics.DEVICE_WIDTH,
    backgroundColor: Constant.App.colors.whiteColor,
  },

  expertInfoProfessionTextStyle: {
    marginTop: 2,
    width: metrics.DEVICE_WIDTH - parentPadding - 105,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Small,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    fontWeight: "200",
  },

  expertNameTextBoldStyle: {
    width: metrics.DEVICE_WIDTH - parentPadding - 105,
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontWeight: "500",
    fontFamily: Constant.App.fontFamily.headerBold,
  },

  expertsParentContainerStyle: {
    marginTop: 5,
    width: metrics.DEVICE_WIDTH,
    flexDirection: "column",
  },

  expertProfessionLoctionBoldStyle: {
    marginTop: 2,
    width: metrics.DEVICE_WIDTH - parentPadding - 105,
    color: Constant.App.colors.greyColorText,
    fontSize: Constant.App.textSize.Small,
    fontWeight: "200",
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  filterIconStyle: {
    width: 35,
    height: 35,
  },

  filterModalDoneTextStyle: {
    color: Constant.App.colors.blueColor,
    textAlign: "center",
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  filterModalGenderParentContainerStyle: {
    margin: parentPaddingValueFilterModal,
    paddingBottom: parentPaddingValueFilterModal,
    flexDirection: "column",
    width: metrics.DEVICE_WIDTH - parentPaddingFilterModal,
    borderBottomColor: Constant.App.colors.grayColor,
    borderBottomWidth: 1,
  },

  filterModalGenderTitleTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.headerRegular,
    fontWeight: "300",
  },

  filterModalItemContainerStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.02,
    width: metrics.DEVICE_WIDTH - parentPaddingFilterModal,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  filterModalItemParentContainerStyle: {
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    width: metrics.DEVICE_WIDTH - parentPaddingFilterModal,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  filterModalItemChecboxIconStyle: {
    height: metrics.DEVICE_WIDTH * 0.05,
    width: metrics.DEVICE_WIDTH * 0.05,
  },

  filterModalItemTextStyle: {
    paddingLeft: 10,
    color: Constant.App.colors.greyColorText,
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    textAlign: "left",
    width:
      metrics.DEVICE_WIDTH -
      parentPaddingFilterModal -
      metrics.DEVICE_WIDTH * 0.05,
  },

  filterModalLangParentContainerStyle: {
    marginLeft: parentPaddingValueFilterModal,
    marginRight: parentPaddingValueFilterModal,
    marginBottom: parentPaddingValueFilterModal,
    paddingBottom: parentPaddingValueFilterModal,
    flexDirection: "column",
    width: metrics.DEVICE_WIDTH - parentPaddingFilterModal,
  },

  filterModalLangTitleTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.headerRegular,
    fontWeight: "300",
  },

  filterModalParentContainerStyle: {
    marginTop: getStatusBarHeight(),
    flexDirection: "column",
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    backgroundColor: Constant.App.colors.whiteColor,
  },

  filterModalProfessionParentContainerStyle: {
    marginLeft: parentPaddingValueFilterModal,
    marginRight: parentPaddingValueFilterModal,
    marginBottom: parentPaddingValueFilterModal,
    paddingBottom: parentPaddingValueFilterModal,
    flexDirection: "column",
    width: metrics.DEVICE_WIDTH - parentPaddingFilterModal,
    borderBottomColor: Constant.App.colors.grayColor,
    borderBottomWidth: 1,
  },

  filterModalProfessionTitleTextStyle: {
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.headerRegular,
    fontWeight: "300",
  },

  filterModalTitleContainerStyle: {
    padding: parentPaddingValueFilterModal,
    flexDirection: "column",
    width: metrics.DEVICE_WIDTH,
    borderBottomColor: Constant.App.colors.borderColorFilterModal,
    borderBottomWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  filterModalTitleTextStyle: {
    alignSelf: "center",
    position: "absolute",
    color: Constant.App.colors.blackColor,
    textAlign: "center",
    fontSize: Constant.App.textSize.Large,
    fontFamily: Constant.App.fontFamily.headerBold,
    fontWeight: "600",
  },

  headerStyle: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: parentPaddingValue,
    paddingRight: parentPaddingValue,
    paddingTop: parentPaddingValue,
    width: metrics.DEVICE_WIDTH,
    backgroundColor: Constant.App.colors.whiteColor,
  },

  noDataTextStyle: {
    marginTop: 50,
    alignSelf: "center",
    color: Constant.App.colors.blackColor,
    fontSize: Constant.App.textSize.xxLarge,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  parentContainerStyle: {
    flex: 1,
    alignItems: "center",
    marginTop: getStatusBarHeight(),
    backgroundColor: Constant.App.colors.bgChooseExpertColor,
  },

  questionParentContainer: {
    flexDirection: "column",
    paddingLeft: parentPaddingValue + childPaddingValue,
    paddingRight: parentPaddingValue + childPaddingValue,
    paddingBottom: childPaddingValue,
    width: metrics.DEVICE_WIDTH,
    backgroundColor: Constant.App.colors.whiteColor,
  },

  questionTitleTextStyle: {
    fontSize: Constant.App.textSize.Medium,
    color: Constant.App.colors.blackColor,
    fontFamily: Constant.App.fontFamily.bodyRegular,
    fontWeight: "100",
  },

  questionTextStyle: {
    paddingRight: parentPaddingValue,
    marginTop: metrics.DEVICE_HEIGHT * 0.01,
    fontSize: Constant.App.textSize.Large,
    color: Constant.App.colors.blackColor,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },

  rightChevronIconStyle: {
    width: 15,
    height: 15,
    alignSelf: "center",
  },

  saveBtnEditQuestionModalContainerStyle: {
    width: (metrics.DEVICE_WIDTH - 100) * 0.48,
    padding: 10,
    backgroundColor: Constant.App.colors.blueColor,
    borderRadius: 10,
  },

  saveBtnEditQuestionModalTextStyle: {
    color: Constant.App.colors.whiteColor,
    textAlign: "center",
    fontSize: Constant.App.textSize.Normal,
    fontFamily: Constant.App.fontFamily.bodyRegular,
  },
});

export default styles;
