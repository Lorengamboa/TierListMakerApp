import React, { Component } from "react";
import { WebView } from "react-native-webview";

import { checkUrlImage } from "../../utils/validations";

function MyWebComponent(props) {
  const navigationStateChangedHandler = ({ url }) => {
    if (!url.startsWith("https://www.bing.com/images")) {
      if (checkUrlImage(url)) props.onNavigationStateChange(url);
      //this.WebView.stopLoading();
    } else props.onNavigationStateChange(url);
  };
  return (
    <WebView
      javaScriptEnabled={true}
      onNavigationStateChange={navigationStateChangedHandler}
      source={{ uri: "https://www.bing.com/images" }}
      ref={c => {
        this.WebView = c;
      }}
    />
  );
};

export default MyWebComponent;
