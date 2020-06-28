import React, { Component } from "react";
import { View, BackHandler } from "react-native";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import initializeI18 from "@application/i18n";
import analytics from "@react-native-firebase/analytics";
import { selectTier } from "@application/core/tiers/actions";
import routes from "@config/routes";

import TierList from "./TierListView/TierList";
import EmptyList from "./TierListView/EmptyList";

import styles from "./styles";

/**
 * @description Screen that lists all Tier Lists created so far
 */
class CreatedTierList extends Component {
  constructor(props) {
    super(props);

    // bind function events
    this.displayAllTierList = this.displayAllTierList.bind(this);
    this.navigateToTierList = this.navigateToTierList.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.goToSavedTierList = this.goToSavedTierList.bind(this);
  }

  /*****************************************************************************************************/
  /*                                      COMPONENT CYCLE METHODS                                      */
  /*****************************************************************************************************/

  componentWillMount() {
    initializeI18(this.props.selectedLanguage);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
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
   * @description: handles back button event
   */
  handleBackButtonClick() {
    this.props.navigation.navigate(routes.HOME);
    return true;
  }

  /**
   *
   * @param {*} tierListName
   */
  goToSavedTierList(tierListName) {
    this.navigateToTierList(tierListName);
    // google analytics event log
    analytics().logEvent("go_to_saved_tier", {
      name: tierListName,
    });
  }

  /**
   * Renders all tier list saved uptodate
   */
  displayAllTierList() {
    const tierList = this.props.savedTiers;

    if (tierList.length === 0) return <EmptyList />;
    else
      return (
        <TierList
          list={tierList}
          onTierPress={(tierName) => this.goToSavedTierList(tierName)}
        />
      );
  }

  /**
   * Navigate to dashboard
   */
  navigateToTierList(tierId) {
    const { selectTier, navigation } = this.props;

    selectTier(tierId);
    return navigation.navigate(routes.TIER_LIST_MAKER, { name: tierId });
  }

  render() {
    return <View style={styles.container}>{this.displayAllTierList()}</View>;
  }
}

/**
 *
 * @param {*} state
 * @param {*} ownProps
 */
function mapStateToProps(state, ownProps) {
  const { tiers, general } = state;

  let selectedLanguage = general.language;
  return {
    savedTiers: tiers.saved,
    selectedLanguage,
  };
}

/**
 * Redux mapped actions
 */
const mapDispatchToProps = (dispatch) => ({
  selectTier: (tierId) => dispatch(selectTier(tierId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(CreatedTierList));
