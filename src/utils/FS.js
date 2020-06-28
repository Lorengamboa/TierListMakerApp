import RNFS from "react-native-fs";
import AsyncStorage from "@react-native-community/async-storage";
import uuidv1 from "uuid/v1";

import { configDefaultTierList } from "../config/tierList";

const DIR_PATH = `${RNFS.DocumentDirectoryPath}/`;

/**
 * @description Set of helper functions to do filesystem operations
 */
export default class FileSystem {
  /**
   * Creates new path directory if it doesnt already exists
   * @param {*} path
   */
  static createDir(path) {
    return RNFS.readDir(DIR_PATH + path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        return false;
      })
      .catch((err) => {
        if (err.code === "EUNSPECIFIED") {
          return RNFS.mkdir(DIR_PATH + path)
            .then((result) => {
              return this.getDir(path);

            })
            .catch((err) => {
              //console.log("Error creating dir");
              return false;
            });
        } else return false;
      });
  }

  /**
   *
   * @param {*} path
   */
  static deleteDirectory(path) {
    const TARGET_DIRECTORY = DIR_PATH + path;
    return RNFS.readDir(TARGET_DIRECTORY) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        //console.log("Dir exists, proceeding to delete it");
        return RNFS.unlink(TARGET_DIRECTORY);
      })
      .then(() => {
        //console.log("templated removed!");
        return true;
      })
      .catch((err) => {
        console.log("templated not removed, something went wrong!: ", err);
        return false;
      });
  }

  /**
   *
   */
  static getDir(dir) {
    return this.getDirList()
      .then((res) => {
        return res.find((tier) => tier.name === dir);
      })
      .catch((err) => {
        return false;
      });
  }

  /**
   *
   */
  static getDirList() {
    return RNFS.readDir(DIR_PATH)
      .then((entries) => {
        const directories = entries.filter((entry) => {
          return entry.isDirectory();
        });
        return directories;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  /**
   * @description
   * @param {*} path
   */
  static getDirImages(path) {
    return RNFS.readDir(DIR_PATH + path)
      .then((entries) => {
        const images = entries
          .filter((entry) => {
            return entry.isFile() && entry.path.split(".").pop() === "png";
          })
          .map((entry) => {
            return RNFS.readFile(entry.path, "base64")
              .then((res) => {
                return AsyncStorage.getItem(`${path}-${entry.name}`).then(
                  (result) => {
                    return {
                      name: entry.name,
                      base64: res,
                      position: JSON.parse(result),
                    };
                  }
                );
              })
              .catch((err) => {
                return false;
              });
          });

        return Promise.all(images)
          .then((results) => {
            return results;
          })
          .catch((e) => {
            return [];
          });
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  /**
   *
   */
  static getConfigFile(path) {
    const configPath = DIR_PATH + path + "/config.txt";
    return RNFS.readFile(configPath, "utf8")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return RNFS.writeFile(
          configPath,
          JSON.stringify(configDefaultTierList),
          "utf8"
        )
          .then((res) => {
            return RNFS.readFile(configPath, "utf8")
              .then((result) => {
                return result;
              })
              .catch((err) => {
                //console.info(err.message);
              });
          })
          .catch((err) => {
            //console.info(err.message);
          });
      });
  }

  /**
   *
   */
  static setConfigFile(path, raw) {
    const configPath = DIR_PATH + path + "/config.txt";
    return RNFS.writeFile(configPath, raw, "utf8")
      .then((success) => {
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * @description downloads an image given a specific url and a path where to store it
   * @param {*} url
   * @param {*} path
   */
  static downloadImage(url, path) {
    let imageName = uuidv1();

    const pathImage = `${RNFS.DocumentDirectoryPath}/${path}/${imageName}.png`;

    const DownloadFileOptions = {
      fromUrl: url, // URL to download file from
      toFile: pathImage, // Local filesystem path to save the file to
      cacheable: true, // Whether the download can be stored in the shared NSURLCache (iOS only, defaults to true)
      // headers?: Headers;        // An object of headers to be passed to the server
      // background?: boolean;     // Continue the download in the background after the app terminates (iOS only)
      // discretionary?: boolean;  // Allow the OS to control the timing and speed of the download to improve perceived performance  (iOS only)
      // progressDivider?: number;
      // begin?: (res: DownloadBeginCallbackResult) => void;
      // progress?: (res: DownloadProgressCallbackResult) => void;
      // resumable?: () => void;    // only supported on iOS yet
      // connectionTimeout?: number // only supported on Android yet
      // readTimeout?: number       // supported on Android and iOS
    };

    // start download
    return RNFS.downloadFile(DownloadFileOptions)
      .promise.then((result) => {
        if (result && result.hasOwnProperty("statusCode")) {
          if (result.statusCode === 200) {
            return RNFS.readFile(pathImage, "base64")
              .then((res) => {
                return {
                  name: `${imageName}.png`,
                  base64: res,
                };
              })
              .catch((err) => {
                return false;
              });
          } else return false;
        } else return false;
      })
      .catch((err) => {
        return false;
      });
  }

  static persistImage(file, path) {
    let imageName = uuidv1();

    const TARGET_DIRECTORY = `${
      RNFS.DocumentDirectoryPath
    }/${path}/${imageName}.png`;

    // start download
    return RNFS.writeFile(TARGET_DIRECTORY, file, "base64")
      .then((success) => {
        return {
          name: `${imageName}.png`,
          base64: file,
        };
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  /**
   * @description downloads an image given a specific url and a path where to store it
   * @param {*} url
   * @param {*} path
   */
  static async downloadImages(images, path) {
    let downloadedImages = [];

    try {
      for (const image of images) {
       const downloadedImage = await this.downloadImage(image, path);
       downloadedImages.push(downloadedImage);
      }
      return downloadedImages;
    } catch (error) {
      return false;
    }
  }

  /**
   *
   * @param {*} path
   */
  static deleteFile(path) {
    const TARGET_DIRECTORY = DIR_PATH + path;

    return RNFS.unlink(TARGET_DIRECTORY);
  }
}
