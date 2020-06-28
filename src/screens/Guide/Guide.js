import React, { Component } from "react";
import { View, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { useTranslation } from "react-i18next";

import guideList from "./list";

import { colors } from "@application/constants";

import styles from "./styles";

/**
 * @description Manual screen
 * @param {*} props
 */
const GuideScene = props => {
  const { t } = useTranslation();

  console.log(t("instructions"));
  return (
    <View style={styles.container}>
      {guideList(t).map((l, i) => (
        <ListItem
          key={i}
          onPress={() => props.navigation.navigate(l.scene)}
          containerStyle={styles.listItem}
          leftElement={
            <Avatar
              rounded
              title={String(i + 1)}
              overlayContainerStyle={{ backgroundColor: colors[i] }}
            />
          }
          title={<Text style={styles.title}>{l.name}</Text>}
          subtitle={<Text style={styles.subtitle}>{l.subtitle}</Text>}
          bottomDivider
        />
      ))}
    </View>
  );
};

export default GuideScene;
