import React, { Component } from "react";
import { ToastAndroid, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import ActionButton from "react-native-action-button";
import analytics from "@react-native-firebase/analytics";
import routes from "@config/routes";

import WebView from "@components/WebView";

import { checkUrlImage } from "@application/utils/validations";
import { getUrlParam } from "@application/utils/url";

/**
 * @description Webview browser
 */
class WebViewBrowser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      isDownloadable: false
    };

    // binding functions
    this.onDownload = this.onDownload.bind(this);
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    this.openGuide = this.openGuide.bind(this);
  }

  /*****************************************************************************************************/
  /*                                      COMPONENT CYCLE METHODS                                      */
  /*****************************************************************************************************/

  componentDidCatch() {}

  componentDidMount() {
    analytics().setCurrentScreen(
      routes.WEB_VIEW_BROWSER,
      routes.WEB_VIEW_BROWSER
    );
  }

  componentDidCatch(error) {
    console.info(error);
  }

  /*****************************************************************************************************/
  /*                                      COMPONENT PRIVATE METHODS                                    */
  /*****************************************************************************************************/

  onDownload() {
    const { t } = this.props;

    if (!this.state.search) return;
    const isImage = checkUrlImage(this.state.search);

    if (isImage) {
      // google analytics event log
      analytics().logEvent("browser_download_image", {
        url: this.state.search
      });

      return this.props.onImageSelected(this.state.search);
    } else ToastAndroid.show(t("browser:not_valid_image"), ToastAndroid.LONG);
  }

  onNavigationStateChange(url) {
    const searchValue = getUrlParam("q", url);

    // google analytics event log
    if(searchValue) analytics().logEvent("browser_search_image", {
      query: searchValue
    });
    
    if (checkUrlImage(this.state.search))
      this.setState({
        isDownloadable: true
      });
    this.setState({ search: url });
  }

  openGuide() {
    this.props.navigation.push(routes.BROWSER_GUIDE);
    this.props.close();
  }

  render() {
    const { t } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <WebView onNavigationStateChange={this.onNavigationStateChange} />
        <Button
          disabled={!this.state.isDownloadable}
          iconRight
          title={t("browser:download_button")}
          raised
          onPress={this.onDownload}
        />
        <ActionButton
          icon={<Icon name="book" color="white" />}
          buttonColor="#FF7676"
          onPress={this.openGuide}
          style={{ marginBottom: 30 }}
        />
      </View>
    );
  }
}

export default connect(
  null,
  null
)(withTranslation()(WebViewBrowser));
