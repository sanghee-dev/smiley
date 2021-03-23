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

const Timer = ({ timer, setTimer }) => {
  const [timerTime, setTimerTime] = useState(3000);

  return (
    <SwitchBox style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
      <SwitchText>Timer</SwitchText>
      <Switch
        trackColor={{ false: "#767577", true: "#F0FF09" }}
        thumbColor={timer === 0 ? "#ffffff" : "#ffffff"}
        ios_backgroundColor="#ffffff"
        onValueChange={() => {
          setTimer(timer === 0 ? timerTime : 0);
        }}
        value={timer !== 0}
      />
    </SwitchBox>
  );
};
export default Timer;
