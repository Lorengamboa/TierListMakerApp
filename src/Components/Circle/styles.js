import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: (color, selected) => {
    return {
      width: 35,
      height: 35,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: selected ? 'black' : 0,
      backgroundColor: color || 'grey'
    };
  }
});

export default styles;
