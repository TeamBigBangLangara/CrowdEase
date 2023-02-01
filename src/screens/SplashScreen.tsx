import React from 'react';
import {Pressable, Text, View} from 'react-native';

const SplashScreen = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <Text>Splash Screen</Text>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Text>Click Here</Text>
      </Pressable>
    </View>
  );
};

export default SplashScreen;
