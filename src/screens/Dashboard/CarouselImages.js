import React from "react";
import { View, Text, Image, FlatList, TouchableNativeFeedback } from "react-native";

import { dimensions } from "@application/utils/screen";

/**
 * 
 * @param {*} props 
 */
const CarouselImages = (props) => {

  const numberOfImagesPerRow = Math.floor(dimensions.width / props.dimensions) - 2;

  function handleImageSelection(image) {
    props.onImageSelect(null, image);
  }

  return (
    !props.images.length ?
      (
        <TouchableNativeFeedback onPress={props.onAddImage}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              position: 'absolute',
              width: props.dimensions,
              height: props.dimensions,
              backgroundColor: "#E2E2E2",
              marginLeft: 10,
              marginTop: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 30 }}>+</Text>
          </View>
        </TouchableNativeFeedback>)

      : <FlatList
        numColumns={numberOfImagesPerRow}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ justifyContent: "center", paddingLeft: 15 }}
        data={props.images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index, separators }) =>
          item && (
            <View>
              <TouchableNativeFeedback onPress={() => handleImageSelection(index)}>
                <Image
                  style={{
                    width: props.dimensions,
                    height: props.dimensions,
                    backgroundColor: "white",
                    borderColor: "black",
                    borderWidth: 1,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                  source={{ uri: `data:image/gif;base64,${item.base64}` }}
                  getItemLayout={(data, index) => ({
                    length: props.dimensions,
                    offset: props.dimensions * index,
                    index,
                  })}
                />
              </TouchableNativeFeedback>
              {
                index === props.images.length - 1 &&
                <TouchableNativeFeedback onPress={props.onAddImage}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      position: 'absolute',
                      width: props.dimensions,
                      height: props.dimensions,
                      backgroundColor: "#E2E2E2",
                      marginLeft: props.dimensions + 20,
                      marginTop: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 30 }}>+</Text>
                  </View>
                </TouchableNativeFeedback>
              }
            </View>
          )
        }
      >

      </FlatList>
  );
};

export default CarouselImages;
