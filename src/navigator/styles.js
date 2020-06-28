import { StyleSheet } from "react-native";

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
    backgroundColor: "#121212",
  }
});

export default styles;
