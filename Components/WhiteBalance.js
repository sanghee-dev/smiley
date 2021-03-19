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

const WhiteBalance = ({ whiteBalance, setWhiteBalance }) => (
  <Button
    onPress={() => {
      setWhiteBalance(
        whiteBalance === "auto"
          ? "sunny"
          : whiteBalance === "sunny"
          ? "cloudy"
          : whiteBalance === "cloudy"
          ? "shadow"
          : whiteBalance === "shadow"
          ? "fluorescent"
          : whiteBalance === "fluorescent"
          ? "incandescent"
          : "auto"
      );
    }}
  >
    <Feather
      name={
        whiteBalance === "auto"
          ? "loader"
          : whiteBalance === "sunny"
          ? "sun"
          : whiteBalance === "cloudy"
          ? "cloud"
          : whiteBalance === "shadow"
          ? "cloud-rain"
          : whiteBalance === "fluorescent"
          ? "cloud-drizzle"
          : "cloud-snow"
      }
      size={24}
    />
  </Button>
);

export default WhiteBalance;
