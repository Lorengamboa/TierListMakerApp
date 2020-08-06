import React, { Component } from "react";
import { View, Alert, BackHandler, ToastAndroid, Text, Modal } from "react-native";
import { connect } from "react-redux";
import { Header } from "react-navigation";
import { captureRef } from "react-native-view-shot";
import Share from "react-native-share";
import { withTranslation } from "react-i18next";
import RNFS from "react-native-fs";
import ImagePicker from "react-native-image-picker";
import analytics from "@react-native-firebase/analytics";

import routes from "@config/routes";
import GridList from "@components/GridList";

import admobService from "@services/google/admob";
import { addWaterMark } from "@services/images/watermark";

import {
  moveImage,
  updateLabelColor,
  updateLabelKey,
  removeLabel,
  addLabel,
  resetTier,
  deleteImage,
  addPicture
} from "@application/core/tiers/actions";
import { dimensions } from "@application/utils/screen";
import { PREMIUM_MODE } from "@application/constants";
import FileSystem from "@application/utils/FS";

import TierListSettings from "./Modals/TierListSettings";
import AddImageModal from "./Modals/AddImageModal";
import ImageModalSettings from "./Modals/ImageModalSettings";
import LabelModalSettings from "./Modals/LabelModalSettings";

import Footer from "./Footer";
import CarouselImages from "./CarouselImages";

import WebViewBrowser from "./WebViewBrowser";

import styles from "./styles";

/**
 * @class Dashboard
 * @description
 */
export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dimensions: ((dimensions.height - Header.HEIGHT) * (2 / 3)) / 8,
      selectedLabel: null,
      selectedImage: null,
      addImageModalVisible: false,
      settingLabelVisible: false,
      settingImageVisible: false,
      imageBrowserVisible: false,
      settingsModalVisible: false,
      images: [],
      loading: false,
    };

    this.templateName = this.props.route.params.name;

    // binding function events
    this.takeScreenshot = this.takeScreenshot.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.displayDeleteImageAlert = this.displayDeleteImageAlert.bind(this);
    this.deletePicture = this.deletePicture.bind(this);
    this.saveScreenshot = this.saveScreenshot.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.closeImageModalSettings = this.closeImageModalSettings.bind(this);
    this.onMoveImage = this.onMoveImage.bind(this);
    this.onDeleteImage = this.onDeleteImage.bind(this);
    this.selectLabel = this.selectLabel.bind(this);
    this.closeLabelModalSettings = this.closeLabelModalSettings.bind(this);
    this.onColorSelect = this.onColorSelect.bind(this);
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onRemoveRow = this.onRemoveRow.bind(this);
    this.onAddLabel = this.onAddLabel.bind(this);
    this.downloadScreenshot = this.downloadScreenshot.bind(this);
    this.setAddImageModelVisible = this.setAddImageModelVisible.bind(this);
    this.toggleSettingsModal = this.toggleSettingsModal.bind(this);

    this.toggleImageBrowser = this.toggleImageBrowser.bind(this);
    this.onImageSelected = this.onImageSelected.bind(this);
    //this.handleCameraRoll = this.handleCameraRoll.bind(this);
    this.handleGalleryRoll = this.handleGalleryRoll.bind(this);
    this.handleImagePickerResponse = this.handleImagePickerResponse.bind(this);

    this.tier = this.props.savedTiers.find((tier) => {
      return tier.name === this.templateName;
    });

    this.viewShotRef = React.createRef();
  }

  /*****************************************************************************************************/
  /*                                      COMPONENT CYCLE METHODS                                      */
  /*****************************************************************************************************/

  componentDidCatch(err) {
    console.log(err);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );

    this.props.navigation.setOptions({ title: this.tier.name });

    // Display an interstitial
    if (!PREMIUM_MODE) {
      admobService.showInterstitial();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  /*****************************************************************************************************/
  /*****************                      COMPONENT METHODS                            *****************/
  /*****************************************************************************************************/

  /**
   * handles back button event
   */
  handleBackButtonClick() {
    this.props.navigation.navigate(routes.HOME);
    return true;
  }

  /**
   * @description
   */
  takeScreenshot = () => {
    const { t } = this.props;

    this.refs.viewShot
      .capture()
      .then((uri) => {
        addWaterMark(uri)
          .then((image) => {
            const shareOptions = {
              title: t("dashboard:share:options:title"),
              message: t("dashboard:share:options:message"),
              url: image,
            };
            Share.open(shareOptions).catch((err) => console.info(err));
          })
          .catch((err) => {
            console.info("Error sharing: ", err);
          });
      })
      .catch((err) => {
        console.info("Error sharing: ", err);
      });
  };

  /**
   * @description
   */
  saveScreenshot = () => {
    captureRef(this.refs.viewShot, {
      format: "jpg",
      quality: 0.8,
    })
      .then(
        (uri) => null,
        (error) => console.error("Oops, snapshot failed", error)
      )
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * @description
   */
  deleteTemplate() {
    FileSystem.deleteDirectory(this.templateName)
      .then((result) => {
        if (result === true) this.props.navigation.navigate(routes.HOME);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * @description
   * @param {*} pictureID
   */
  displayDeleteImageAlert(pictureID) {
    const { t } = this.props;

    Alert.alert(
      t("dashboard:picture:warning_delete_header"),
      t("dashboard:picture:warning_delete_description"),
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "OK", onPress: () => this.deletePicture(pictureID) },
      ],
      { cancelable: false }
    );
  }

  /**
   * @description
   * @param {*} templateName
   * @param {*} imageID
   */
  deletePicture(imageID) {
    FileSystem.deleteFile(this.templateName + "/" + imageID)
      .then((result) => {
        this.forceUpdate();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  selectImage(origin, image) {
    this.setState({
      settingImageVisible: true,
      selectedImage: {
        origin,
        image,
      },
    });
  }

  closeImageModalSettings() {
    this.setState({
      settingImageVisible: false,
    });
  }

  closeLabelModalSettings() {
    this.setState({
      settingLabelVisible: false,
    });
  }

  selectLabel(label) {
    this.setState({
      settingLabelVisible: true,
      selectedLabel: label,
    });
  }

  setAddImageModelVisible(value) {
    this.setState({
      addImageModalVisible: value || !this.state.addImageModalVisible,
    });
  }

  toggleSettingsModal() {
    this.setState({
      settingsModalVisible: !this.state.settingsModalVisible
    })
  }

  onColorSelect(color) {
    this.props.updateLabelColor(this.state.selectedLabel, color);
  }

  onLabelChange(text) {
    this.props.updateLabelKey(this.state.selectedLabel, text);
  }

  onMoveImage(destiny) {
    const { origin, image } = this.state.selectedImage;

    this.props.moveImage(image, origin, destiny);
  }

  onDeleteImage() {
    const { origin, image } = this.state.selectedImage;
    let imageName = undefined;

    if (origin === null) {
      imageName = this.tier.images[image].name;
    } else if (Number.isInteger(origin)) {
      imageName = this.tier.labels[origin].images[image].name;
    }

    this.props.deleteImage(image, origin);
    FileSystem.deleteFile(this.tier.name + "/" + imageName)
      .then((result) => {
        //console.log(result); 
      })
      .catch((err) => {
        console.log(err)
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      });
  }

  onRemoveRow() {
    if (this.tier.labels.length === 1)
      return ToastAndroid.show("You cant delete all rows", ToastAndroid.SHORT);
    this.props.removeRow(this.state.selectedLabel);
  }

  onAddLabel(direction) {
    this.props.addLabel(this.state.selectedLabel, direction);
  }

  downloadScreenshot() {
    //DownloadDirectoryPath
    this.refs.viewShot
      .capture()
      .then((uri) => {
        addWaterMark(uri)
          .then((image) => {
            var imagePath = RNFS.PicturesDirectoryPath + "/a.png";
            console.log(imagePath);
            RNFS.writeFile(imagePath, image, "base64")
              .then((success) => {
                console.log("success", success);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.info("Error sharing: ", err);
          });
      })
      .catch((err) => {
        console.info("Error sharing: ", err);
      });
  }

  /**************************************************************************/
  /*                                                                        */
  /**************************************************************************/

  /**
   * @description Either opens
   */
  toggleImageBrowser() {
    this.setState({
      imageBrowserVisible: !this.state.imageBrowserVisible
    });
  }

  /**
   * @description onImageSelected
   * @param {*} e
   */
  onImageSelected(img) {
    FileSystem.downloadImage(img, this.tier.name)
      .then(res => {
        if (res) {
          this.props.addPicture(res);
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.toggleImageBrowser();
    this.setAddImageModelVisible(false);
  }

  /**
   * @DEPRECATED
   */
  handleCameraRoll = () =>
    ImagePicker.launchCamera({}, this.handleImagePickerResponse);

  /**
   * @description
   */
  handleGalleryRoll = () =>
    ImagePicker.launchImageLibrary({ maxWidth: 120, maxHeight: 120 }, this.handleImagePickerResponse);

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

      FileSystem.persistImage(data, this.tier.name)
        .then(result => {
          // google analytics event log
          analytics().logEvent("image_picker");
          this.props.addPicture(result);
        })
        .catch(err => {
          console.log(err);
        });

      this.setAddImageModelVisible(false);
    }
  }

  render() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <GridList
            ref="viewShot"
            data={this.tier.labels}
            size={this.state.dimensions}
            onImageSelect={this.selectImage}
            onSettingsClick={this.selectLabel}
          />
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 3,
              borderStyle: 'dashed', borderColor: "grey", borderWidth: 1, borderRadius: 1,
            }}
          >
            {

              this.tier.images.length === 0 && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >

                  <Text style={{ fontSize: 23, color: "red" }}>
                    {t("dashboard:main:empty_caroussel")}
                  </Text>
                  <Text style={{ color: "red" }}>
                    {t("dashboard:main:press_plus")}
                  </Text>
                </View>
              )

            }
            <CarouselImages
              images={this.tier.images}
              dimensions={this.state.dimensions}
              onImageSelect={this.selectImage}
              onAddImage={this.setAddImageModelVisible}
            />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Footer
              onShare={this.takeScreenshot}
              onReset={this.props.resetTier}
              onAddImage={this.setAddImageModelVisible}
              onSettings={this.toggleSettingsModal}
            />
          </View>
        </View>

        <TierListSettings tier={this.tier} onClose={this.toggleSettingsModal} visible={this.state.settingsModalVisible} {...this.props} />

        <AddImageModal
          visible={this.state.addImageModalVisible}
          setModalVisible={this.setAddImageModelVisible}
          onGalleryRoll={this.handleGalleryRoll}
          onImageBrowserRoll={this.toggleImageBrowser}
        />

        <Modal
          animationType="slide"
          visible={this.state.imageBrowserVisible}
          onRequestClose={this.toggleImageBrowser}
        >
          <WebViewBrowser
            onImageSelected={this.onImageSelected}
            close={this.toggleImageBrowser}
            {...this.props}
          />
        </Modal>

        {this.state.settingLabelVisible && (
          <LabelModalSettings
            onClose={this.closeLabelModalSettings}
            onColorSelect={this.onColorSelect}
            onLabelChange={this.onLabelChange}
            onRemoveRow={this.onRemoveRow}
            onAddLabel={this.onAddLabel}
            selectedLabel={this.tier.labels[this.state.selectedLabel]}
            size={this.state.dimensions}
          />
        )}

        {this.state.settingImageVisible && (
          <ImageModalSettings
            visible={this.state.settingImageVisible}
            onClose={this.closeImageModalSettings}
            onMoveImage={this.onMoveImage}
            onDeleteImage={this.onDeleteImage}
            isClearImage={this.state.selectedImage.origin !== null}
            size={this.state.dimensions}
            selectedImage={
              this.state.selectedImage.origin === null
                ? this.tier.images[this.state.selectedImage.image]
                : this.tier.labels[this.state.selectedImage.origin].images[
                this.state.selectedImage.image
                ]
            }
            labels={this.tier.labels}
          />
        )}
      </View>
    );
  }
}

/**
 *
 * @param {*} state
 * @param {*} ownProps
 */
function mapStateToProps(state, ownProps) {
  const { tiers } = state;
  return {
    savedTiers: tiers.saved,
  };
}

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => ({
  moveImage: (image, origin, destiny) =>
    dispatch(moveImage(image, origin, destiny)),
  updateLabelColor: (label, color) => dispatch(updateLabelColor(label, color)),
  updateLabelKey: (label, key) => dispatch(updateLabelKey(label, key)),
  removeRow: (label) => dispatch(removeLabel(label)),
  addLabel: (label, direction) => dispatch(addLabel(label, direction)),
  resetTier: () => dispatch(resetTier()),
  deleteImage: (image, origin) => dispatch(deleteImage(image, origin)),
  addPicture: (picture) => dispatch(addPicture(picture))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Dashboard));
