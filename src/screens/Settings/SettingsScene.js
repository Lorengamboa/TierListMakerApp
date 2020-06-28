import React, { useState } from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-community/picker";

import { selectLanguage } from "@application/core/general/actions";

import available_languages from "@config/languages";

import styles from "./styles";

const selectedLanguageSelector = createSelector(
  state => state.general,
  general => general.language
);

/**
 * @description Settings Scene
 */
const SettingsScene = () => {
  const selected_language = useSelector(selectedLanguageSelector);

  const [language, setLanguage] = useState(selected_language);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  /**
   * handle language selection
   * @param {*} lng
   */
  const handleChangeLanguage = lng => {
    dispatch(selectLanguage(lng));
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  /**
   * renders available languages
   */
  function renderLanguageOptions() {
    const languages = Object.keys(available_languages);

    return languages.map((lng, id) => {
      return <Picker.Item key={id} label={lng} value={available_languages[lng]} />;
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t("settings:title")}</Text>
        <Picker
          style={{backgroundColor: "#515151"}}
          selectedValue={language}
          onValueChange={(language, itemIndex) =>
            handleChangeLanguage(language)
          }
        >
          {renderLanguageOptions()}
        </Picker>
      </View>
    </View>
  );
};

export default SettingsScene;
