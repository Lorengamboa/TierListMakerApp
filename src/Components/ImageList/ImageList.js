import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import Image from "react-native-image-progress";
import Progress from "react-native-progress";
import styles from "./styles";

/**
 * @description List of images
 */
function ImageList(props) {
  const { images, onImageSelected, onBottomTouch } = props;

  /**
   * User selects an image from the image list
   * @param {*} img
   */
  const selectImage = img => {
    return onImageSelected(img);
  };

  /**
   * Renders a list of images based upon a query search
   */
  const renderImages = function() {
    return images.map(image => {
      return (
          <TouchableOpacity onPressIn={() => selectImage(image.url)}>
            <Image
              indicator={Progress}
              style={styles.image}
              source={{ uri: image.url }}
            />
          </TouchableOpacity>
      );
    });
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 5;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  
  return (
    <ScrollView style={styles.scrollContainer}     
        onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          onBottomTouch();
        }
      }}
      scrollEventThrottle={400}
      >
      <View style={styles.sectionContainer}>{renderImages()}</View>
    </ScrollView>
  );
}

export default ImageList;
