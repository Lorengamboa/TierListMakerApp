import React, { Component } from "react";
import { AppRegistry } from "react-native";
import messaging from '@react-native-firebase/messaging';
import "react-native-gesture-handler";

import "@services/google/admob";

import "./src/i18n";
import App from "./src/App";
import { name as appName } from "./app.json";

messaging().setBackgroundMessageHandler(async remoteMessage => {
  //console.log("Message handled in the background!", remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
