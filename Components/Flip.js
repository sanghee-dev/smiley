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

const Flip = ({ type, setType, Camera }) => (
  <SwitchBox style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
    <SwitchText>Flip</SwitchText>
    <Switch
      trackColor={{ false: "#767577", true: "#F0FF09" }}
      thumbColor={type === Camera.Constants.Type.front ? "#ffffff" : "#ffffff"}
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
);

export default Flip;
