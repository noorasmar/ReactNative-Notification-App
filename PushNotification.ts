import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import PushNotification from 'react-native-push-notification';

export async function requestNotificationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      requestUserPermission();
    } else {
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
}

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

export const NotificationServices = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

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

export const getForegroundNotification = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    PushNotification.localNotification({
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
      bigPictureUrl: remoteMessage.notification.android.imageUrl,
      smallIcon: remoteMessage.notification.android.imageUrl,
    });
  });

  return unsubscribe;
};
