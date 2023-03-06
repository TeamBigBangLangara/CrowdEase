import React from 'react'
import { Pressable, Text, View } from 'react-native'

const SplashScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View>
      <Text>Splash Screen</Text>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Sign Up')}>
        <Text>Sign up</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Map')}>
        <Text>Map</Text>
      </Pressable>
    </View>
  )
}

export default SplashScreen
