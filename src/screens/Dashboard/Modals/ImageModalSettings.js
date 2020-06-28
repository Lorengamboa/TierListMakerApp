import React from "react";
import {
  View,
  Modal,
  Image,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";

import { RaisedTextButton } from "react-native-material-buttons";

import ADBanner from "@components/ADBanner";
import { PREMIUM_MODE } from "@application/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#3d3d3d",
  },
  tier: (color, size) => {
    return {
      height: size,
      width: size,
      marginLeft: 5,
      paddingTop: size / 3,
      fontSize: 10,
      color: "black",
      backgroundColor: color,
      textAlign: "center",
      borderColor: "black",
      borderWidth: 2,
    };
  },
});

const ImageModalSettings = (props) => {
  const { t } = useTranslation();

  function handleOnMoveImage(index) {
    props.onClose(false);
    props.onMoveImage(index);
  }

  function handleOnDeleteImage(index) {
    props.onClose(false);
    props.onDeleteImage();
  }

  //isClearImage
  return (
    <Modal
      visible={props.visible}
      onRequestClose={() => {
        props.onClose(false);
      }}
    >
      <View style={styles.container}>
        <Image
          style={{
            width: 120,
            height: 120,
            margin: 50,
          }}
          source={{
            uri: `data:image/gif;base64,${props.selectedImage.base64}`,
          }}
        />
        <View style={{ height: props.size }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            data={props.labels}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleOnMoveImage(index)}>
                <Text style={styles.tier(item.color, props.size)}>
                  {item.key}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View style={{ flex: 1 }}>
            {props.isClearImage && (
              <RaisedTextButton
                title={t("dashboard:image:clear")}
                style={{ marginTop: 30, width: "100%" }}
                onPress={() => handleOnMoveImage(null)}
                raised
              />
            )}
            <RaisedTextButton
              title={t("dashboard:image:delete")}
              color="red"
              style={{ marginTop: 30, width: "100%", borderWidth: 1 }}
              onPress={() => handleOnDeleteImage()}
              raised
            />
          </View>
        </View>
      </View>

      <ADBanner display={!PREMIUM_MODE} position="bottom" />
    </Modal>
  );
};

export default ImageModalSettings;
