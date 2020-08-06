import { StyleSheet } from "react-native";

import * as theme from "@config/theme";

const styles = StyleSheet.create({
  createButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    bottom: 10, //Header.height
    zIndex: 99,
    alignSelf: "center",
    position: "absolute",
    backgroundColor: "red",
    borderRadius: 100,
  },
  tabBarColor: () => "#3BAD87",
  barStyle: {
    backgroundColor: theme.LIGHT_THEME_BACKGROUND_COLOR,
  }
});

export default styles;
