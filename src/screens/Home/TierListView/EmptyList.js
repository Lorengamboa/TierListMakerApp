import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 23, color: "white" },
  subtitle: { color: "white" },
});

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You don't have any lists!</Text>
      <Text style={styles.subtitle}>Press the + button to get started.</Text>
    </View>
  );
};

export default EmptyList;
