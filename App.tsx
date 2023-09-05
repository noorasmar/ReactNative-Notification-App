/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {
  requestUserPermission,
  NotificationServices,
  requestNotificationPermission,
} from './PushNotification';

function App(): JSX.Element {
  useEffect(() => {
    requestNotificationPermission();
    requestUserPermission();
    NotificationServices();
  }, []);
  return (
    <View>
      <Text>test</Text>
    </View>
  );
}
export default App;
