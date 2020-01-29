/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import CustomText from '../customText';
import styles from './style';
import CustomButton from '../customButton';
import { SearchBar } from 'react-native-elements';

class CustomSelectModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.stateArr = [
      {
        "value": "Alabama",
        "code": "AL"
      },
      {
        "value": "Alaska",
        "code": "AK"
      },
      {
        "value": "American Samoa",
        "code": "AS"
      },
      {
        "value": "Arizona",
        "code": "AZ"
      },
      {
        "value": "Arkansas",
        "code": "AR"
      },
      {
        "value": "California",
        "code": "CA"
      },
      {
        "value": "Colorado",
        "code": "CO"
      },
      {
        "value": "Connecticut",
        "code": "CT"
      },
      {
        "value": "Delaware",
        "code": "DE"
      },
      {
        "value": "District Of Columbia",
        "code": "DC"
      },
      {
        "value": "Federated States Of Micronesia",
        "code": "FM"
      },
      {
        "value": "Florida",
        "code": "FL"
      },
      {
        "value": "Georgia",
        "code": "GA"
      },
      {
        "value": "Guam",
        "code": "GU"
      },
      {
        "value": "Hawaii",
        "code": "HI"
      },
      {
        "value": "Idaho",
        "code": "ID"
      },
      {
        "value": "Illinois",
        "code": "IL"
      },
      {
        "value": "Indiana",
        "code": "IN"
      },
      {
        "value": "Iowa",
        "code": "IA"
      },
      {
        "value": "Kansas",
        "code": "KS"
      },
      {
        "value": "Kentucky",
        "code": "KY"
      },
      {
        "value": "Louisiana",
        "code": "LA"
      },
      {
        "value": "Maine",
        "code": "ME"
      },
      {
        "value": "Marshall Islands",
        "code": "MH"
      },
      {
        "value": "Maryland",
        "code": "MD"
      },
      {
        "value": "Massachusetts",
        "code": "MA"
      },
      {
        "value": "Michigan",
        "code": "MI"
      },
      {
        "value": "Minnesota",
        "code": "MN"
      },
      {
        "value": "Mississippi",
        "code": "MS"
      },
      {
        "value": "Missouri",
        "code": "MO"
      },
      {
        "value": "Montana",
        "code": "MT"
      },
      {
        "value": "Nebraska",
        "code": "NE"
      },
      {
        "value": "Nevada",
        "code": "NV"
      },
      {
        "value": "New Hampshire",
        "code": "NH"
      },
      {
        "value": "New Jersey",
        "code": "NJ"
      },
      {
        "value": "New Mexico",
        "code": "NM"
      },
      {
        "value": "New York",
        "code": "NY"
      },
      {
        "value": "North Carolina",
        "code": "NC"
      },
      {
        "value": "North Dakota",
        "code": "ND"
      },
      {
        "value": "Northern Mariana Islands",
        "code": "MP"
      },
      {
        "value": "Ohio",
        "code": "OH"
      },
      {
        "value": "Oklahoma",
        "code": "OK"
      },
      {
        "value": "Oregon",
        "code": "OR"
      },
      {
        "value": "Palau",
        "code": "PW"
      },
      {
        "value": "Pennsylvania",
        "code": "PA"
      },
      {
        "value": "Puerto Rico",
        "code": "PR"
      },
      {
        "value": "Rhode Island",
        "code": "RI"
      },
      {
        "value": "South Carolina",
        "code": "SC"
      },
      {
        "value": "South Dakota",
        "code": "SD"
      },
      {
        "value": "Tennessee",
        "code": "TN"
      },
      {
        "value": "Texas",
        "code": "TX"
      },
      {
        "value": "Utah",
        "code": "UT"
      },
      {
        "value": "Vermont",
        "code": "VT"
      },
      {
        "value": "Virgin Islands",
        "code": "VI"
      },
      {
        "value": "Virginia",
        "code": "VA"
      },
      {
        "value": "Washington",
        "code": "WA"
      },
      {
        "value": "West Virginia",
        "code": "WV"
      },
      {
        "value": "Wisconsin",
        "code": "WI"
      },
      {
        "value": "Wyoming",
        "code": "WY"
      }
    ];
    this.state = {
      data: this.stateArr,
      search: '',
      selectedState: '',
    };
  }

  render() {
    const { data, search } = this.state;
    const { onSelection, onClose } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => { }}
        visible={true}>
        <View style={styles.modalParentContainer}>
          <View style={styles.modalSelectStateContainer}>
            <FlatList
              data={data}
              ItemSeparatorComponent={() => (
                <View style={styles.saparatorStyle} />
              )}
              ListEmptyComponent={
                () => (
                  <View style={styles.emptyContainerStyle}>
                    <CustomText style={styles.emptyTextStyle}>{"No Data available"}</CustomText>
                  </View>
                )
              }
              ListHeaderComponent={
                <SearchBar
                  containerStyle={styles.searchBarContaineStyle}
                  inputContainerStyle={styles.searchBarInputContainerStyle}
                  inputStyle={styles.searchBarInputTextStyle}
                  placeholder="Search Here..."
                  lightTheme
                  onChangeText={text => {
                    const newData = this.stateArr.filter(item => {
                      const itemData = item.value.toUpperCase()
                      const textData = text.toUpperCase();
                      return itemData.indexOf(textData) > -1;
                    });
                    this.setState({ data: newData, search: text });
                  }}
                  autoCorrect={false}
                  value={search}
                />
              }
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      search: '',
                      selectedState: item.value,
                      data: this.stateArr
                    })
                    onSelection(item);
                  }}
                  style={styles.stateTextContainerStyle}>
                  <CustomText style={styles.stateTextStyle}> {item.value} </CustomText>
                </TouchableOpacity>
              )}
            />
            <CustomButton
              buttonStyle={styles.cancelSelectStateButtonStyle}
              textStyle={styles.cancelSelectStateButtonTextStyle}
              text={"Close"}
              onPress={() => {
                this.setState({
                  data: this.stateArr,
                  search: '',
                });
                onClose();
              }} />
          </View>
        </View>
      </Modal>
    );
  }
};

export default CustomSelectModal;
