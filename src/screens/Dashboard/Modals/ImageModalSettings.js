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

import * as theme from "@config/theme";
import ADBanner from "@components/ADBanner";
import { PREMIUM_MODE } from "@application/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: theme.LIGHT_THEME_BACKGROUND_COLOR,
  },
  tier: (color, size) => {
    return {
      flex: 1,
      fontSize: 10,
      minHeight: size,
      width: size * 1.5,
      paddingTop: size / 3,
      paddingBottom: size / 3,
      backgroundColor: color,
      margin: 10,
      borderRadius: 5,
      textAlign: "center",
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
            borderWidth: 1,
            borderColor: "black",
          }}
          source={{
            uri: `data:image/gif;base64,${props.selectedImage.base64}`,
          }}
        />
        <FlatList
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          data={props.labels}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleOnMoveImage(index)}>
              <Text style={styles.tier(item.color, props.size)}>
                {item.key}
              </Text>
            </TouchableOpacity>
          )}
        />
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

      <ADBanner display={!PREMIUM_MODE} position="bottom" />
    </Modal>
  );
};

export default ImageModalSettings;
