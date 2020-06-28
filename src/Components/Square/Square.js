import React from "react";
import { View, TouchableOpacity } from "react-native";

import styles from "./styles";

const Square = props => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.container(props.color, props.outline)}></View>
    </TouchableOpacity>
  );
};

export default Square;
