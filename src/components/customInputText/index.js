import React, { PureComponent } from "react";
import { Text, View, TextInput, Animated } from "react-native";
import styles from "./style";

class FloatingLabel extends PureComponent {
  constructor(props) {
    super(props);

    let initialPadding = 9;
    let initialOpacity = 0;

    if (this.props.visible) {
      initialPadding = 5;
      initialOpacity = 1;
    }

    this.state = {
      paddingAnim: new Animated.Value(initialPadding),
      opacityAnim: new Animated.Value(initialOpacity),
    };
  }

  componentWillReceiveProps(newProps) {
    Animated.timing(this.state.paddingAnim, {
      toValue: newProps.visible ? 5 : 9,
      duration: 230,
    }).start();

    return Animated.timing(this.state.opacityAnim, {
      toValue: newProps.visible ? 1 : 0,
      duration: 230,
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.floatingLabel,
          {
            paddingTop: this.state.paddingAnim,
            opacity: this.state.opacityAnim,
          },
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

const CustomInputText = (props) => {
  const { style, value, placeholder } = props;
  return (
    <View style={styles.container}>
      <FloatingLabel visible={value}>
        <Text style={[styles.fieldLabel]}>{placeholder}</Text>
      </FloatingLabel>
      <TextInput {...props} style={[styles.valueText, style]} />
    </View>
  );
};

export default CustomInputText;
