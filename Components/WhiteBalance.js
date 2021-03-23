import React, { useState } from "react";
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

const WhiteBalance = ({ whiteBalance, setWhiteBalance }) => (
  <SwitchBox style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
    <SwitchText>WhiteBalance</SwitchText>
    <Switch
      trackColor={{ false: "#767577", true: "#F0FF09" }}
      thumbColor={whiteBalance === "auto" ? "#ffffff" : "#ffffff"}
      ios_backgroundColor="#ffffff"
      onValueChange={() => {
        setWhiteBalance(
          whiteBalance === "auto"
            ? "sunny"
            : // : whiteBalance === "sunny"
              // ? "cloudy"
              // : whiteBalance === "cloudy"
              // ? "shadow"
              // : whiteBalance === "shadow"
              // ? "fluorescent"
              // : whiteBalance === "fluorescent"
              // ? "incandescent"
              "auto"
        );
      }}
      value={whiteBalance !== "auto"}
    />
  </SwitchBox>
);

export default WhiteBalance;
