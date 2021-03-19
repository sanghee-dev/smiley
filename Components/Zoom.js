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

const Zoom = ({ zoom, setZoom }) => (
  <Button
    onPress={() => {
      setZoom(zoom === 0 ? 1 : 0);
    }}
  >
    <Feather
      name={zoom === 0 ? "zoom-in" : "zoom-out"}
      size={24}
      color="black"
    />
  </Button>
);

export default Zoom;
