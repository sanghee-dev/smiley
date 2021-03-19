import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import * as FaceDetector from "expo-face-detector";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Flip from "./Components/Flip";
import Zoom from "./Components/Zoom";
import Flash from "./Components/Flash";
import WhiteBalance from "./Components/WhiteBalance";
import { Feather } from "@expo/vector-icons";

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
  const [smileDetected, setSmileDetected] = useState(false);
  const cameraRef = useRef();

  const askPermisstion = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const onFacesDetected = ({ faces }) => {
    const face = faces[0];
    if (face?.smilingProbability > 0.8) {
      setSmileDetected(true);
      takePhoto();
    }
  };

  const takePhoto = async () => {
    try {
      let { uri } = await cameraRef.current?.takePictureAsync({
        quality: 1,
      });
      if (uri) {
        savePhoto(uri);
      }
    } catch (error) {
      alert(error);
      setSmileDetected(false);
    }
  };
  const savePhoto = async (uri) => {};

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
              ref={cameraRef}
              style={{ flex: 1 }}
              type={type}
              flashMode={flashMode}
              zoom={zoom}
              whiteBalance={whiteBalance}
              onFacesDetected={smileDetected ? null : onFacesDetected}
              faceDetectorSettings={{
                mode: FaceDetector.Constants.Mode.fast,
                detectLandmarks: FaceDetector.Constants.Landmarks.all,
                runClassifications: FaceDetector.Constants.Classifications.all,
                minDetectionInterval: 100,
                tracking: true,
              }}
            />
          </CameraContainer>

          <BottomContainer>
            <Button onPress={() => takePhoto()}>
              <Feather name="aperture" size={24} color="black" />
            </Button>
          </BottomContainer>
        </>
      ) : (
        <Text>No access to camera</Text>
      )}
    </Container>
  );
}
