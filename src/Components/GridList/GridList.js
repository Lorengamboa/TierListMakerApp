import React from "react";
import {
  FlatList,
  TouchableHighlight,
  Image,
  Text,
  View,
  ScrollView,
} from "react-native";
import ViewShot from "react-native-view-shot";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { dimensions } from "@application/utils/screen";

import styles from "./styles";

/**
 * @desc
 * @param {*} props
 */
export default React.forwardRef((props, ref) => {
  const { data, size, onSettingsClick, onImageSelect } = props;

  const numberOfImagesPerRow = Math.floor(dimensions.width / size) - 2;
  const remainingPadding = dimensions.width - (numberOfImagesPerRow + 2) * size;

  /**
   *
   * @param {*} tier
   */
  const handleOnTierConfig = (tier) => {
    onSettingsClick(tier);
  };

  function handleImageSelection(labelIndex, imageIndex) {
    onImageSelect(labelIndex, imageIndex);
  }

  /**
   *
   * @param {*} images
   */
  const renderImages = (labelIndex, images) => {
    return (
      <FlatList
        contentContainerStyle={{ alignSelf: "flex-start" }}
        keyExtractor={(item, index) => index.toString()}
        data={images}
        numColumns={numberOfImagesPerRow}
        renderItem={({ item, index }) => (
          <TouchableHighlight
            onPress={() => handleImageSelection(labelIndex, index)}
          >
            <Image
              style={{
                width: size,
                height: size,
                borderWidth: 2,
                margin: 2,
                borderColor: "black"
              }}
              source={{ uri: `data:image/gif;base64,${item.base64}` }}
            />
          </TouchableHighlight>
        )}
      />
    );
  };
  const renderGrids = () => {
    return data.map((item, index) => {
      return (
        <View style={styles.row}>
          <View style={styles.label(item.color, size)}>
            <Text style={styles.labelText}>{item.key}</Text>
          </View>

          <View style={styles.imageContainer(numberOfImagesPerRow)}>
            {renderImages(index, item.images)}
          </View>

          <TouchableHighlight
            style={styles.icon(size)}
            onPress={handleOnTierConfig.bind(this, index)}
          >
            <MaterialIcon name="settings" size={20} color="white" />
          </TouchableHighlight>
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <ViewShot ref={ref}>{renderGrids()}</ViewShot>
    </ScrollView>
  );
});
