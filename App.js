import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import * as FaceDetector from "expo-face-detector";
import * as MediaLibrary from "expo-media-library";
import { Feather } from "@expo/vector-icons";
import Flip from "./Components/Flip";
import Zoom from "./Components/Zoom";
import Flash from "./Components/Flash";
import WhiteBalance from "./Components/WhiteBalance";
import Timer from "./Components/Timer";
import { LinearGradient } from "expo-linear-gradient";

const ALBUM_NAME = "Smiley";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const Container = styled.View`
  flex: 1;
  padding: 20px 0;
`;
const SwitchContainer = styled.ScrollView`
  height: 280px;
  border: 1px solid black;
`;
const CameraContainer = styled.View`
  height: ${WIDTH - 40}px;
  border-radius: 40px;
  overflow: hidden;
  margin: 20px;
  border: 1px solid black;
`;
const TimerTextContainer = styled.View`
  width: ${WIDTH - 40}px;
  height: ${WIDTH - 40}px;
  justify-content: center;
  align-items: center;
  position: absolute;
`;
const TimerText = styled.Text`
  color: rgba(240, 255, 9, 0.6);
  font-size: 120px;
  font-weight: 100;
`;
const ShutterContainer = styled.View`
  flex: 0.45;
  flex-direction: row;
  margin: 20px 0;
`;
const Shutter = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  color: black;
`;
const ErrorText = styled.Text``;

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
    if (face?.smilingProbability > 0.9) {
      setSmileDetected(true);
      takePhoto();
    }
  };
  const takePhoto = async () => {
    try {
      if (timer > 0) {
        let count = timer;
        const repeat = setInterval(() => {
          count = count - 1000;
          setTimer(count);
          if (count < 1) {
            clearInterval(repeat);
          }
        }, 1000);
      }
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
      <LinearGradient
        colors={["rgb(240,255,120)", "white"]}
        locations={[0, 0.4]}
      >
        {hasPermission ? (
          <>
            <SwitchContainer>
              <LinearGradient colors={["rgb(240,255,120)", "red"]}>
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
              </LinearGradient>
            </SwitchContainer>

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
                  runClassifications:
                    FaceDetector.Constants.Classifications.all,
                  minDetectionInterval: 100,
                  tracking: true,
                }}
              />
              <TimerTextContainer>
                <TimerText>{timer !== 0 && timer / 1000}</TimerText>
              </TimerTextContainer>
            </CameraContainer>

            <ShutterContainer>
              <Shutter onPress={() => takePhoto()}>
                <Feather name="aperture" size={24} color="black" />
              </Shutter>
            </ShutterContainer>
          </>
        ) : (
          <ErrorText>No access to camera</ErrorText>
        )}
      </LinearGradient>
    </Container>
  );
}
