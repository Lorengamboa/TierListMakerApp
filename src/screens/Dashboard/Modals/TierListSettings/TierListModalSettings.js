import React, { Component } from "react";
import {
  View,
  Image,
  ToastAndroid,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import analytics from "@react-native-firebase/analytics";
import { Picker } from "@react-native-community/picker";
import ImagePicker from "react-native-image-picker";

import FileSystem from "@application/utils/FS";
import {
  deleteTier,
  selectTier,
  updatePortrait,
  updateDescription,
  updateCategory,
  updateName,
} from "@application/core/tiers/actions";

import categories from "@config/categories";
import routes from "@config/routes";

import styles from "./styles";

/**
 * @description Creational tier list view
 */
export class TierListModalSettings extends Component {
  constructor(props) {
    super(props);
    const { name, portrait, category, description } = props.tier;
    this.state = {
      name,
      portrait,
      category,
      description,
    };

    // binding methods
    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.handleCameraRoll = this.handleCameraRoll.bind(this);
    this.handleGalleryRoll = this.handleGalleryRoll.bind(this);
    this.handleImagePickerResponse = this.handleImagePickerResponse.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
    this.popDeleteAlert = this.popDeleteAlert.bind(this);
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

      this.props.updatePortrait(base64Icon);
      this.setState({
        portrait: base64Icon,
      });
    }
  }

  /**
   * Observes if the input field tier name is being altered
   */
  onNameChange(text) {
    this.props.updateName(text);
    this.setState({
      name: text,
    });
  }

  onDescriptionChange(text) {
    this.props.updateDescription(text);
    this.setState({
      description: text,
    });
  }

  /**
   * @description
   */
  popDeleteAlert() {
    const { t } = this.props;

    Alert.alert(
      t("dashboard:settings:warning_delete_header"),
      t("dashboard:settings:warning_delete_description"),
      [
        {
          text: t("general:cancel"),
          onPress: () => null,
          style: "cancel",
        },
        { text: t("general:ok"), onPress: () => this.deleteTemplate() },
      ],
      { cancelable: false }
    );
  }

  /**
   * @description
   */
  deleteTemplate() {
    this.props.deleteTier(this.props.selectedTier);
    this.props.navigation.navigate(routes.HOME);

    FileSystem.deleteDirectory(this.state.name)
      .then((result) => {
        if (result === true) {
          // google analytics event log
          analytics().logEvent("delete_tier", {
            name: this.state.name,
          });
        }
      })
      .catch((err) => {
        console.log(this.state.tier, err);
      });
  }

  render() {
    const { t } = this.props;

    return (
      <Modal
        visible={this.props.visible}
        onRequestClose={() => this.props.onClose()}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={this.handleGalleryRoll}>
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                height: 100,
                width: 100,
                borderRadius: 50,
                borderWidth: 3,
                borderColor: "#515151",
              }}
            >
              {this.state.portrait ? (
                <Image
                  style={{
                    position: "absolute",
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                  }}
                  source={{ uri: this.state.portrait }}
                />
              ) : (
                <Text style={{ color: "#515151", fontSize: 50 }}>+</Text>
              )}
            </View>
          </TouchableOpacity>

          <Text style={{ textAlign: "center", color: "#DCDCDC", fontSize: 15 }}>
            {this.state.portrait ? "Change photo" : "Add photo"}
          </Text>

          <Text style={{ color: "#DCDCDC", fontSize: 15 }}>Name</Text>
          <TextInput
            value={this.state.name}
            inputStyle={styles.inputStyle}
            onChangeText={this.onNameChange}
            placeholderTextColor="white"
            style={styles.inputContainerStyle}
          />

          <Text style={{ color: "#DCDCDC", fontSize: 15 }}>Category</Text>
          <Picker
            selectedValue={this.state.category}
            style={{
              borderRadius: 5,
              backgroundColor: "rgba(255, 255, 255, .15)",
              marginBottom: 30,
              color: "white",
            }}
            onValueChange={(itemValue, itemIndex) => {
              this.props.updateCategory(itemValue);
              this.setState({ category: itemValue });
            }}
          >
            {categories.map((category) => {
              return <Picker.Item label={category} value={category} />;
            })}
          </Picker>

          <Text style={{ color: "#DCDCDC", fontSize: 15 }}>
            Description (Optional)
          </Text>
          <TextInput
            value={this.state.description}
            onChangeText={this.onDescriptionChange}
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
          <Button
            onPress={this.popDeleteAlert}
            title={t("create:delete_button")}
            buttonStyle={styles.continueButtonStyle}
            titleStyle={styles.continueButtonTitleStyle}
            raised
          />
        </View>
      </Modal>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { tiers } = state;
  return {
    selectedTier: tiers.selectedTier,
  };
}

const mapDispatchToProps = (dispatch) => ({
  selectTier: (tierId) => dispatch(selectTier(tierId)),
  deleteTier: (tier) => dispatch(deleteTier(tier)),
  updatePortrait: (image) => dispatch(updatePortrait(image)),
  updateDescription: (description) => dispatch(updateDescription(description)),
  updateCategory: (category) => dispatch(updateCategory(category)),
  updateName: (name) => dispatch(updateName(name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(TierListModalSettings));
