import React from "react";
import { View } from "react-native";
import { AdMobBanner } from "react-native-admob";

import { admobBannerID } from "@config/admob";

import styles from './styles';

/**
 * ADSense Banner
 * @param {*} props 
 */
const ADBanner = props => {
  const position = styles[props.position];
  return (
    <View style={[styles.container, position]}>
      {props.display && (
        <AdMobBanner
          adSize="smartBannerPortrait"
          adUnitID={admobBannerID} // should be pass as prop LOL
          testDevices={[AdMobBanner.simulatorId]}
        />
      )}
    </View>
  );
};

export default ADBanner;
