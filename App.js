import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

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
  flex: 1;
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
`;
const Title = styled.Text`
  font-size: 18px;
  color: yellow;
`;

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [whiteBalance, setWhiteBalance] = useState("auto");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return (
    <Container>
      {hasPermission ? (
        <Camera
          style={{ flex: 1 }}
          type={type}
          flashMode={flashMode}
          zoom={zoom}
          whiteBalance={whiteBalance}
        >
          <ButtonContainer>
            <Button
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.front
                    ? Camera.Constants.Type.back
                    : Camera.Constants.Type.front
                );
              }}
            >
              <Feather
                name={type === Camera.Constants.Type.back ? "frown" : "smile"}
                size={24}
                color="yellow"
              />
            </Button>

            <Button
              onPress={() => {
                setFlashMode(
                  flashMode === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            >
              <Title>
                <Feather
                  name={
                    flashMode === Camera.Constants.FlashMode.off
                      ? "zap"
                      : "zap-off"
                  }
                  size={24}
                  color="yellow"
                />
              </Title>
            </Button>

            <Button
              onPress={() => {
                setZoom(zoom === 0 ? 1 : 0);
              }}
            >
              <Title>
                <Feather
                  name={zoom === 0 ? "zoom-in" : "zoom-out"}
                  size={24}
                  color="yellow"
                />
              </Title>
            </Button>

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
              <Title>
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
                  color="yellow"
                />
              </Title>
            </Button>
          </ButtonContainer>
        </Camera>
      ) : (
        <Title>No access to camera</Title>
      )}
    </Container>
  );
}
