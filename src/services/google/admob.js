import admob, { MaxAdContentRating, InterstitialAd, RewardedAd, AdEventType, RewardedAdEventType } from '@react-native-firebase/admob';

import { PREMIUM_MODE, ENVIROMENT } from "@application/constants";
import {
  AdMobInterstitialID,
  AdmobRewardID,
} from "@config/admob";

/**
 * @description A service initializer for Google AdMob banners
 */
class AdmobService {
  constructor() {
    this.interstitial = null;
    this.reward = null;

    this.init();
  }

  /**
   * Initializer
   */
  init() {
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      })
      .catch(err => console.error(err));

    this.interstitial = InterstitialAd.createForAdRequest(AdMobInterstitialID);
    this.reward = RewardedAd.createForAdRequest(AdmobRewardID);



    this.interstitialEventListener = this.interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        console.info("interstitial loaded");
      }
      else if (type === AdEventType.CLICKED) {
        console.info("interstitial clicked");
      }
      else if (type === AdEventType.CLOSED) {
        this.requestInterstitial();
        console.info("interstitial CLOSED");
      }
      else if (type === AdEventType.ERROR) {
        console.info("interstitial ERROR");
      }
      else if (type === AdEventType.OPENED) {
        console.info("interstitial OPENED");
      }
      else if (type === AdEventType.LEFT_APPLICATION) {
        console.info("interstitial LEFT_APPLICATION");
      }
    });

    this.rewardEventListenerListener = this.reward.onAdEvent(type => {
      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.info("Reward EARNED");
      }
      else if (type === RewardedAdEventType.LOADED) {
        console.info("Reward LOADED");
      }
      else if (type === AdEventType.CLOSED) {
        console.info("Reward CLOSED");
        this.requestAdMobReward();
      }
    });

    this.requestInterstitial();
    this.requestAdMobReward();
  }

  /**
   * Loads up Interstitial
   */
  requestInterstitial() {
    this.interstitial.load()
  }

  /**
   * Loads up Reward
   */
  requestAdMobReward() {
    this.reward.load();
  }

  /**
   * Displays preloaded Interstitial
   */
  showInterstitial() {
    if (this.interstitial.loaded) {
      this.interstitial.show();
    }
  }

  /**
   * Displays reward
   */
  showReward() {
    if (this.reward.loaded) {
      return this.reward.show()
        .then(res => {
          return res;
        })
        .catch(err => {
          throw err;
        });
    }
  }

  removeAllListeners() {
    this.interstitialEventListener();
    this.rewardEventListener();
  }
}

const admobService = !PREMIUM_MODE ? new AdmobService(ENVIROMENT) : null;

export default admobService;
