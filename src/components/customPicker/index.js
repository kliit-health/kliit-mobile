import React, { PureComponent } from "react";
import { Picker } from "@react-native-community/picker";

class CustomPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }
  render() {
    return (
      <Picker
        selectedValue={this.state.language}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({ language: itemValue })
        }
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    );
  }
}

export default CustomPicker;
