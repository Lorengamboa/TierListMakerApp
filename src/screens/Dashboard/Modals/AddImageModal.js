import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";

import admobService from "@services/google/admob";
import { PREMIUM_MODE } from "@application/constants";

const AddImageModal = (props) => {

  function handleImageBrowserRoll() {
    if (!PREMIUM_MODE) {
      admobService.showInterstitial();
    }

    props.onImageBrowserRoll();
  }
    return (
        <Modal isVisible={props.visible}   onBackdropPress={() => props.setModalVisible(false)}>
          <View
            style={{
              borderColor: "red",
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
              borderColor: "white",
              borderWidth: 2,
              padding: 50
            }}
          >
           <TouchableHighlight onPress={props.onGalleryRoll} underlayColor="#fff">
            <View style={{margin: 30}}>
            <Text>
              <Icon name="image-multiple" size={25} color="white" style />
              <Text style={{ color: "white", fontSize: 20 }}>GALLERY</Text>
            </Text>
            <Text style={{ color: "white", fontSize: 10 }}>
              Pick an image from your gallery
            </Text>
            </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={props.onCameraRoll} underlayColor="#fff">
            <View style={{margin: 30}}>
            <Text>
              <Icon name="camera" size={25} color="white" style />
              <Text style={{ color: "white", fontSize: 20 }}>CAMERA</Text>
            </Text>
            <Text style={{ color: "white", fontSize: 10 }}>
              Use your camera to take a picture
            </Text>
            </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={handleImageBrowserRoll} underlayColor="#fff">
            <View style={{margin: 30}}>
            <Text>
              <Icon name="image-search-outline" size={25} color="white" style />
              <Text style={{ color: "white", fontSize: 20 }}>SEARCH</Text>
            </Text>
            <Text style={{ color: "white", fontSize: 10 }}>
              Search the internet for an image
            </Text>
          </View>
          </TouchableHighlight>

          </View>

        </Modal>
    )
}

export default AddImageModal
