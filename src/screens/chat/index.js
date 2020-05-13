import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  Image,
  RefreshControl,
  Modal,
  AppState,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import Language from '../../utils/localization';
import CustomText from '../../components/customText';
import Constant from '../../utils/constants';
import { Avatar, AirbnbRating } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import InputText from '../../components/customInputText/simpleInputText';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import MessageRowContainer from './MessageRowContainer';
import CustomButton from '../../components/customButton';
import {
  loadMessages,
  sendMessage,
  setQuestion,
  clearChatState,
  setQuestionId,
  setExpertRating,
  checkExpertStatus,
  toggleUserStatus,
  stopObserverChat,
} from './action';
import { sendEncryptedKeyToFirebase } from '../../utils/firebase';
import metrices from '../../utils/metrices';
import { getChatItems } from './selectors';
import moment from 'moment';
let key;
var RSAKey = require('react-native-rsa');
var rsa = new RSAKey();
const lang = Language['en'];
let isExpertRatingModalShow = false;
class Chat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      showActionModal: false,
      showRatingExpertModal: false,
      appState: AppState.currentState,
      imageUri: '',
      name: '',
      filename: '',
      path: '',
      rating: 0,
    };
    isExpertRatingModalShow = false;
  }

  initStatus(status) {
    const { navigation, toggleStatus, userData } = this.props;
    const { expertData, questionData } = navigation.state.params;
    const payloadToggleStatus = {
      userInfo: userData,
      toggleStatusParams: {
        uid: userData.uid,
        updatedData: {
          isActive: status,
          toUserId: status
            ? expertData
              ? expertData.uid
              : questionData.expertInfo.uid
            : '',
        },
      },
      questionData,
    };
    toggleStatus(payloadToggleStatus);
  }

  componentDidUpdate() {
    const { isActive, questionValue } = this.props;
    // const { showRatingExpertModal } = this.state;
    if (isActive) {
      this.initStatus(true);
    } else {
      this.initStatus(false);
    }
    if (
      questionValue &&
      questionValue.isResolved &&
      !questionValue.isRated &&
      !isExpertRatingModalShow
    ) {
      isExpertRatingModalShow = true;
      setTimeout(() => {
        this.setState({
          showRatingExpertModal: true,
        });
      }, 500);
    }
  }

  componentDidMount() {
    const {
      loadUserMessages,
      navigation,
      question,
      addQuestion,
      userData,
      setId,
      checkStatus,
      questionValue,
    } = this.props;
    // key = await sendEncryptedKeyToFirebase();
    // rsa.setPublicString(JSON.parse(key.publicKey));
    // const encrypted = rsa.encrypt(question);
    // const encrypted = question;
    const { expertData, questionData } = navigation.state.params;
    this.initStatus(true);
    const payloadCheckStatus = {
      expertInfo: expertData ? expertData : questionData.expertInfo,
      questionData: questionData ? questionData : null,
    };
    checkStatus(payloadCheckStatus);
    if (expertData) {
      const payloadData = {
        userInfo: userData,
        expertInfo: expertData,
        // questionEncrypted: encrypted,
        questionEncrypted: '',
        question,
      };
      addQuestion(payloadData);
    } else {
      const payloadData = {
        id: questionData.messageId,
      };
      const ids = {
        messageId: questionData.messageId,
        questionId: questionData.questionId,
        questionData,
      };
      setId(ids);
      loadUserMessages(payloadData);
    }
    if (
      questionValue &&
      questionValue.isResolved &&
      !questionValue.isRated &&
      !isExpertRatingModalShow
    ) {
      isExpertRatingModalShow = true;
      this.setState({
        showRatingExpertModal: true,
      });
    }
  }

  componentWillUnmount() {
    const { clearState, stopObervers } = this.props;
    clearState();
    this.initStatus(false);
    stopObervers();
  }

  handleButtonPress() {
    const { sendMessageUser, messageId, questionId } = this.props;
    const { message, imageUri, filename, path } = this.state;
    var encrypted = '';
    var payloadData = {};
    // rsa.setPublicString(JSON.parse(key.publicKey));
    if (message && imageUri) {
      // encrypted = rsa.encrypt(message);
      encrypted = message;
      payloadData = {
        questionId,
        id: messageId,
        lastMessage: message,
        messageParams: {
          text: encrypted,
          type: 'User',
          createdAt: moment().unix(),
          isRead: false,
          image: '',
        },
        imageParams: {
          file: Platform.OS == 'ios' ? imageUri : path,
          filename,
        },
      };
    } else if (message) {
      // encrypted = rsa.encrypt(message);
      encrypted = message;
      payloadData = {
        questionId,
        id: messageId,
        lastMessage: message,
        messageParams: {
          text: encrypted,
          type: 'User',
          createdAt: moment().unix(),
          isRead: false,
          image: '',
        },
      };
    } else if (imageUri) {
      payloadData = {
        questionId,
        id: messageId,
        lastMessage: 'Sent a image',
        messageParams: {
          text: '',
          type: 'User',
          createdAt: moment().unix(),
          isRead: false,
          image: '',
        },
        imageParams: {
          file: Platform.OS == 'ios' ? imageUri : path,
          filename,
        },
      };
    }
    sendMessageUser(payloadData);
    this.setState({
      message: '',
      imageUri: '',
      name: '',
      filename: '',
      path: '',
    });
  }

  pickImage() {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('You cancelled image picker');
      } else if (response.error) {
        alert('And error occured: ' + JSON.stringify(response));
      } else {
        let name = response.uri.substring(
          response.uri.lastIndexOf('/') + 1,
          response.uri.length
        );
        const ext = response.type.split('/').pop(); // Extract image extension
        const filename = Platform.OS === 'ios' ? name : `${name}.${ext}`;
        this.setState({
          imageUri: response.uri,
          name,
          filename,
          path: response.path,
        });
      }
    });
  }

  renderHeaderView() {
    const { navigation } = this.props;
    const { staticImages } = Constant.App;
    const { questionData, expertData } = navigation.state.params;
    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
          }}
          onPress={() => {
            navigation.navigate(Constant.App.screenNames.BottomTab);
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            resizeMode='contain'
            source={staticImages.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.profileHeaderStyle}>
          <Avatar
            containerStyle={{ alignSelf: 'center' }}
            renderPlaceholderContent={
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                resizeMode='stretch'
                source={staticImages.profilePlaceholderImg}
              />
            }
            size={50}
            rounded
            source={{
              uri:
                questionData &&
                questionData.expertInfo.profileInfo.profileImageUrl
                  ? questionData.expertInfo.profileInfo.profileImageUrl
                  : expertData && expertData.profileInfo.profileImageUrl
                  ? expertData.profileInfo.profileImageUrl
                  : null,
            }}
            activeOpacity={0.7}
          />
          <CustomText style={styles.titleTextStyle}>
            {questionData
              ? `${questionData.expertInfo.profileInfo.firstName} ${
                  questionData.expertInfo.profileInfo.lastName
                }`
              : `${expertData.profileInfo.firstName} ${
                  expertData.profileInfo.lastName
                }`}
          </CustomText>
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            // opacity: questionData && questionData.isResolved ? 0 : 100,
            opacity: 0,
          }}
          onPress={() => {
            this.setState({
              showActionModal: true,
            });
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            resizeMode='contain'
            source={staticImages.menuDotIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderFooterView() {
    const { staticImages } = Constant.App;
    const { message, imageUri } = this.state;
    return (
      <View style={styles.chatInputParentContainer}>
        {imageUri ? (
          <View style={styles.imageParentContainerStyle}>
            <TouchableOpacity
              style={styles.imageCrossContainerStyle}
              onPress={() =>
                this.setState({
                  imageUri: '',
                  name: '',
                  filename: '',
                  path: '',
                })
              }
            >
              <Image
                style={styles.imageCrossStyle}
                resizeMode='contain'
                source={staticImages.crossIcon}
              />
            </TouchableOpacity>
            <View style={styles.imageContainerStyle}>
              <Image
                style={{
                  height: metrices.DEVICE_WIDTH - 100,
                  width: metrices.DEVICE_WIDTH * 0.65,
                  resizeMode: 'cover',
                }}
                source={{
                  uri: imageUri,
                }}
                defaultSource={Constant.App.staticImages.profilePlaceholderImg}
              />
            </View>
          </View>
        ) : null}
        <View style={styles.chatInputContainer}>
          <TouchableOpacity
            style={styles.cameraContainerStyle}
            onPress={() => this.pickImage()}
          >
            <Image
              style={{
                width: 28,
                height: 28,
              }}
              resizeMode='contain'
              source={staticImages.cameraGreyIcon}
            />
          </TouchableOpacity>
          <View style={styles.textContainerStyle}>
            <InputText
              maxHeight={100}
              multiline={true}
              autoCapitalize='sentences'
              onChangeText={(value) => {
                this.setState({
                  message: value,
                });
              }}
              placeholder={lang.chat.enterMsg}
              value={message}
              style={styles.textInputStyle}
              placeholderTextColor={Constant.App.colors.lightGrey}
            />
            <TouchableOpacity
              style={styles.sendButtonContainerStyle}
              onPress={() => (message || imageUri) && this.handleButtonPress()}
            >
              <Image
                style={{
                  width: 28,
                  height: 28,
                }}
                resizeMode='contain'
                source={staticImages.sendIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderMessageList(item, index, datamessage) {
    return (
      <MessageRowContainer
        item={item}
        index={index}
        lastIndex={datamessage.length}
        textkey={key}
      />
    );
  }

  renderMessageView() {
    const { messages } = this.props;
    const datamessage = getChatItems(messages);
    return (
      <FlatList
        ref={(ref) => {
          this.flatList = ref;
        }}
        data={datamessage}
        style={{ paddingBottom: 10 }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) =>
          this.renderMessageList(item, index, datamessage)
        }
        inverted={true}
      />
    );
  }

  renderActionModal() {
    const { showActionModal } = this.state;
    return (
      <Modal
        animationType='fade'
        onRequestClose={() => {}}
        transparent
        isVisible={showActionModal}
      >
        <View style={styles.actionModalParentContainerStyle}>
          <View style={styles.actionModalInnerContainerStyle}>
            <CustomText style={styles.actionModalTitleTextStyle}>
              {lang.chat.action}
            </CustomText>
            <View style={styles.actionModalLineSeperator} />
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  showActionModal: false,
                  showRatingExpertModal: true,
                });
              }}
            >
              <CustomText style={styles.actionModalBlueTextStyle}>
                {lang.chat.resolveQuestion}
              </CustomText>
            </TouchableOpacity>
          </View>
          <CustomButton
            buttonStyle={styles.actionModalOkBtnErrorContainerStyle}
            textStyle={styles.actionModalOkBtnErrorTextStyle}
            text={lang.chat.cancel}
            onPress={() => {
              this.setState({
                showActionModal: false,
              });
            }}
          />
        </View>
      </Modal>
    );
  }

  renderRatingExpertModal() {
    const { showRatingExpertModal, rating } = this.state;
    const { staticImages } = Constant.App;
    const { navigation, questionValue, rateExpert } = this.props;
    const { expertData, questionData } = navigation.state.params;
    return (
      <Modal
        animationType='fade'
        onRequestClose={() => {}}
        transparent
        isVisible={showRatingExpertModal}
      >
        <View style={styles.ratingExpertModalParentContainerStyle}>
          <View style={styles.ratingExpertModalInnerContainerStyle}>
            <CustomText style={styles.ratingExpertModalTitleTextStyle}>
              {lang.chat.titleRateExpert}
            </CustomText>
            <Avatar
              containerStyle={{ alignSelf: 'center' }}
              renderPlaceholderContent={
                <Image
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  resizeMode='stretch'
                  source={staticImages.profilePlaceholderImg}
                />
              }
              size={100}
              rounded
              source={{
                uri:
                  expertData && expertData.profileInfo.profileImageUrl
                    ? expertData.profileInfo.profileImageUrl
                    : questionData &&
                      questionData.expertInfo.profileInfo.profileImageUrl
                    ? questionData.expertInfo.profileInfo.profileImageUrl
                    : null,
              }}
              activeOpacity={0.7}
            />
            <CustomText style={styles.ratingExpertModalTextStyle}>
              {`${lang.chat.subTitleRateExpert}${
                expertData
                  ? expertData.profileInfo.firstName +
                    ' ' +
                    expertData.profileInfo.lastName
                  : questionData.expertInfo.profileInfo.firstName +
                    ' ' +
                    questionData.expertInfo.profileInfo.lastName
              }`}
            </CustomText>
            <AirbnbRating
              imageSize={40}
              readonly={false}
              startingValue={0}
              showRating={false}
              style={{ alignSelf: 'center' }}
              defaultRating={0}
              onFinishRating={(value) => {
                this.setState({
                  rating: value * 2,
                });
              }}
            />
            <CustomButton
              buttonStyle={styles.ratingExpertModalBtnContainerStyle}
              textStyle={styles.ratingExpertModalBtnTextStyle}
              text={lang.chat.rate}
              onPress={() => {
                if (rating) {
                  const expertValue = Object.assign(
                    {},
                    questionValue.expertInfo
                  );
                  if (
                    expertValue.userRating &&
                    expertValue.userRating.length > 0
                  ) {
                    expertValue.userRating.push({
                      rating,
                      uid: questionValue.userInfo.uid,
                    });
                    let ratings = 0;
                    expertValue.userRating.forEach((element) => {
                      ratings = ratings + element.rating;
                    });
                    expertValue.rating = parseInt(
                      (ratings / expertValue.userRating.length).toFixed()
                    );
                  } else {
                    expertValue.userRating = [
                      {
                        rating,
                        uid: questionValue.userInfo.uid,
                      },
                    ];
                    expertValue.rating = rating;
                  }
                  const questionRef = Object.assign({}, questionValue);
                  questionRef.isRated = true;
                  const payloadData = {
                    resolveQuestionParams: questionRef,
                    setExpertRatingParams: expertValue,
                    navigation,
                  };
                  rateExpert(payloadData);
                  this.setState({
                    showRatingExpertModal: false,
                  });
                }
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }

  renderResolvedFooterView() {
    return (
      <View style={styles.resolvedParentContainer}>
        <CustomText style={styles.resovledTextStyle}>
          {lang.chat.resolvedConversationMsg}
        </CustomText>
      </View>
    );
  }

  render() {
    const { showActionModal, showRatingExpertModal } = this.state;
    const { navigation } = this.props;
    const { questionData } = navigation.state.params;

    return (
      <View style={styles.parentContainer}>
        {this.renderHeaderView()}
        {this.renderMessageView()}
        {questionData && questionData.isResolved
          ? this.renderResolvedFooterView()
          : this.renderFooterView()}
        {/* {showActionModal ? this.renderActionModal() : null} */}
        {showRatingExpertModal ? this.renderRatingExpertModal() : null}
        {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  question: state.askReducer.question,
  userData: state.authLoadingReducer.userData,
  messages: state.chat.messages,
  messageId: state.chat.messageId,
  questionId: state.chat.questionId,
  questionValue: state.chat.questionData,
  expertStatusData: state.chat.expertStatusData,
  isActive: state.authLoadingReducer.isActive,
});

const mapDispatchToProps = (dispatch) => ({
  loadUserMessages: (value) => dispatch(loadMessages(value, dispatch)),
  sendMessageUser: (value) => dispatch(sendMessage(value)),
  addQuestion: (value) => dispatch(setQuestion(value, dispatch)),
  clearState: () => dispatch(clearChatState()),
  setId: (value) => dispatch(setQuestionId(value)),
  rateExpert: (value) => dispatch(setExpertRating(value)),
  checkStatus: (value) => dispatch(checkExpertStatus(value, dispatch)),
  toggleStatus: (value) => dispatch(toggleUserStatus(value)),
  stopObervers: () => dispatch(stopObserverChat()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
