import React from "react";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

const Button = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  color: black;
`;

const Flip = ({ type, setType, Camera }) => (
  <Button
    onPress={() => {
      setType(
        type === Camera.Constants.Type.front
          ? Camera.Constants.Type.back
          : Camera.Constants.Type.front
      );
    }}
  >
    <Feather
      name={type === Camera.Constants.Type.back ? "frown" : "smile"}
      size={24}
    />
  </Button>
);

export default Flip;
