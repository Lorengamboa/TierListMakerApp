import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styles from "./styles";

export default function CardImage(props) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={props.colors} style={styles.boxContainer}>
        <TouchableOpacity style={{flex: 1}} onPress={props.onPress}>
          <View style={{ flexDirection: "row", padding: 15 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.content}>{props.children}</Text>
            </View>
            <Image style={styles.image} source={props.image} />

          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
