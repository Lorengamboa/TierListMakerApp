"use strict";

import React, { Component } from "react";
import { View, Text } from "react-native";
import { ListItem, Button } from "react-native-elements";

import styles from "./styles";
import UPGRADE_LIST from "./config";

export default function Upgrade() {
  return (
    <View style={styles.container}>
      {UPGRADE_LIST.map((l, i) => (
        <ListItem
          key={i}
          bottomDivider
          leftAvatar={{ source: l.icon }}
          title={
            <Text h4 style={{ fontWeight: "bold" }}>
              {l.name}
            </Text>
          }
          subtitle={
            <View>
              <Text>{l.description}</Text>
            </View>
          }
        />
      ))}

      <Button title="Coming soon!" />
    </View>
  );
}
