import React from "react";
import { View } from "react-native";
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob';

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
        <BannerAd
          //adSize="smartBannerPortrait"
          unitId={admobBannerID}
          size={BannerAdSize.SMART_BANNER}
          //testDevices={[AdMobBanner.simulatorId]}
        />
      )}
    </View>
  );
};

export default ADBanner;
