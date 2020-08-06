import React from "react";
import { View, Text, StyleSheet } from "react-native";

import * as theme from "@config/theme";

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 23, color: theme.TEXT_BODY_COLOR },
  subtitle: { color: theme.TEXT_BODY_COLOR },
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
