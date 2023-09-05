import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {
  requestUserPermission,
  NotificationServices,
  requestNotificationPermission,
  getForegroundNotification,
} from './PushNotification';

function App(): JSX.Element {
  useEffect(() => {
    getForegroundNotification();
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
