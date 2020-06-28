import React from "react";
import { View, Modal, FlatList, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import {  Input } from "react-native-elements";
import { RaisedTextButton } from "react-native-material-buttons";

import ADBanner from "@components/ADBanner";
import Circle from "@components/Circle";
import { PREMIUM_MODE } from "@application/constants";
import { labelMainColors } from "@config/tierList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#3d3d3d",
  },
  label: (color, size) => {
    return {
      marginTop: 50,
      height: size,
      width: size,
      paddingTop: size / 4,
      color: "black",
      backgroundColor: color,
      borderColor: "black",
      borderWidth: 3,
    };
  },
  labelText: {
    fontSize: 20,
    textAlign: "center",
  },
});

const LabelModalSettings = (props) => {
  const { t } = useTranslation();

  function handleOncolorSelect(item) {
    props.onColorSelect(item);
  }

  function handleOnLabelChange(text) {
    props.onLabelChange(text);
  }

  function handleOnRemoveLabel() {
    props.onClose();
    props.onRemoveRow();
  }

  function handleOnAddLabel(direction) {
    props.onClose();
    props.onAddLabel(direction);
  }

  
  return (
    <Modal
      visible={props.visible}
      onRequestClose={() => {
        props.onClose(false);
      }}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.label(props.selectedLabel.color, props.size)}>
            <Text style={styles.labelText}>{props.selectedLabel.key}</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "white" }}>{t("dashboard:label:name_label")}</Text>
          <Input
            placeholderTextColor="white"
            inputStyle={{ color: "white" }}
            onChangeText={(value) => handleOnLabelChange(value)}
            containerStyle={{
              marginTop: 5,
              marginBottom: 30,
              backgroundColor: "#2a2a2a",
            }}
            defaultValue={props.selectedLabel.key}
          />
        </View>

        <View style={{ height: 35, margin: 10 }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            data={labelMainColors}
            renderItem={({ item, index }) => (
              <View style={{ marginLeft: 10 }}>
                <Circle
                  onSelect={handleOncolorSelect.bind(this, item)}
                  color={item}
                  outline={true}
                />
              </View>
            )}
          />
        </View>

        <View style={{ borderBottomColor: "white", borderBottomWidth: 2}}>
        <Text style={{ color: "white" }}>{t("dashboard:label:add_label")}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent:'space-between'}}>
          <RaisedTextButton
            title={t("dashboard:label:add_above")}
            style={{ marginTop: 30, width: "45%" }}
            onPress={() => handleOnAddLabel("above")}
            raised
          />

          <RaisedTextButton
            title={t("dashboard:label:add_below")}
            style={{ marginTop: 30, width: "45%" }}
            onPress={() => handleOnAddLabel("below")}
            raised
          />
        </View>
        
        <RaisedTextButton
          title={t("dashboard:label:delete")}
          color="red"
          style={{ marginTop: 30, width: "100%", borderWidth: 1 }}
          onPress={handleOnRemoveLabel}
          raised
        />
        <ADBanner display={!PREMIUM_MODE} position="bottom" />
      </View>
    </Modal>
  );
};

export default LabelModalSettings;
