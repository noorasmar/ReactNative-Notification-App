import React from 'react';
import {View, Text, Button} from 'react-native';

const Screen1 = ({navigation}) => {
  return (
    <View>
      <Text>Screen 1</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Screen2')}
      />
    </View>
  );
};

export default Screen1;
