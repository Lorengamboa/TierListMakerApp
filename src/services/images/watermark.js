import ImageMarker from "react-native-image-marker";

export const addWaterMark = (uri) => {
  return ImageMarker.markImage({
    src: uri,
    markerSrc: require("../../assets/img/logo-transparency.png"),
    position: "bottomRight",
    scale: 1,
    markerScale: 0.3,
    quality: 100,
  })
    .then((image) => {
      const imagePath = Platform.OS === "android" ? "file://" + image : image;

      return imagePath;
    })
    .catch((err) => {
      throw err;
    });
};
