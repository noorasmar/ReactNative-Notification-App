import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {PermissionsAndroid} from 'react-native'; // Import PermissionsAndroid

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

const getFCMToken = async () => {
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('Old FCM Token : ', fcmToken);
  if (!fcmToken) {
    try {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('new FCM Token : ', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {}
  }
};

export const NotificationServices = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  const unsubscribe = messaging().onMessage(async remoteMsg => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMsg));
    console.log('ForGround : ', remoteMsg.notification);
  });

  return unsubscribe;
};

export async function requestNotificationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Permission granted, you can proceed with calling requestUserPermission() or other notification-related logic.
      requestUserPermission();
    } else {
      // Permission denied or not granted. Handle the case where the user denied permission.
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
}
