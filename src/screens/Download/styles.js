import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
  },
  footer: {
    color: "white",
    fontSize: 15,
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  errorMessage: {
    color: "red",
    fontSize: 20,
  },
});

export default styles;
