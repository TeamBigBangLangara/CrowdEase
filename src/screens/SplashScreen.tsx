import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { AuthStackNavigationProps } from '../types/types'

const SplashScreen = ({ navigation }: AuthStackNavigationProps<'SplashScreen'>) => {
  return (
    <View style={{ flex: 1, }}>
      <Text>Splash Screen</Text>
      <Pressable onPress={() => navigation.navigate('LoginScreen')}>
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('SignUpScreen')}>
        <Text>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SplashScreen;
