import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { setUserData, getExpertsData, clearChooseExpertState } from './action';
import styles from './style';
import CustomText from '../../components/customText';
import Constant from '../../utils/constants';
import {
  Avatar,
  Rating,
} from 'react-native-elements';
import Language from '../../utils/localization';
import CustomButton from '../../components/customButton';
import InputText from '../../components/customInputText/simpleInputText';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { updateQuestion } from '../ask/action';

const lang = Language['en'];
class ChooseExpert extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showEditQuestionModal: false,
      showFilterModal: false,
      question: '',
      genderItemsArr: [
        {
          title: 'Female Only',
          code: 'Female',
          selected: false,
        },
        {
          title: 'Male Only',
          code: 'Male',
          selected: false,
        },
      ],
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { getExperts, question } = this.props;
    this.setState({ question })
    const params = {
      expertsParams: {
        tableName: Constant.App.firebaseTableNames.users,
        roleKey: Constant.App.firebaseTableKeyValuesNames.expertsConditionKey,
        roleValue: Constant.App.firebaseTableKeyValuesNames.expertsConditionValue,
      },
    }
    getExperts(params);
  }

  componentWillUnmount() {
    const { clearState } = this.props;
    clearState();
  }


  renderExpertInfoView() {
    const { staticImages } = Constant.App;
    const { navigation, expertData } = this.props;
    return (
      <View style={styles.expertsParentContainerStyle}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'none' : 'on-drag'}
          keyboardShouldPersistTaps={Platform.OS === 'ios' ? 'never' : 'always'}
          data={expertData}
          renderItem={({ item }) => {
            item = item.data();
            return (
              <TouchableOpacity onPress={() => {
                navigation.navigate(Constant.App.screenNames.ExpertProfile, {
                  isFrom: Constant.App.screenNames.ChooseExpert,
                  uid: item.uid,
                })
              }}>
                <View
                  style={styles.expertInfoParentContainerStyle}>
                  <Avatar
                    containerStyle={{ alignSelf: 'flex-start' }}
                    renderPlaceholderContent={<Image
                      style={{
                        width: 80,
                        height: 80,
                      }}
                      resizeMode="stretch"
                      source={staticImages.profilePlaceholderImg}
                    />}
                    size={80}
                    rounded
                    source={{ uri: item.profileInfo.profileImageUrl ? item.profileInfo.profileImageUrl : null }}
                    activeOpacity={0.7} />
                  {item.isOnline ? <View
                    style={{
                      left: 90,
                      width: 16,
                      height: 16,
                      top: 15,
                      borderRadius: 8,
                      backgroundColor: Constant.App.colors.greenColor,
                      position: 'absolute',
                    }}
                  ></View> : <View
                    style={{
                      left: 90,
                      width: 16,
                      height: 16,
                      top: 15,
                      borderRadius: 8,
                      backgroundColor: Constant.App.colors.grayColor,
                      position: 'absolute',
                    }}
                  ></View>}
                  <View style={styles.expertInfoContainerStyle}>
                    <CustomText style={styles.expertNameTextBoldStyle}>
                      {`${item.profileInfo.firstName} ${item.profileInfo.lastName}`}
                    </CustomText>
                    <CustomText style={styles.expertInfoProfessionTextStyle}>
                      {item.profileInfo.profession.shortName}
                    </CustomText>
                    <CustomText style={styles.expertProfessionLoctionBoldStyle}>
                      {`${item.profileInfo.city}, ${item.profileInfo.state.code}`}
                    </CustomText>
                    <Rating
                      imageSize={20}
                      readonly
                      startingValue={parseFloat(item.rating / 2)}
                      style={{ alignSelf: 'flex-start' }}
                    />
                  </View>
                  <Image
                    resizeMode="contain"
                    source={staticImages.rightChevronIcon}
                    style={styles.rightChevronIconStyle}
                  />
                </View>
              </TouchableOpacity>
            )
          }}
          ListHeaderComponent={() => (!expertData.length ?
            <CustomText style={styles.noDataTextStyle}>{lang.errorMessage.noDataAvailable}</CustomText>
            : null)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }

  renderHeaderView() {
    const { navigation } = this.props;
    const { staticImages } = Constant.App;
    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <CustomText style={styles.cancelTextStyle}>
            {lang.chooseExpert.cancel}
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.setState({
            showFilterModal: true,
          })
        }}>
          <Image
            resizeMode="contain"
            source={staticImages.filterIcon}
            style={styles.filterIconStyle}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderQuestionView() {
    const { question } = this.props;
    return (
      <View style={styles.questionParentContainer}>
        <CustomText style={styles.questionTitleTextStyle}>
          {lang.chooseExpert.questionTitle}
        </CustomText>
        <CustomText style={styles.questionTextStyle}>
          {question}
        </CustomText>
        <TouchableOpacity onPress={() => {
          this.setState({
            showEditQuestionModal: true,
            question: question,
          })
        }}>
          <CustomText style={styles.editTextStyle}>
            {lang.chooseExpert.edit}
          </CustomText>
        </TouchableOpacity>
      </View>
    )
  }

  renderEditQuestionModal() {
    const { showEditQuestionModal, question } = this.state;
    const { setQuestionText } = this.props;
    return (
      <Modal
        animationType="fade"
        onRequestClose={() => { }}
        transparent
        isVisible={showEditQuestionModal}
      >
        <View style={styles.editQuestionModalParentContainerStyle}>
          <View style={styles.editQuestionModalInnerContainerStyle}>
            <View style={styles.editQuestionModalInputTextContainerStyle}>
              <InputText
                maxHeight={100}
                multiline={true}
                autoCapitalize="none"
                onChangeText={value => this.setState({ question: value })}
                placeholder={lang.askUser.placehorderText}
                value={question}
                style={question ? styles.editQuestionModalInputTypeStyle : [styles.editQuestionModalInputTypeStyle, { lineHeight: 25 }]}
                placeholderTextColor={Constant.App.colors.lightGrey} />
            </View>
            <View style={styles.editQuestionModalButtonContainerStyle}>
              <CustomButton
                buttonStyle={styles.cancelBtnEditQuestionModalContainerStyle}
                textStyle={styles.cancelBtnEditQuestionModalTextStyle}
                text={lang.chooseExpert.cancel}
                onPress={() => this.setState({
                  showEditQuestionModal: false,
                  question: '',
                })}
              />
              <CustomButton
                disabled={question ? false : true}
                buttonStyle={styles.saveBtnEditQuestionModalContainerStyle}
                textStyle={styles.saveBtnEditQuestionModalTextStyle}
                text={lang.chooseExpert.save}
                onPress={() => {
                  setQuestionText(question);
                  this.setState({
                    showEditQuestionModal: false,
                    question: '',
                  })
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  renderFilterModal() {
    const {
      showFilterModal,
      genderItemsArr,
    } = this.state;
    const { staticImages } = Constant.App;
    const { professionData, languagesData, getExperts } = this.props;
    return (
      <Modal
        animationType="fade"
        onRequestClose={() => { }}
        transparent
        isVisible={showFilterModal}
      >
        <View style={styles.filterModalParentContainerStyle}>
          <View style={styles.filterModalTitleContainerStyle}>
            <CustomText style={styles.filterModalTitleTextStyle}>
              {lang.chooseExpert.filterTitle}
            </CustomText>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end' }}
              onPress={() => {
                this.setState({ showFilterModal: false, })
                let isFilerSelected = false;
                const filterParams = {
                  tableName: Constant.App.firebaseTableNames.users,
                  roleKey: Constant.App.firebaseTableKeyValuesNames.expertsConditionKey,
                  roleValue: Constant.App.firebaseTableKeyValuesNames.expertsConditionValue,
                  professionKey: Constant.App.firebaseTableKeyValuesNames.filterConditionProfessionKey,
                  professionValue: null,
                  genderKey: Constant.App.firebaseTableKeyValuesNames.filterConditionGenderKey,
                  genderValue: '',
                  languages: [],
                  professions: [],
                }
                genderItemsArr.forEach(element => {
                  if (element.selected) {
                    isFilerSelected = true;
                    filterParams.genderValue = element.code;
                  }
                });
                professionData.forEach(element => {
                  if (element.selected) {
                    isFilerSelected = true;
                    filterParams.professionValue = element.fullName;
                    filterParams.professions.push(element.fullName);
                  }
                });
                languagesData.forEach(element => {
                  if (element.selected) {
                    isFilerSelected = true;
                    const valueObj = {
                      code: element.code,
                      value: element.value,
                    }
                    filterParams.languages.push(valueObj);
                  }
                });
                if (isFilerSelected) {
                  const params = {
                    filterParams,
                    isProfessionLangaugesDataLoaded: true,
                  }
                  getExperts(params);
                } else {
                  const params = {
                    expertsParams: {
                      tableName: Constant.App.firebaseTableNames.users,
                      roleKey: Constant.App.firebaseTableKeyValuesNames.expertsConditionKey,
                      roleValue: Constant.App.firebaseTableKeyValuesNames.expertsConditionValue,
                    },
                    isProfessionLangaugesDataLoaded: true,
                  }
                  getExperts(params);
                }
              }}>
              <CustomText style={styles.filterModalDoneTextStyle}>
                {lang.chooseExpert.done}
              </CustomText>
            </TouchableOpacity>
          </View>

          <View style={styles.filterModalGenderParentContainerStyle}>
            <CustomText style={styles.filterModalGenderTitleTextStyle}>
              {lang.chooseExpert.genderFilterTitle}
            </CustomText>
            {genderItemsArr.map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  genderItemsArr.forEach((element, index) => {
                    if (element.selected && element.title !== item.title) {
                      genderItemsArr[index].selected = false;
                    }
                  });
                  genderItemsArr[key].selected = genderItemsArr[key].selected ? false : true;
                  this.setState({
                    genderItemsArr: Object.assign([], [], genderItemsArr),
                  })
                }}>
                <View
                  style={styles.filterModalItemContainerStyle}>
                  <Image
                    resizeMode="contain"
                    source={item.selected ? staticImages.radioCheckBlueIcon : staticImages.radioUnCheckBlueIcon}
                    style={styles.filterModalItemChecboxIconStyle}
                  />
                  <CustomText style={styles.filterModalItemTextStyle}>
                    {item.title}
                  </CustomText>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.filterModalProfessionParentContainerStyle}>
            <CustomText style={styles.filterModalProfessionTitleTextStyle}>
              {lang.chooseExpert.professionFilterTitle}
            </CustomText>
            {professionData.map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  // professionData.forEach((element, index) => {
                  //   if (element.selected && element.fullName !== item.fullName) {
                  //     professionData[index].selected = false;
                  //   }
                  // });
                  professionData[key].selected = professionData[key].selected ? false : true;
                  this.setState({
                    professionData: Object.assign([], [], professionData),
                  })
                }}>
                <View
                  style={styles.filterModalItemContainerStyle}>
                  <Image
                    resizeMode="contain"
                    source={item.selected ? staticImages.checkBoxSelectedIcon : staticImages.checkBoxIcon}
                    style={styles.filterModalItemChecboxIconStyle}
                  />
                  <CustomText style={styles.filterModalItemTextStyle}>
                    {item.fullName}
                  </CustomText>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.filterModalLangParentContainerStyle}>
            <CustomText style={styles.filterModalLangTitleTextStyle}>
              {lang.chooseExpert.languageFilterTitle}
            </CustomText>
            {languagesData.map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  languagesData[key].selected = languagesData[key].selected ? false : true;
                  this.setState({
                    languagesData: Object.assign([], [], languagesData),
                  })
                }}>
                <View
                  style={styles.filterModalItemContainerStyle}>
                  <Image
                    resizeMode="contain"
                    source={item.selected ? staticImages.checkBoxSelectedIcon : staticImages.checkBoxIcon}
                    style={styles.filterModalItemChecboxIconStyle}
                  />
                  <CustomText style={styles.filterModalItemTextStyle}>
                    {item.value}
                  </CustomText>
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </Modal>
    )
  }

  render() {
    const { showEditQuestionModal, showFilterModal } = this.state;
    const { expertData } = this.props;
    return (
      <View style={styles.parentContainerStyle}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View>
            {this.renderHeaderView()}
            {this.renderQuestionView()}
            {expertData ? this.renderExpertInfoView() : null}
            {showEditQuestionModal ? this.renderEditQuestionModal() : null}
            {showFilterModal ? this.renderFilterModal() : null}
          </View>
        </ScrollView>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  expertData: state.chooseExpertReducer.expertData,
  question: state.askReducer.question,
  professionData: state.chooseExpertReducer.professionData,
  languagesData: state.chooseExpertReducer.languagesData,
});

const mapDispatchToProps = dispatch => ({
  setQuestionText: (value) => dispatch(updateQuestion(value)),
  getExperts: (data) => dispatch(getExpertsData(data, dispatch)),
  clearState: () => dispatch(clearChooseExpertState()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseExpert);
