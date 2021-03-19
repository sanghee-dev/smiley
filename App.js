import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import * as FaceDetector from "expo-face-detector";
import Flip from "./Components/Flip";
import Zoom from "./Components/Zoom";
import Flash from "./Components/Flash";
import WhiteBalance from "./Components/WhiteBalance";

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
  height: ${WIDTH - 40}px;
  border-radius: 20px;
  overflow: hidden;
  margin: 20px;
  border: 2px solid black;
`;
const Text = styled.Text``;

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [whiteBalance, setWhiteBalance] = useState("auto");
  const [onFacesDetected, setOnFacesDetected] = useState(false);

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
            <Flip type={type} setType={setType} Camera={Camera} />
            <Zoom zoom={zoom} setZoom={setZoom} />
            <Flash
              flashMode={flashMode}
              setFlashMode={setFlashMode}
              Camera={Camera}
            />
            <WhiteBalance
              whiteBalance={whiteBalance}
              setWhiteBalance={setWhiteBalance}
            />
          </TopContainer>

          <CameraContainer>
            <Camera
              style={{ flex: 1 }}
              type={type}
              flashMode={flashMode}
              zoom={zoom}
              whiteBalance={whiteBalance}
              onFacesDetected={onFacesDetected}
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
