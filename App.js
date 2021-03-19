import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import * as FaceDetector from "expo-face-detector";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const Container = styled.View`
  flex: 1;
`;
const TopContainer = styled.View`
  height: 60px;
  flex-direction: row;
  margin: 20px 0;
`;
const BottomContainer = styled.View`
  flex: 0.45;
  flex-direction: row;
  margin: 20px 0;
`;
const Button = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  color: black;
`;
const CameraContainer = styled.View`
  height: ${WIDTH - 48}px;
  border-radius: 500px;
  overflow: hidden;
  margin: 24px;
  border: 2px solid black;
`;
const Text = styled.Text``;

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [whiteBalance, setWhiteBalance] = useState("auto");

  const askPermisstion = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    askPermisstion();
  }, []);

  return (
    <Container>
      {hasPermission ? (
        <>
          <TopContainer>
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
              <Feather
                name={
                  flashMode === Camera.Constants.FlashMode.off
                    ? "zap"
                    : "zap-off"
                }
                size={24}
              />
            </Button>
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
          </TopContainer>

          <CameraContainer>
            <Camera
              style={{ flex: 1 }}
              type={type}
              flashMode={flashMode}
              zoom={zoom}
              whiteBalance={whiteBalance}
            />
          </CameraContainer>

          <BottomContainer></BottomContainer>
        </>
      ) : (
        <Text>No access to camera</Text>
      )}
    </Container>
  );
}
