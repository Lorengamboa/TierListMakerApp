import analytics from "@react-native-firebase/analytics";

const ANALYTIC_OPERATIONS = {
  UNKNOWN: "UNKNOWN",
  SCREEN_VIEW: "SCREEN_VIEW",
  TIER_CREATE: "TIER:CREATE",
  TIER_SAVE: "TIER:SAVE",
  TIER_DELETE: "TIER:DELETE",
  TIER_UPDATE: "TIER:UPDATE",
  TIER_OPEN: "TIER:OPEN",
  TIER_DOWNLOAD: "TIER:DOWNLOAD",
  TIER_SHARE: "TIER:SHARE",
  TIER_ADD_ROW: "TIER:ROW_ADD",
  TIER_DELETE_ROW: "TIER:ROW_DELETE",
  CAMERA_OPEN: "CAMERA_OPEN",
  GALLERY_OPEN: "GALLERY_OPEN",
  BROWSER_OPEN: "BROWSER_OPEN",
  BROWSER_SEARCH: "BROWSER_SEARCH",
  BROWSER_DOWNLOAD: "BROWSER_DOWNLOAD",
};

/**
 * @description Firebase event analytics
 * @param {*} operation
 */
const sendTrack = function(operation) {
  if (operation === ANALYTIC_OPERATIONS.TIER_CREATE) {
    analytics().logEvent("tier:create", {
      name: tierListName,
    });
  }
  if (operation === ANALYTIC_OPERATIONS.TIER_SAVE) {
    analytics().logEvent("tier:save", {
      name: tierListName,
    });
  }
  if (operation === ANALYTIC_OPERATIONS.TIER_DELETE) {
    analytics().logEvent("tier:delete", {
      name: tierListName,
    });
  }
  if (operation === ANALYTIC_OPERATIONS.TIER_OPEN) {
    analytics().logEvent("tier:continue", {
      name: tierListName,
    });
  }
};

export default { sendTrack };