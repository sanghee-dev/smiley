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
import FaceMask from "./Components/FaceMask";
import Shutter from "./Components/Shutter";
import { LinearGradient } from "expo-linear-gradient";

const ALBUM_NAME = "Smiley";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const Container = styled.View`
  flex: 1;
  padding: 20px 0;
`;
const SwitchContainer = styled.ScrollView`
  height: 300px;
  border: 1px solid black;
`;
const CameraContainer = styled.View`
  height: ${HEIGHT - 70 * 5 - 80}px;
  border-radius: 40px;
  overflow: hidden;
  margin: 20px;
  border: 1px solid black;
`;
const ErrorText = styled.Text``;
const LeftEye = styled.View`
  width: 10px;
  height: 20px;
  position: absolute;
  border-radius: 20px;
`;
const RightEye = styled.View`
  width: 10px;
  height: 20px;
  position: absolute;
  border-radius: 20px;
`;
const Mouth = styled.View`
  width: 50px;
  height: 25px;
  position: absolute;
  border: 1.5px solid black;
  flex-direction: row;
  justify-content: space-between;
`;
const MouthEnd = styled.View`
  width: 3px;
  height: 3px;
  background-color: black;
  border-radius: 50px;
  position: relative;
`;
const Face = styled.View`
  width: 100px;
  height: 100px;
  position: absolute;
  border: 1.5px solid black;
`;

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const filters = [
    "Auto",
    "Sunny",
    "Cloudy",
    "Shadow",
    "Fluorescent",
    "Incandescent",
  ];
  const [filtersIndex, setFiltersIndex] = useState(0);
  const [smileDetected, setSmileDetected] = useState(false);
  const [smilePercent, setSmilePercent] = useState(0.5);
  const [timer, setTimer] = useState(0);
  const [timering, setTimering] = useState(false);
  const cameraRef = useRef();
  const [smileMask, setSmileMask] = useState(true);
  const [leftEyePosition, setLeftEyePosition] = useState();
  const [rightEyePosition, setRightEyePosition] = useState();
  const [mouthPosition, setMouthPosition] = useState();
  const [facePosition, setFacePosition] = useState();
  const [close, setClose] = useState();

  const askPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const onFacesDetected = ({ faces }) => {
    const face = faces[0];

    setLeftEyePosition(face?.leftEyePosition);
    setRightEyePosition(face?.rightEyePosition);
    setMouthPosition(face?.bottomMouthPosition);
    setFacePosition(face?.bounds?.origin);

    setClose(Math.floor(face?.bounds?.size?.width) / 100);
    setSmilePercent(face?.smilingProbability.toFixed(1) * 100 || 0);
    if (face?.smilingProbability > 0.91) {
      setSmileDetected(true);
      takePhoto();
    }
  };
  const takePhoto = async () => {
    setTimering(true);
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
        setTimering(false);
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
        locations={[0, 0.6]}
      >
        {hasPermission ? (
          <>
            <SwitchContainer>
              <FaceMask
                smileMask={smileMask}
                setSmileMask={setSmileMask}
                smilePercent={smilePercent}
              />
              <Timer timer={timer} setTimer={setTimer} />
              <Flip type={type} setType={setType} Camera={Camera} />
              <WhiteBalance
                filters={filters}
                filtersIndex={filtersIndex}
                setFiltersIndex={setFiltersIndex}
              />
              <Flash
                flashMode={flashMode}
                setFlashMode={setFlashMode}
                Camera={Camera}
              />
              <Zoom zoom={zoom} setZoom={setZoom} />
            </SwitchContainer>

            <CameraContainer>
              <Camera
                ref={cameraRef}
                style={{ flex: 1 }}
                type={type}
                flashMode={flashMode}
                zoom={zoom}
                whiteBalance={filters[filtersIndex]}
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

              {smileMask && (
                <>
                  <Face
                    style={{
                      transform: [
                        { scaleX: close || 1 },
                        { scaleY: close || 1 },
                      ],
                      left: facePosition?.x + (50 * close) / 2 || 0,
                      top: facePosition?.y + (50 * close) / 2 || 0,
                      borderColor: facePosition ? "black" : "transparent",
                      backgroundColor: facePosition
                        ? "rgb(240,255,120)"
                        : "transparent",
                      borderRadius: 100,
                    }}
                  />
                  <LeftEye
                    style={{
                      transform: [
                        { scaleX: close || 1 },
                        { scaleY: close || 1 },
                        {
                          rotateZ:
                            Math.round(
                              rightEyePosition?.y - leftEyePosition?.y
                            ) / 40 || 0,
                        },
                      ],
                      left: leftEyePosition?.x - 0 || 0,
                      top: leftEyePosition?.y - 10 || 0,
                      backgroundColor: leftEyePosition
                        ? "black"
                        : "transparent",
                    }}
                  />
                  <RightEye
                    style={{
                      transform: [
                        { scaleX: close || 1 },
                        { scaleY: close || 1 },
                        {
                          rotateZ:
                            Math.round(
                              rightEyePosition?.y - leftEyePosition?.y
                            ) / 40 || 0,
                        },
                      ],
                      left: rightEyePosition?.x - 10 || 0,
                      top: rightEyePosition?.y - 10 || 0,
                      backgroundColor: rightEyePosition
                        ? "black"
                        : "transparent",
                    }}
                  />
                  <Mouth
                    style={{
                      transform: [
                        { scaleX: close || 1 },
                        { scaleY: close || 1 },
                        {
                          rotateZ:
                            Math.round(
                              rightEyePosition?.y - leftEyePosition?.y
                            ) / 40 || 0,
                        },
                      ],
                      left: mouthPosition?.x - 25 || 0,
                      top: mouthPosition?.y - 25 || 0,
                      borderTopWidth: 1,
                      borderTopColor: "transparent",
                      borderBottomLeftRadius: 50,
                      borderBottomRightRadius: 50,
                      borderColor: mouthPosition ? "black" : "transparent",
                    }}
                  >
                    <MouthEnd
                      style={{
                        bottom: 1,
                        right: 2,
                        transform: [{ scaleX: 2 }],
                      }}
                    />
                    <MouthEnd
                      style={{
                        bottom: 1,
                        right: -2,
                        transform: [{ scaleX: 2 }],
                      }}
                    />
                  </Mouth>
                </>
              )}
            </CameraContainer>

            <Shutter onPress={takePhoto} timering={timering} />
          </>
        ) : (
          <ErrorText>No access to camera</ErrorText>
        )}
      </LinearGradient>
    </Container>
  );
}
