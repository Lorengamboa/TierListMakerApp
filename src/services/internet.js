import { NetInfo } from "react-native";

/**
 * Tells wether or not the user has internet accesible 
 */
export function isServiceAvailable() {
  return NetInfo.isConnected
    .fetch()
    .then(isConnected => {
      return isConnected;
    })
    .catch(err => {
      return false;
    });
};
