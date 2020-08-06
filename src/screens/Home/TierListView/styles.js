import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  counterList: {
    marginLeft: 5,
    paddingLeft: 10,
    paddingBottom: 10,
    color: "black",
    fontFamily: "segoe-ui-semilight-2",
    borderBottomWidth: 2,
    borderColor: "rgba(255,255,255, .2)",
  },
  card: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255, .2)",
    borderColor: "black",
    borderWidth: .5
  },
  textName: {
    color: "black",
    fontSize: 20,
    fontFamily: "Segoe UI Bold",
  },
  informationContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  descriptionContainer: {
    flex: 1,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  textDescription: { color: "black", fontFamily: "segoe-ui-semilight-2" },
  portrait: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
  },
  header: {
    flex: 1,
    flexDirection: "row",
  },
  footer: {
    padding: 5,
    marginTop: 10,
    borderTopWidth: 2,
    borderColor: "#686868", 
    flexDirection: "row",
    flex: 1,  // Add this line
  },
  textDate: {
    fontWeight: "bold",
    color: "black",
    textAlign:'left',
  },
  textImage: {
    flex: 1,
    textAlign:'right',
    fontWeight: "bold",
    color: "black",
    justifyContent: 'flex-end' 
  },
});
