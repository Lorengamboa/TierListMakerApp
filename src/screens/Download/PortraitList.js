import React from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";

/**
 * @description
 * @param {*} props 
 */
const PortraitList = (props) => {
  function formData(data, numColumns) {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow = numberOfElementsLastRow + 1;
    }

    return data;
  }

  function displayPortraits({ item, index, separators }) {
    return (
      <TouchableOpacity
        onPress={() => props.onClick(item)}
        style={{
          flex: 1,
        }}
      >
        <Image
          style={{
            height: 100,
            margin: 5,
          }}
          source={{
            uri: "http://192.168.1.136/images/" + item.portrait,
          }}
        />
        <Text style={{ color: "white" }}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      data={formData(props.portraits, 3)}
      renderItem={displayPortraits}
      numColumns="3"
    />
  );
};

export default PortraitList;
