import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { signOut } from '../auth/user'
import { MainStackNavigationProps } from '../types/types'

const HomeScreen = ({ navigation }: MainStackNavigationProps<'HomeScreen'>) => {
  return (
    <View style={styles.wrapper}>
      <Text>Home Screen</Text>
      <Pressable onPress={signOut}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HomeScreen
