import { AdMobInterstitial, AdMobRewarded } from "react-native-admob";

import { PREMIUM_MODE, ENVIROMENT } from "@application/constants";
import {
  AdMobInterstitialID,
  test_AdMobInterstitialID,
  AdmobRewardID,
  test_admobRewardID,
} from "@config/admob";

/**
 * @description A service initializer for Google AdMob banners
 */
class AdmobService {
  constructor(mode) {
    this.mode = mode;
    this.admobBannerID = null;
    this.AdMobInterstitialID = null;
    this.admobRewardID = null;

    this.init();
  }

  /**
   * Initializer
   */
  init() {
    this.loadVariables();

    // SETTING UP INTERSTITIAL
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.setAdUnitID(this.AdMobInterstitialID);
    
    this.requestInterstitial();
    this.requestAdMobReward();

    AdMobInterstitial.addEventListener("adLoaded", () =>
      console.info("AdMobInterstitial adLoaded")
    );
    AdMobInterstitial.addEventListener("adFailedToLoad", (error) =>
      console.error(error)
    );
    AdMobInterstitial.addEventListener("adOpened", () =>
      console.info("AdMobInterstitial => adOpened")
    );
    AdMobInterstitial.addEventListener("adClosed", () => {
      console.info("AdMobInterstitial => adClosed");
      AdMobInterstitial.requestAd().catch((error) => console.warn(error));
    });
    AdMobInterstitial.addEventListener("adLeftApplication", () =>
      console.info("AdMobInterstitial => adLeftApplication")
    );

    // SETTING UP REWARD
    AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
    AdMobRewarded.setAdUnitID(this.admobRewardID);

    AdMobRewarded.addEventListener("adLoaded", () =>
      console.info("AdMobRewarded => adLoaded")
    );
    AdMobRewarded.addEventListener("adFailedToLoad", (error) =>
      console.warn(error)
    );
    AdMobRewarded.addEventListener("adOpened", () =>
      console.info("AdMobRewarded => adOpened")
    );
    AdMobRewarded.addEventListener("videoStarted", () =>
      console.info("AdMobRewarded => videoStarted")
    );
    AdMobRewarded.addEventListener("adClosed", () => {
      console.info("AdMobRewarded => adClosed");
      AdMobRewarded.requestAd().catch((error) => console.warn(error));
    });
    AdMobRewarded.addEventListener("adLeftApplication", () =>
      console.info("AdMobRewarded => adLeftApplication")
    );
  }

  /**
   * sets variables based on enviroment running
   */
  loadVariables() {
    if (this.mode === "development") {
      this.AdMobInterstitialID = test_AdMobInterstitialID;
      this.admobRewardID = test_admobRewardID;
    } else {
      this.AdMobInterstitialID = AdMobInterstitialID;
      this.admobRewardID = AdmobRewardID;
    }
  }

  /**
   * Loads up Interstitial
   */
  requestInterstitial() {
    AdMobInterstitial.requestAd().catch((error) => console.warn(error));
  }

  /**
   * Loads up Reward
   */
  requestAdMobReward() {
    AdMobRewarded.requestAd().catch((error) => console.warn(error));
  }

  /**
   * Displays preloaded Interstitial
   */
  showInterstitial() {
    AdMobInterstitial.showAd().catch((error) => console.warn(error));
  }

  /**
   * Displays reward
   */
  showReward() {
    return AdMobRewarded.showAd()
      .then(res => {
        return AdMobRewarded;
      })
      .catch(err => {
        throw err;
      })
  }

  removeAllListeners() {
    AdMobRewarded.removeAllListeners();
    AdMobInterstitial.removeAllListeners();
  }
}

// @TODO: SHOULD BE ID
const admobService =
  PREMIUM_MODE === false ? new AdmobService(ENVIROMENT) : null;

export default admobService;
