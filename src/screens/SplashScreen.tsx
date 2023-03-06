import React from 'react';
import { Pressable, Text, View } from 'react-native';

const SplashScreen = ({ navigation, }: { navigation: any }) => {

  return (
    <View style={{ flex: 1, }}>
      <Text>Splash Screen</Text>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Sign Up')}>
        <Text>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SplashScreen;
