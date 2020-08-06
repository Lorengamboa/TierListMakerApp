import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import admobService from "@services/google/admob";
import { PREMIUM_MODE } from "@application/constants";

const Footer = (props) => {
  const { t } = useTranslation();

  function handleOnAddImage() {
    props.onAddImage();
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#252525",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={props.onSettings} underlayColor="#fff">
        <View
          style={{
            flex: 1,
            marginLeft: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="settings" size={25} color="white" style />
          <Text style={{ color: "white", fontSize: 10 }}>
          {t("dashboard:footer:settings")}
            </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onShare} underlayColor="#fff">
        <View
          style={{
            flex: 1,
            marginLeft: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="share" size={25} color="white" />
          <Text style={{ color: "white", fontSize: 10 }}> {t("dashboard:footer:share")}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onReset} underlayColor="#fff">
        <View
          style={{
            flex: 1,
            marginLeft: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="autorenew" size={25} color="white" />
          <Text style={{ color: "white", fontSize: 10 }}> {t("dashboard:footer:reset")}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleOnAddImage}
        underlayColor={"transparent"}
        style={{
          marginLeft: 20,
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          height: 60,
          bottom: 10, //Header.height
          zIndex: 99,
          backgroundColor: "red",
          borderRadius: 100,
        }}
      >
        <Icon name="plus" size={45} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
