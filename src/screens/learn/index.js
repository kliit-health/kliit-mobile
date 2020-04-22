import React from 'react';
import {
    View,
    Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { getStatusBarHeight } from '../../components/iPhoneXHelper';
import Constant from '../../utils/constants';

class Learn extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        const { navigation, userData, appScreen } = this.props;
        console.log('appScreen  ', appScreen);
        if (appScreen && (appScreen.currentScreen === Constant.App.screenNames.Learn || appScreen.currentScreen === Constant.App.screenNames.LearnExpert)) {
            Linking.openURL(Constant.App.learnTabUrl);
            setTimeout(() => {
                if (userData.role === 'Expert') {
                    navigation.navigate(appScreen.prevScreen ? appScreen.prevScreen : Constant.App.screenNames.AskExpert);
                } else {
                    navigation.navigate(appScreen.prevScreen ? appScreen.prevScreen : Constant.App.screenNames.AskUser);
                }
            }, 200);
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                marginTop: getStatusBarHeight(),
            }}>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    userData: state.authLoadingReducer.userData,
    appScreen: state.authLoadingReducer.appScreen,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Learn);
