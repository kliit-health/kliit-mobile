/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
} from 'react-native';
import CustomText from '../customText';
import styles from './style';
import CustomButton from '../customButton';
import Moment from 'moment';

let iosSelectedDate = null;
const dateFormat = 'MM-DD-YYYY';
class DatePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    const { selectedDate } = this.props;
    this.state = {
      showIosDateModal: false,
      selectedDate: selectedDate ? selectedDate : '',
    };
  }

  openDatePicker() {
    if (Platform.OS === 'ios') {
      iosSelectedDate = Moment(new Date()).format(dateFormat);
      const { showIosDateModal } = this.state;
      this.showHideModal(showIosDateModal)
    } else {
      this.openAndroidDatePicker();
    }
  }

  onDateChange(date) {
    iosSelectedDate = Moment(date).format(dateFormat);
  }

  doneButtonModalDatePickerClick = () => {
    const { showIosDateModal } = this.state;
    const { onSelection } = this.props;
    if (iosSelectedDate) {
      this.setState({ selectedDate: iosSelectedDate });
      onSelection(iosSelectedDate);
      iosSelectedDate = '';
    }
    this.showHideModal(showIosDateModal);
  }

  showHideModal(showIosDateModal) {
    this.setState({ showIosDateModal: !showIosDateModal })
  }

  async openAndroidDatePicker() {
    const { onSelection } = this.props;
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        maxDate: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const formatedDate = `${(month + 1) === 1 ? '01' :
          (month + 1) === 2 ? '02' :
            (month + 1) === 3 ? '03' :
              (month + 1) === 4 ? '04' :
                (month + 1) === 5 ? '05' :
                  (month + 1) === 6 ? '06' :
                    (month + 1) === 7 ? '07' :
                      (month + 1) === 8 ? '08' :
                        (month + 1) === 9 ? '09' :
                          month + 1}-${
          day === 1 ? '01' :
            day === 2 ? '02' :
              day === 3 ? '03' :
                day === 4 ? '04' :
                  day === 5 ? '05' :
                    day === 6 ? '06' :
                      day === 7 ? '07' :
                        day === 8 ? '08' :
                          day === 9 ? '09' :
                            day}-${year}`;
        this.setState({
          selectedDate: formatedDate
        });
        onSelection(formatedDate);
      }
    } catch ({ code, message }) {
      console.log('Cannot open date picker', message);
    }
  }

  renderIosDatePickerModalView() {
    const { showIosDateModal } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => { }}
        visible={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={styles.modalDatePickerContainer}>
            <CustomButton
              buttonStyle={styles.cancelDatePicketButtonStyle}
              textStyle={styles.cancelDatePicketButtonTextStyle}
              text={"Close"}
              onPress={() => this.showHideModal(showIosDateModal)} />
            <CustomButton
              buttonStyle={styles.cancelDatePicketButtonStyle}
              textStyle={styles.cancelDatePicketButtonTextStyle}
              text={"Done"}
              onPress={() => this.doneButtonModalDatePickerClick()} />
          </View>
          <View style={{ backgroundColor: 'white' }}>
            <DatePickerIOS
              date={new Date()}
              maximumDate={new Date()}
              mode="date"
              onDateChange={(date) => this.onDateChange(date)}
            />
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { selectedDate, showIosDateModal } = this.state;
    const { placeHolder, textStyle } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={() => {
          this.openDatePicker();
        }}>
          <CustomText
            style={textStyle ? textStyle : styles.dateTextStyle}>
            {selectedDate ? selectedDate : placeHolder ? placeHolder : 'Select date'}
          </CustomText>
        </TouchableOpacity>
        {showIosDateModal ? this.renderIosDatePickerModalView() : null}
      </View>
    );
  }
};

export default DatePicker;
