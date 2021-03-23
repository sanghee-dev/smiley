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

const Zoom = ({ zoom, setZoom }) => (
  <SwitchBox style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
    <SwitchText>Zoom</SwitchText>
    <Switch
      trackColor={{ false: "#767577", true: "#F0FF09" }}
      thumbColor={zoom ? "#ffffff" : "#ffffff"}
      ios_backgroundColor="#ffffff"
      onValueChange={() => {
        setZoom(zoom === 0 ? 0.005 : 0);
      }}
      value={zoom !== 0}
    />
  </SwitchBox>
);

export default Zoom;
