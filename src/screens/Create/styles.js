import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#121212",
  },
  portraitContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#515151",
  },
  portraitImage: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
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
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, .15)",
    borderRadius: 5,
    color: "white",
  },
  continueButtonStyle: {
    backgroundColor: "#121212",
    borderColor: "green",
    borderWidth: 2,
  },
  continueButtonTitleStyle: {
    color: "green",
  },
});

export default styles;
