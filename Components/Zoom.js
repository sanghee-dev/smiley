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

const Zoom = ({ zoom, setZoom }) => (
  <LinearGradient colors={["rgb(240,255,120)", "white"]} locations={[0, 0.6]}>
    <SwitchBox style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
      <SwitchText>Zoom</SwitchText>
      <Switch
        trackColor={{ false: "#ffffff", true: "#000000" }}
        thumbColor={zoom ? "#ffffff" : "#ffffff"}
        ios_backgroundColor="#ffffff"
        onValueChange={() => {
          setZoom(zoom === 0 ? 0.005 : 0);
        }}
        value={zoom !== 0}
      />
    </SwitchBox>
  </LinearGradient>
);

export default Zoom;
