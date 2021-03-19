import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import * as FaceDetector from "expo-face-detector";
import * as MediaLibrary from "expo-media-library";
import Flip from "./Components/Flip";
import Zoom from "./Components/Zoom";
import Flash from "./Components/Flash";
import WhiteBalance from "./Components/WhiteBalance";
import Timer from "./Components/Timer";
import { Feather } from "@expo/vector-icons";

const ALBUM_NAME = "Smiley";
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
const TimerTextContainer = styled.View`
  width: ${WIDTH - 40}px;
  height: ${WIDTH - 40}px;
  justify-content: center;
  align-items: center;
  position: absolute;
`;
const TimerText = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 80px;
`;
const Text = styled.Text``;

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [whiteBalance, setWhiteBalance] = useState("auto");
  const [smileDetected, setSmileDetected] = useState(false);
  const [timer, setTimer] = useState(0);
  const cameraRef = useRef();

  const askPermission = async () => {
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
      setTimeout(async () => {
        let { uri } = await cameraRef.current?.takePictureAsync({
          quality: 1,
        });
        if (uri) {
          savePhoto(uri);
        }
      }, timer);
    } catch (error) {
      alert(error);
      setSmileDetected(false);
    }
  };
  const savePhoto = async (uri) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(uri);
        let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
        if (album === null) {
          album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album.id);
        }
        setTimeout(() => {
          setSmileDetected(false);
        }, 2000);
      } else {
        setHasPermission(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <Container>
      {hasPermission ? (
        <>
          <TopContainer>
            <Flip type={type} setType={setType} Camera={Camera} />
            <Zoom zoom={zoom} setZoom={setZoom} />
            <Timer timer={timer} setTimer={setTimer} />
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
            <TimerTextContainer>
              <TimerText>{timer !== 0 && timer / 1000}</TimerText>
            </TimerTextContainer>
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
