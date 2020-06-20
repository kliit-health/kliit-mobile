import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

const Review = (props) => {
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    age: "",
  });

  useEffect(() => {
    const { steps } = props;
    const { first_name, last_name, gender, age } = steps;
    setState({ first_name, last_name, gender, age });
  }, [props]);

  const { first_name, last_name, gender, age } = state;

  console.log(state);
  return (
    <View style={{ width: "100%" }}>
      <Text>Summary</Text>

      <Text>First Name</Text>
      <Text>{first_name.value}</Text>

      <Text>Last Name</Text>
      <Text>{last_name.value}</Text>

      <Text>Gender</Text>
      <Text>{gender.value}</Text>

      <Text>Age</Text>
      <Text>{age.value}</Text>
    </View>
  );
};

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

export default Review;
