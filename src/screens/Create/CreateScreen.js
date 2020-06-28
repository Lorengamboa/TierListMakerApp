import React, { Component } from "react";
import {
  View,
  ToastAndroid,
} from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import analytics from "@react-native-firebase/analytics";
import ImagePicker from "react-native-image-picker";

import PortraitImageHolder from "./PortraitImageHolder";
import FormInputs from "./FormInputs";

import ADBanner from "@components/ADBanner";

import { PREMIUM_MODE } from "@application/constants";
import { createTier, selectTier } from "@application/core/tiers/actions";
import FS from "@application/utils/FS";

import routes from "@config/routes";

import styles from "./styles";

/**
 * @description Creational tier list view
 */
export class CreateScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      portrait: null,
      category: "",
      description: "",
    };

    // binding methods
    this.onCreate = this.onCreate.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.handleCameraRoll = this.handleCameraRoll.bind(this);
    this.handleGalleryRoll = this.handleGalleryRoll.bind(this);
    this.handleImagePickerResponse = this.handleImagePickerResponse.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
  }

  /*************************************************************/
  /*                                                           */
  /*************************************************************/

  /**
   * @description
   */
  handleCameraRoll = () =>
    ImagePicker.launchCamera({}, this.handleImagePickerResponse);

  /**
   * @description
   */
  handleGalleryRoll = () =>
    ImagePicker.launchImageLibrary({}, this.handleImagePickerResponse);

  /**
   * @description
   * @param {*} response
   */
  handleImagePickerResponse(response) {
    if (response.didCancel) {
      console.info("User cancelled image picker");
    } else if (response.error) {
      console.info("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      console.info("User tapped custom button: ", response.customButton);
    } else {
      const { data, uri } = response;

      const base64Icon = `data:image/png;base64,${data}`;

      this.setState({
        portrait: base64Icon,
      });
    }
  }

  /**
   * If continue button click will procceed to create a tier list
   */
  onCreate() {
    const { name, category, description, portrait } = this.state;
    const { selectTier, createTier, t } = this.props;

    if (name.length !== 0) {
      FS.createDir(name)
        .then((result) => {
          if (result) {
            // google analytics event log
            analytics().logEvent("create_tier", {
              name,
              category,
              description,
            });

            var tierData = {
              ...result,
              name,
              category,
              description,
              portrait,
            };

            createTier(tierData);
            selectTier(name);


            return this.props.navigation.navigate(routes.TIER_LIST_MAKER, { name: name });
          } else
            ToastAndroid.show(
              t("general:tier_unavailable"),
              ToastAndroid.SHORT
            );
        })
        .catch((err) => {
          console.info(err);
          ToastAndroid.show(t("general:error"), ToastAndroid.SHORT);
        });
    }
  }

  /**
   * Observes if the input field tier name is being altered
   */
  onNameChange(text) {
    this.setState({
      name: text,
    });
  }

  onDescriptionChange(text) {
    this.setState({
      description: text,
    });
  }

  onCategoryChange(itemValue, itemIndex) {
    this.setState({ category: itemValue })
  }
  

  render() {
    const { t } = this.props;

    return (
      <View style={styles.container}>

        <PortraitImageHolder onPress={this.handleGalleryRoll} portrait={this.state.portrait} />
        <FormInputs name={this.state.name} category={this.state.category} description={this.state.description} {...this} />
        
        <Button
          onPress={this.onCreate}
          title={t("create:continue_button")}
          buttonStyle={styles.continueButtonStyle}
          titleStyle={styles.continueButtonTitleStyle}
          raised
        />

      <ADBanner display={!PREMIUM_MODE} position="bottom" />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectTier: (tierId) => dispatch(selectTier(tierId)),
  createTier: (tier) => dispatch(createTier(tier)),
});

export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(CreateScreen));
