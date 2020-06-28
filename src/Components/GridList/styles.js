import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  label: (color, size) => {
    return {
      flex: 2,
      borderWidth: 1,
      minHeight: size,
      width: size,
      paddingTop: size / 3,
      backgroundColor: color,
      borderColor: "black",
    };
  },
  labelText: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
  },
  imageContainer: (nImages) => {
    return {
      flex: 6,
      borderWidth: 1,
      backgroundColor: "#3d3d3d",

    };
  },
  icon: (size) => {
    return {
      flex: 1,
      backgroundColor: "grey",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      width: size,
    };
  },
});

export default styles;
