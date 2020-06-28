import React, { useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import NativeForms from "native-forms";

const AboutScene = () => {
  const [hasForm, showForm] = useState(false);
  const show = () => showForm(true);
  const hide = () => showForm(false);

  return (
    <View style={styles.container}>
      <Text>Your opinion is important to us!</Text>

      <TouchableOpacity style={styles.button}>
        <Button title="Open Form" onPress={show} color="#20f" />
      </TouchableOpacity>
      {hasForm && (
        <NativeForms
          form="https://my.nativeforms.com/TBDVm1jZmolQxpHNT1Db"
          onClose={hide}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 20
  }
});

export default AboutScene;
