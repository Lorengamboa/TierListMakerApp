import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    margin: 10
  },
  label: (color, size) => {
    return {
      flex: 1,
      minHeight: size,
      width: size,
      paddingTop: size / 3,
      paddingBottom: size / 3,
      backgroundColor: color,
      borderRadius: 5
    };
  },
  labelText: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
  },

  imageContainer: (nImages) => {
    return {
      flex: 3,
      backgroundColor: "#EBEBEB",
      marginLeft: 10,
      borderRadius: 5,
      padding: 4
    };
  },
  icon: (size) => {
    return {
      flex: 1,
      backgroundColor: "grey",
      justifyContent: "center",
      alignItems: "center",
      width: size,
    };
  },
});

export default styles;
