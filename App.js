import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);

  const askPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Smiley:)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
