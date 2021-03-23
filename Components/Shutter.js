import React from "react";
import styled from "styled-components/native";
import { Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SwitchBox = styled.TouchableOpacity`
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

const Shutter = ({ onPress, timering }) => (
  <LinearGradient
    colors={[!timering ? "rgb(240,255,120)" : "rgb(200,200,200)", "white"]}
    locations={[0, 0.6]}
  >
    <SwitchBox
      style={{
        borderTopColor: "black",
        borderTopWidth: 1,
        borderBottomColor: "black",
        borderBottomWidth: 1,
      }}
      onPress={onPress}
    >
      <SwitchText>Shutter</SwitchText>
      <Switch
        trackColor={{ false: "#ffffff", true: "#000000" }}
        thumbColor="#ffffff"
        ios_backgroundColor="#ffffff"
        onValueChange={() => {}}
        value={!timering}
      />
    </SwitchBox>
  </LinearGradient>
);

export default Shutter;
