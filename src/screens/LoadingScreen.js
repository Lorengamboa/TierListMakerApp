import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  info: { marginTop: 10, color: "white", fontSize: 15 },
});

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 100,
          height: 100,
        }}
        source={require("../assets/img/logo.png")}
      />
      <Text style={styles.info}>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;
