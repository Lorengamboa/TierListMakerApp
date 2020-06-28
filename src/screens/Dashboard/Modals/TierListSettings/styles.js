import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#121212",
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    color: "white",
    marginTop: 50,
  },
  description: {
    fontSize: 15,
    marginTop: 30,
    color: "white",
  },
  inputStyle: {
    color: "white",
  },
  inputContainerStyle: {
    marginBottom: 30,
    backgroundColor: "rgba(255, 255, 255, .15)",
    borderRadius: 5,
    color: "white",
  },
  continueButtonStyle: {
    backgroundColor: "#121212",
    borderColor: "red",
    borderWidth: 2,
  },
  continueButtonTitleStyle: {
    color: "red",
  },
});

export default styles;
