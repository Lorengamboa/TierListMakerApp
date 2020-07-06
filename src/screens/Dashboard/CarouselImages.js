import React from "react";
import { Image, FlatList, TouchableHighlight } from "react-native";

const CarouselImages = (props) => {
  function handleImageSelection(image) {
    props.onImageSelect(null, image);
  }

  return (
    <FlatList
      numColumns={5}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
      data={props.images}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) =>
        item && (
          <TouchableHighlight onPress={() => handleImageSelection(index)}>
            <Image
              style={{
                width: props.dimensions,
                height: props.dimensions,
                backgroundColor: "white",
                borderColor: "black",
                borderWidth: 2,
                margin: 5,
                borderRadius: 5,
              }}
              source={{ uri: `data:image/gif;base64,${item.base64}` }}
              getItemLayout={(data, index) => ({
                length: props.dimensions,
                offset: props.dimensions * index,
                index,
              })}
            />
          </TouchableHighlight>
        )
      }
    />
  );
};

export default CarouselImages;
