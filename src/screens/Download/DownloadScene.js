import React, { Component } from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import * as axios from "axios";

import routes from "@config/routes";
import Spinner from "@components/Spinner";

import PortraitList from "./PortraitList";

import styles from "./styles";

 class DownloadScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      templates: [],
      loading: true,
      error: null,
    };

    this.onPortraitClicked = this.onPortraitClicked.bind(this);
  }

  componentDidMount() {
    return axios
      .get("https://www.tierlistbuilder.com/api/list")
      .then((response) => {
        this.setState({
          templates: response.data,
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          loading: false,
          error: "Oops, something went wrong!",
        });
      });
  }

  onPortraitClicked(item) {
    return axios
      .get("https://www.tierlistbuilder.com/api/tier/" + item.id)
      .then((tier) => {
        this.props.navigation.navigate(routes.SPECTATE_TIER, {
          tier: tier.data,
        });
      })
      .catch((err) => {
        //console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SELECT A TEMPLATE</Text>
        {this.state.loading ? (
          <Spinner />
        ) : this.state.error ? (
          <Text style={styles.errorMessage}>{this.state.error}</Text>
        ) : (
          <PortraitList
            portraits={this.state.templates}
            onClick={this.onPortraitClicked}
          />
        )}
        <Text style={styles.footer}>More coming soon...</Text>
      </View>
    );
  };
};

export default DownloadScene;