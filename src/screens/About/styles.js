import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  content: {
    flex: 1,
    padding: 25
  },
  title: {
    color: "white",
    fontSize: 40
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    marginTop: 30,
    fontFamily: "LexendDeca-Regular"
  },
  reference: {
    color: "white",
    fontSize: 10,
    position: "absolute",
    bottom: 0,
    padding: 5
  }
});

export default styles;
