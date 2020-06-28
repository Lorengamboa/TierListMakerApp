"use strict";

import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import NetInfo from "@react-native-community/netinfo";

import imageSearcher from "../../../../services/image-searcher";

import ImageList from "@components/ImageList";

const SCE_ID = "002227669208148630993:hp1mzuxdcig";
const SCE_API_KEY = "AIzaSyAK6a8srN1QO3FRoInzJ1YTJ7kATgvrM34";

export default class ImageBrowser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      search: "",
      isConnected: null,
      page: 1,
      searching: false
    };

    // biding function events
    this.requestImageSearch = this.requestImageSearch.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);

    // initializing the image searcher plugin
    this.client = new imageSearcher(SCE_ID, SCE_API_KEY);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search && this.state.search) {
      this.requestImageSearch();
    }
  }

  requestImageSearch() {
    let { list, page, search } = this.state;

    this.setState({
      searching: true,
      error: false
    });

    try {
      this.client
        .search(search, { size: "medium", page })
        .then(images => {
          this.setState({
            list: list.length === 0 ? images : list.concat(images),
            page: page + 10,
            searching: false
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            searching: false,
            error: true
          });
        });
    } catch (error) {
      this.setState({
        searching: false,
        error: true
      });
    }
  }

  updateSearch = search => {
    this.setState({ search, list: [], page: 1 });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {!this.state.isConnected ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                fontFamily: "LexendDeca-Regular",
                fontSize: 30,
                textAlign: "center",
                marginBottom: 20,
                color: "red"
              }}
            >
              Not internet available
            </Text>
            <Image
              style={{
                width: 50,
                height: 50
              }}
              source={require("../../../../assets/img/internet.png")}
            />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            {this.state.error ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    textAlign: "center"
                  }}
                  source={require("../../../../assets/img/error.png")}
                />
                <Text
                  style={{
                    fontFamily: "LexendDeca-Regular",
                    fontSize: 20,
                    textAlign: "center",
                    marginBottom: 20,
                    color: "black"
                  }}
                >
                  There has been an error, try later...
                </Text>
              </View>
            ) : this.state.list.length === 0 && !this.state.searching ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    textAlign: "center"
                  }}
                  source={require("../../../../assets/img/image.png")}
                />
                <Text
                  style={{
                    fontFamily: "LexendDeca-Regular",
                    fontSize: 20,
                    textAlign: "center",
                    marginBottom: 20,
                    color: "black"
                  }}
                >
                  Search for an image...
                </Text>
              </View>
            ) : (
              <ImageList
                images={this.state.list}
                onImageSelected={this.props.onImageSelected}
                onBottomTouch={this.requestImageSearch}
              />
            )}
          </View>
        )}

        <SearchBar
          placeholder="search"
          onChangeText={this.updateSearch}
          value={this.state.search}
        />
      </View>
    );
  }
}
