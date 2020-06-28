import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width / 1;
const height = Dimensions.get("window").height / 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    left: 5,
    top: 5
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  content: {
    top: 5,
    left: 5,
    fontFamily: "LexendDeca-Regular",
    fontSize: 12,
    color: 'black',
    paddingRight: 20,
  },
  boxContainer:  {
      flex: 1,
      margin: 25,
      marginTop: 30,
      shadowRadius: 20 ,
      shadowOffset : { width: 1, height: 13},
      borderWidth: 3,
      borderColor: "white"
  }
});

export default styles;
