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

const Flash = ({ flashMode, setFlashMode, Camera }) => (
  <Button
    onPress={() => {
      setFlashMode(
        flashMode === Camera.Constants.FlashMode.off
          ? Camera.Constants.FlashMode.on
          : Camera.Constants.FlashMode.off
      );
    }}
  >
    <Feather
      name={flashMode === Camera.Constants.FlashMode.off ? "zap" : "zap-off"}
      size={24}
    />
  </Button>
);

export default Flash;
