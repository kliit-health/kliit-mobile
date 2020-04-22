import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import Language from '../../../utils/localization';
import CustomText from '../../../components/customText';
import Constant from '../../../utils/constants';
import { Avatar } from 'react-native-elements';
import { getExpertQuestionData } from './action';
import moment from 'moment';

const lang = Language['en'];
class AskExpert extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { getQuestion, userData } = this.props;
    const params = {
      questionParams: {
        tableName: Constant.App.firebaseTableNames.questions,
        uid: userData.uid,
        collection: Constant.App.firebaseTableNames.questionList,
        key: Constant.App.firebaseTableKeyValuesNames.questionConditionKey,
        value: false,
        userConditionKey:
          Constant.App.firebaseTableKeyValuesNames.questionExpertConditionKey,
      },
      previousQuestionParams: {
        tableName: Constant.App.firebaseTableNames.questions,
        uid: userData.uid,
        collection: Constant.App.firebaseTableNames.questionList,
        key: Constant.App.firebaseTableKeyValuesNames.questionConditionKey,
        value: true,
        userConditionKey:
          Constant.App.firebaseTableKeyValuesNames.questionExpertConditionKey,
      },
    };
    getQuestion(params);
  }

  renderRecentChatView() {
    const { staticImages } = Constant.App;
    const { questionData } = this.props;
    const { navigation } = this.props;
    return (
      <View style={styles.recentChatParentContainerStyle}>
        <View style={styles.subtitleContainerStyle}>
          <CustomText style={styles.subtitleTextStyle}>
            {lang.askExpert.recent}
          </CustomText>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'none' : 'on-drag'}
          keyboardShouldPersistTaps={Platform.OS === 'ios' ? 'never' : 'always'}
          data={questionData}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Constant.App.screenNames.ChatExpert, {
                  questionData: item,
                });
              }}
            >
              <View style={styles.recentChatContainerStyle}>
                <TouchableOpacity onPress={() => {}}>
                  <Avatar
                    containerStyle={{ alignSelf: 'center' }}
                    renderPlaceholderContent={
                      <Image
                        style={{
                          width: 80,
                          height: 80,
                        }}
                        resizeMode='stretch'
                        source={staticImages.profilePlaceholderImg}
                      />
                    }
                    size={80}
                    rounded
                    source={{
                      uri: item.userInfo.profileInfo.profileImageUrl
                        ? item.userInfo.profileInfo.profileImageUrl
                        : null,
                    }}
                    activeOpacity={0.7}
                  />
                </TouchableOpacity>
                <View style={styles.userInfoContainerStyle}>
                  <CustomText style={styles.userInfoTextBoldStyle}>
                    {`${item.userInfo.profileInfo.firstName} ${item.userInfo.profileInfo.lastName} (${item.userInfo.profileInfo.pronouns})`}
                  </CustomText>
                  <CustomText
                    style={styles.userInfoTextStyle}
                    numberOfLines={1}
                  >
                    {item.lastMessage ? item.lastMessage : item.question}
                  </CustomText>
                  <CustomText style={styles.userInfoTextStyle}>
                    {item.modifiedDate
                      ? moment.unix(item.modifiedDate).fromNow(true)
                      : moment.unix(item.createdAt).fromNow(true)}
                  </CustomText>
                </View>
                {item.expertUnreadCount ? (
                  <View style={styles.unreadCountContainerStyle}>
                    <CustomText style={styles.unreadCountTextStyle}>
                      {item.expertUnreadCount}
                    </CustomText>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator}></View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  renderResolvedChatView() {
    const { staticImages } = Constant.App;
    const { resolvedQuestionsData, navigation } = this.props;
    return (
      <View style={styles.resolvedChatParentContainerStyle}>
        <View style={styles.subtitleContainerStyle}>
          <CustomText style={styles.subtitleTextStyle}>
            {lang.askExpert.resolved}
          </CustomText>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'none' : 'on-drag'}
          keyboardShouldPersistTaps={Platform.OS === 'ios' ? 'never' : 'always'}
          data={resolvedQuestionsData}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Constant.App.screenNames.ChatExpert, {
                  questionData: item,
                });
              }}
            >
              <View style={styles.recentChatContainerStyle}>
                <TouchableOpacity onPress={() => {}}>
                  <Avatar
                    containerStyle={{ alignSelf: 'center' }}
                    renderPlaceholderContent={
                      <Image
                        style={{
                          width: 80,
                          height: 80,
                        }}
                        resizeMode='stretch'
                        source={staticImages.profilePlaceholderImg}
                      />
                    }
                    size={80}
                    rounded
                    source={{
                      uri: item.userInfo.profileInfo.profileImageUrl
                        ? item.userInfo.profileInfo.profileImageUrl
                        : null,
                    }}
                    activeOpacity={0.7}
                  />
                </TouchableOpacity>
                <View style={styles.userInfoContainerResolvedChatStyle}>
                  <CustomText style={styles.userInfoTextBoldStyle}>
                    {`${item.userInfo.profileInfo.firstName} ${item.userInfo.profileInfo.lastName} (${item.userInfo.profileInfo.pronouns})`}
                  </CustomText>
                  <CustomText
                    numberOfLines={1}
                    style={styles.userInfoTextStyle}
                  >
                    {item.lastMessage ? item.lastMessage : item.question}
                  </CustomText>
                  <CustomText style={styles.userInfoTextStyle}>
                    {moment
                      .unix(item.createdAt)
                      .format(Constant.App.dateFormat)}
                  </CustomText>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator}></View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  renderEmptyView() {
    return (
      <View style={styles.emptyViewContainerStyle}>
        <CustomText style={styles.emptyViewTextStyle}>
          {lang.errorMessage.noDataAvailable}
        </CustomText>
      </View>
    );
  }

  render() {
    const { resolvedQuestionsData, questionData, isDataFetch } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleContainerStyle}>
            <CustomText style={styles.titleTextStyle}>
              {lang.askExpert.title}
            </CustomText>
          </View>
          {questionData && questionData.length > 0
            ? this.renderRecentChatView()
            : null}
          {resolvedQuestionsData && resolvedQuestionsData.length > 0
            ? this.renderResolvedChatView()
            : null}
          {isDataFetch &&
          questionData &&
          questionData.length === 0 &&
          resolvedQuestionsData &&
          resolvedQuestionsData.length === 0
            ? this.renderEmptyView()
            : null}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.authLoadingReducer.userData,
  resolvedQuestionsData: state.askExpertReducer.resolvedQuestionsData,
  questionData: state.askExpertReducer.questionData,
  isDataFetch: state.askExpertReducer.isDataFetch,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestion: (value) => dispatch(getExpertQuestionData(value, dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AskExpert);
