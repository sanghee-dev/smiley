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

const FaceMask = ({ smileMask, setSmileMask }) => (
  <LinearGradient
    colors={[smileMask ? "rgb(240,255,120)" : "rgb(200,200,200)", "white"]}
    locations={[0, 0.6]}
  >
    <SwitchBox style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
      <SwitchText>Smile Mask</SwitchText>
      <Switch
        trackColor={{ false: "#ffffff", true: "#000000" }}
        thumbColor="#ffffff"
        ios_backgroundColor="#ffffff"
        onValueChange={() => setSmileMask((smileMask) => !smileMask)}
        value={smileMask}
      />
    </SwitchBox>
  </LinearGradient>
);

export default FaceMask;
