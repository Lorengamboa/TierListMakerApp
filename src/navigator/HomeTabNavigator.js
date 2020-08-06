"use strict";

import React from "react";
import { View, TouchableOpacity } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { HomeScreen, GuideScreen, SettingsScreen, CreateScreen, AboutScreen, DownloadScreen } from "@screens";

import routes from "@config/routes";
import * as theme from "@config/theme";

import styles from "./styles";

const Tab = createMaterialBottomTabNavigator();

/**
 * @description Dashboard bottom tab navigator
 */
export default function HomeTabNavigator({ navigation, route }) {
  //const screen = route.params.screen;
  return (
    <>

  {/* 
      <TouchableOpacity
        underlayColor={'transparent'}
        onPress={() => navigation.navigate(routes.CREATE)}
        style={styles.createButton}
      >
        <Icon name="plus" size={45} color="white" />
      </TouchableOpacity>

  */}
      <Tab.Navigator barStyle={styles.barStyle} initialRouteName="Home">
        <Tab.Screen
          name={routes.HOME}
          component={HomeScreen}
          options={{
            headerShown: true,
            tabBarLabel: "",
            tabBarIcon: ({ tintColor }) => (
              <View>
                <Icon name={"home"} size={25} style={[{ color: theme.PRIMARY_COLOR }]} />
              </View>
            ),
            tabBarColor: styles.tabBarColor,
          }}
        />
        <Tab.Screen
          name={routes.CREATE}
          component={CreateScreen}
          options={{
            tabBarLabel: "",
            headerShown: false,
            tabBarIcon: ({ tintColor }) => (
              <View>
                <Icon name={"plus"} size={25} style={[{ color: theme.PRIMARY_COLOR }]} />
              </View>
            ),
            tabBarColor: styles.tabBarColor,
          }}
        />
       {/*
        <Tab.Screen
          name="EMPTY"
          component={HomeScreen}
          tabBarVisible={false}
          options={{
            showLabel: false,
            tabBarLabel: "",
          }}
        /> 
         <Tab.Screen
          name={routes.DOWNLOAD}
          component={DownloadScreen}
          tabBarVisible={false}
          options={{
            headerShown: true,
            tabBarLabel: "Home",
            tabBarIcon: ({ tintColor }) => (
              <View>
                <Icon name={"download"} size={25} style={[{ color: "white" }]} />
              </View>
            ),
            tabBarColor: styles.tabBarColor,
          }}
        />*/}
        <Tab.Screen
          name={routes.SETTINGS}
          component={SettingsScreen}
          options={{
            headerShown: false,
            tabBarLabel: "",
            tabBarIcon: ({ tintColor }) => (
              <View>
                <Icon name={"settings"} size={25} style={[{ color: theme.PRIMARY_COLOR }]} />
              </View>
            ),
            tabBarColor: styles.tabBarColor,
          }}
        />
      </Tab.Navigator>
    </>);
}
