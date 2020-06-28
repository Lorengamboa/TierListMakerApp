import { Dimensions } from "react-native";

/**
 * 
 */
const getWindowDimensions = function () {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;

    return { width, height };
}

const dimensions = getWindowDimensions();

export { dimensions };