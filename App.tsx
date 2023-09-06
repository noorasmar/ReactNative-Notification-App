import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  requestUserPermission,
  NotificationServices,
  requestNotificationPermission,
  getForegroundNotification,
} from './PushNotification';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import PushNotification from 'react-native-push-notification';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const navigateRef = useRef();
  const [navigateTo, setNavigateTo] = useState();

  useEffect(() => {
    getForegroundNotification();
    requestNotificationPermission();
    requestUserPermission();
    messaging().onNotificationOpenedApp((remoteMessage: any) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.data.type,
      );
      if (remoteMessage.data.type === 'Screen2')
        navigateRef.current.navigate('Screen2');
      if (remoteMessage.data.type === 'Screen1')
        navigateRef.current.navigate('Screen1');
    });
    PushNotification.configure;
    NotificationServices();
  }, []);

  return (
    <NavigationContainer ref={navigateRef}>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
