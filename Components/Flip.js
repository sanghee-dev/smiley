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

const Flip = ({ type, setType, Camera }) => (
  <LinearGradient
    colors={[
      type !== Camera.Constants.Type.front
        ? "rgb(240,255,120)"
        : "rgb(200,200,200)",
      "white",
    ]}
    locations={[0, 0.6]}
  >
    <SwitchBox style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
      <SwitchText>Flip</SwitchText>
      <Switch
        trackColor={{ false: "#ffffff", true: "#000000" }}
        thumbColor="#ffffff"
        ios_backgroundColor="#ffffff"
        onValueChange={() =>
          setType(
            type === Camera.Constants.Type.front
              ? Camera.Constants.Type.back
              : Camera.Constants.Type.front
          )
        }
        value={type !== Camera.Constants.Type.front}
      />
    </SwitchBox>
  </LinearGradient>
);

export default Flip;
