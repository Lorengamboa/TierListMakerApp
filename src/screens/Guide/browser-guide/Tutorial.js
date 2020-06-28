"use strict";

import React, { Component } from "react";
import { View, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Icon from "react-native-vector-icons/FontAwesome";

import slides from "./Slides";
import styles from "./styles";

const Tutorial = props => {

  const _onDone = () => {
    props.navigation.goBack(null);
  };

  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="sign-out" size={15} color="white" />
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="arrow-right" size={15} color="white" />
      </View>
    );
  };

  const _renderItem = ({ item }) => {
    return (
        <Image source={item.image} style={styles.image} />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <AppIntroSlider
        renderItem={_renderItem}
        slides={slides}
        dotStyle={{ backgroundColor: "grey" }}
        onDone={_onDone}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
      />
    </View>
  );
};

export default Tutorial;
