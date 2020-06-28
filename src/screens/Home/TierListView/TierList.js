import React, { Component } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

import styles from "./styles";

export default function TierList(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.counterList}>{props.list.length} Lists</Text>
      <FlatList
        data={props.list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={props.onTierPress.bind(this, item.name)}
          >
            <View style={styles.header}>
              {item.portrait ? (
                <Image
                  style={styles.portrait}
                  source={{ uri: item.portrait }}
                />
              ) : (
                <Image
                  style={styles.portrait}
                  source={require("../../../assets/img/logo.png")}
                />
              )}
              <View style={styles.informationContainer}>
                <Text style={styles.textName}>{item.name}</Text>
                <Text style={styles.textDescription}>{item.category}</Text>
              </View>
            </View>
            {item.description ? (
              <View style={styles.descriptionContainer}>
                <Text style={styles.textDescription}>{item.description}</Text>
              </View>
            ) : null}

            <View style={styles.footer}>
              <Text>
                
                <Text style={styles.textDate}>
                  {moment(item.mtime).calendar()}
                  {"     "}
                </Text>
                
                <Text style={styles.textImage}>
                  {" "}
                  {!item.images ? 0 : item.images.length}{" "}
                </Text>
                <Icon name="image" color="white" size={20} />
              </Text>

            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
