"use strict";

import React from "react";
import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

// import { withTranslation } from "react-i18next";
import {
  CreateScreen,
  DownloadScreen,
  SpectateTierScreen,
  UpgradeScreen,
  BrowserGuideScene,
  DeleteGuideScene,
  ShareGuideScene,
  DashboardScreen,
} from "@screens";
import routes from "@config/routes";

import HomeTabNavigator from "./HomeTabNavigator";

const Stack = createStackNavigator();

const screenOptions = {
  home: {
    title: "Tier List Maker",
    headerTitleAlign: "center",
    headerShown: false,
    headerStyle: {
      backgroundColor: "#121212",
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "bold",
      color: "red",
      fontSize: 20,
    },
  },
  create: {
    title: "Create New List",
    headerShown: false,
    headerStyle: {
      backgroundColor: "#171717",
    },

    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  },
  tierList: {
    title: "Tier List workboard",
    headerShown: true,
    headerStyle: {
      backgroundColor: "#171717",
    },

    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  },
};

function RootStack() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name={routes.HOME}
        options={screenOptions.home}
        component={HomeTabNavigator}
      />
      <Stack.Screen
        name={routes.CREATE}
        options={screenOptions.create}
        component={CreateScreen}
      />
      <Stack.Screen
        name={routes.TIER_LIST_MAKER}
        options={screenOptions.tierList}
        component={DashboardScreen}
      />
      <Stack.Screen
        name={routes.DOWNLOAD}
        options={{ headerShown: false }}
        component={DownloadScreen}
      />
      <Stack.Screen
        name={routes.SPECTATE_TIER}
        options={{ headerShown: false }}
        component={SpectateTierScreen}
      />
      <Stack.Screen name={routes.UPGRADE} component={UpgradeScreen} />
      <Stack.Screen name={routes.BROWSER_GUIDE} component={BrowserGuideScene} />
      <Stack.Screen name={routes.DELETE_GUIDE} component={DeleteGuideScene} />
      <Stack.Screen name={routes.SHARE_GUIDE} component={ShareGuideScene} />
    </Stack.Navigator>
  );
}

// Wrapping a stack with translation hoc asserts we get new render on language change
// the hoc is set to only trigger rerender on languageChanged
class WrappedStack extends React.Component {
  static router = RootStack.router;

  render() {
    const { t } = this.props;

    return <RootStack screenProps={{ t }} {...this.props} />;
  }
}

// const ReloadAppOnLanguageChange = withTranslation("common", {
//   bindI18n: "languageChanged",
//   bindStore: false
// })(WrappedStack);

export default WrappedStack;
