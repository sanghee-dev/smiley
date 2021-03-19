import React from "react";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

const Button = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  color: black;
`;
const Text = styled.Text`
  font-size: 14px;
  position: absolute;
`;

const Timer = ({ timer, setTimer }) => (
  <Button
    onPress={() => {
      setTimer(
        timer === 0 ? 3000 : timer === 3000 ? 5000 : timer === 5000 ? 7000 : 0
      );
    }}
  >
    <Feather name={timer === 0 ? "clock" : "circle"} size={24} />
    <Text>
      {timer === 0 ? "" : timer === 3000 ? "3" : timer === 5000 ? "5" : "7"}
    </Text>
  </Button>
);

export default Timer;
