import React from "react";
import styled from "styled-components/native";
import { Switch } from "react-native";

const SwitchBox = styled.View`
  width: 100%;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;
const SwitchText = styled.Text`
  font-size: 40px;
  font-weight: 200;
`;

const Flash = ({ flashMode, setFlashMode, Camera }) => (
  <SwitchBox style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
    <SwitchText>Flash</SwitchText>
    <Switch
      trackColor={{ false: "#767577", true: "#F0FF09" }}
      thumbColor={
        flashMode === Camera.Constants.FlashMode.off ? "#ffffff" : "#ffffff"
      }
      ios_backgroundColor="#ffffff"
      onValueChange={() => {
        setFlashMode(
          flashMode === Camera.Constants.FlashMode.off
            ? Camera.Constants.FlashMode.on
            : Camera.Constants.FlashMode.off
        );
      }}
      value={flashMode !== Camera.Constants.FlashMode.off}
    />
  </SwitchBox>
);

export default Flash;
