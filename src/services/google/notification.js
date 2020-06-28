import messaging from '@react-native-firebase/messaging';

export default async function registerAppWithFCM() {
    try {
      await messaging().registerDeviceForRemoteMessages();
    } catch (error) {
      // console.info(error);
    }
  }
  