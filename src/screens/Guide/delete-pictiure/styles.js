import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  slide: {
    flex: 1
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "grey",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'stretch'
  }
});

export default styles;
