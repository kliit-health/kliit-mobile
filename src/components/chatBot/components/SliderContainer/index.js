import React, { Component } from "react";
import { View, Slider, Text } from "react-native";
import Button from "../ChatButton";
import styles from "./style";

class SliderContainer extends Component {
  state = { value: 0, disabled: true };

  onButtonPress() {
    this.props.callback(this.props.slider[Number(this.state.value) - 1]);
  }

  onValueChange(value) {
    this.setState({ value, disabled: false });
  }

  render() {
    const ValuesArray = this.props.slider.map((s, key) => (
      <Text key={key}>{s.value}</Text>
    ));

    const MarkersArray = this.props.slider.map((s, key) => (
      <Text key={key} style={{ fontSize: 10, textAlign: "center", width: 50 }}>
        {s.marker}
      </Text>
    ));

    return (
      <View>
        <Slider
          maximumValue={this.props.maximumValue}
          step={this.props.step}
          minimumValue={this.props.minimumValue}
          onValueChange={this.onValueChange.bind(this)}
        />
        <View style={styles.valuesContainerStyle}>{ValuesArray}</View>
        <View style={styles.markersContainerStyle}>{MarkersArray}</View>
        <Button
          style={{ margin: 5 }}
          disabled={this.state.disabled}
          onPress={this.onButtonPress.bind(this)}
        >
          <Text>Continue</Text>
        </Button>
      </View>
    );
  }
}

export default SliderContainer;
