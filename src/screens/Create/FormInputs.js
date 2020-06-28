import React, { Component } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-community/picker";


import categories from "@config/categories";

import styles from "./styles";

const FormInputs = (props) => {
  const { t } = useTranslation();

  return (
    <View style={{}}>
      <Text style={{ textAlign: "center", color: "#DCDCDC", fontSize: 15 }}>
        {props.portrait ? t("create:change_photo") : t("create:add_photo")}
      </Text>

      <Text style={{ color: "#DCDCDC", fontSize: 15 }}>{t("create:name_label")}</Text>
      <TextInput
        value={props.name}
        inputStyle={styles.inputStyle}
        onChangeText={props.onNameChange}
        placeholderTextColor="white"
        style={styles.inputContainerStyle}
      />

      <Text style={{ color: "#DCDCDC", fontSize: 15 }}>{t("create:category_label")}</Text>
      <Picker
        selectedValue={props.category}
        style={{
          borderRadius: 5,
          backgroundColor: "rgba(255, 255, 255, .15)",
          marginBottom: 30,
          color: "white",
        }}
        onValueChange={props.onCategoryChange}
      >
        {categories.map((category) => {
          return <Picker.Item label={category} value={category} />;
        })}
      </Picker>

      <Text style={{ color: "#DCDCDC", fontSize: 15 }}>
      {t("create:description_label")}
      </Text>
      <TextInput
        value={props.description}
        onChangeText={props.onDescriptionChange}
        style={{
          textAlignVertical: 'top',
          marginBottom: 20,
          borderRadius: 5,
          backgroundColor: "rgba(255, 255, 255, .15)",
          color: "white",
        }}
        multiline={true}
        numberOfLines={4}
      />
    </View>
  );
};

export default FormInputs;
