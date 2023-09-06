import React from 'react';
import {View, Text, Button} from 'react-native';

const Screen2 = ({navigation}) => {
  return (
    <View>
      <Text>Screen 2</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Screen1')}
      />
    </View>
  );
};

export default Screen2;
