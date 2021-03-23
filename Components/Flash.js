import React from "react";
import styled from "styled-components/native";
import { Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
  <LinearGradient
    colors={[flashMode ? "rgb(240,255,120)" : "rgb(200,200,200)", "white"]}
    locations={[0, 0.6]}
  >
    <SwitchBox style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
      <SwitchText>Flash</SwitchText>
      <Switch
        trackColor={{ false: "#ffffff", true: "#000000" }}
        thumbColor="#ffffff"
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
  </LinearGradient>
);

export default Flash;
