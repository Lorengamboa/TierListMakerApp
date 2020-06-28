import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width / 3;
const height = Dimensions.get("window").height / 3;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    padding: 40
  },
  sectionContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    margin: 10
  }
});

export default styles;
