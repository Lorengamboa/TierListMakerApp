import React, { Component } from "react";
import { View, Image, FlatList, ToastAndroid } from "react-native";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button } from "react-native-elements";

import { createTier, selectTier } from "@application/core/tiers/actions";
import Spinner from "@components/Spinner";
import admob from "@services/google/admob";
import FS from "@utils/FS";

import styles from "./styles";

/**
 * @description
 * @param {*} props
 */
export class SpectateTier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    // binding methods
    this.displayPictures = this.displayPictures.bind(this);
    this.formData = this.formData.bind(this);
    this.onDownload = this.onDownload.bind(this);
  }

  formData(data, numColumns) {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow = numberOfElementsLastRow + 1;
    }

    return data;
  }

  displayPictures({ item, index, separators }) {
    return (
      <Image
        style={styles.icon}
        source={{
          uri: "https://www.tierlistbuilder.com/images/" + item,
        }}
      />
    );
  }

  onDownload() {
    // admob.showReward
    const { tier } = this.props.route.params;
    const { selectTier, createTier } = this.props;

    admob
      .showReward()
      .then((AdMobRewarded) => {
        if (AdMobRewarded) {
          // succeed
          AdMobRewarded.addEventListener("rewarded", (reward) => {
            const { name, category, description, portrait } = tier;
            
            const path = tier.name;
            const urls = tier.pictures.map(
              (picture) => "https://www.tierlistbuilder.com/images/" + picture
            );

            this.setState({
              loading: true,
            });

            FS.createDir(path)
              .then((result) => {
                if (result) {

                  var tierData = {
                    ...result,
                    name,
                    category,
                    description,
                    portrait,
                  };
                  FS.downloadImages(urls, path)
                    .then((downloadedImages) => {
                      selectTier(path);
                      createTier(tierData, downloadedImages);

                      this.setState({
                        loading: false,
                      });
                      ToastAndroid.show("Download succeed", ToastAndroid.SHORT);
                    })
                    .catch((err) => {
                      ToastAndroid.show("Download failed", ToastAndroid.SHORT);
                      this.setState({
                        loading: false,
                      });
                    });
                } else {
                  this.setState({
                    loading: false,
                  });
                  ToastAndroid.show(
                    "Tier list name already created",
                    ToastAndroid.SHORT
                  );
                }
              })
              .catch((err) => {
                this.setState({
                  loading: false,
                });
                ToastAndroid.show("Download failed", ToastAndroid.SHORT);
              });
          });

          AdMobRewarded.addEventListener("adClosed", () => {});
        }
      })
      .catch((err) => {
        ToastAndroid.show("Download failed", ToastAndroid.SHORT);
      });
  }

  render() {
    const { tier } = this.props.route.params;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <FlatList
            data={this.formData(tier.pictures, 6)}
            renderItem={this.displayPictures}
            numColumns="6"
          />

          {this.state.loading ? (
            <Spinner />
          ) : (
            <Button title={"download"} onPress={this.onDownload} raised />
          )}
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectTier: (tierId) => dispatch(selectTier(tierId)),
  createTier: (tier, images) => dispatch(createTier(tier, images)),
});

export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(SpectateTier));
