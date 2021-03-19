import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
`;
const ButtonContainer = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  margin: 20px;
`;
const Button = styled.TouchableOpacity`
  flex: 0.1;
  align-self: flex-end;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 18px;
  color: yellow;
`;

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return (
    <Container>
      {hasPermission ? (
        <Camera style={{ flex: 1 }} type={type}>
          <ButtonContainer>
            <Button
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Title>Flip</Title>
            </Button>
          </ButtonContainer>
        </Camera>
      ) : (
        <Title>No access to camera</Title>
      )}
    </Container>
  );
}
