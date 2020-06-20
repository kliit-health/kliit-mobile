import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  background-color: ${(props) => {
    if (props.disabled && !props.invalid) {
      return "#ddd";
    }
    return "#3591F6";
  }};
  height: 50;
  width: 80;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Button;
