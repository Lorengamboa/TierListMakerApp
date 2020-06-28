import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import styles from "./styles";

export default function PortraitImageHolder(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.portraitContainer}>
        {props.portrait ? (
          <Image
            style={styles.portraitImage}
            source={{ uri: props.portrait }}
          />
        ) : (
          <Text style={{ color: "#515151", fontSize: 50 }}>+</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
