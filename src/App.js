import React, { Component } from "react";
import { Alert } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import analytics from "@react-native-firebase/analytics";
import messaging from "@react-native-firebase/messaging";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./navigator/StackNavigator";

import LoadingScreen from "@screens/LoadingScreen";

import { store, persistor } from "@core/store";

import registerAppWithFCM from "@services/google/notification";

// Gets the current screen from navigation state
const getActiveRouteName = (state) => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

/**
 * @description Application entrance
 */
function App() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const { title, body, android } = remoteMessage.notification;
      //android.imageUrl
      Alert.alert(title, body);
    });

    registerAppWithFCM();

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <NavigationContainer
          ref={navigationRef}
          onStateChange={(state) => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = getActiveRouteName(state);
            if (previousRouteName !== currentRouteName) {
              // The line below uses the @react-native-firebase/analytics tracker
              // Change this line to use another Mobile analytics SDK
              analytics().setCurrentScreen(currentRouteName, currentRouteName);
            }
            // Save the current route name for later comparision
            routeNameRef.current = currentRouteName;
          }}
        >
          <StackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}
