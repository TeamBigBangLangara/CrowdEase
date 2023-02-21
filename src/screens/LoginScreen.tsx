import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Pressable, Alert } from 'react-native'

import { isEmailValid } from '../utils/email'
import { onGoogleButtonPress } from '../auth/googleSignIn'
import { signIn } from '../auth/user'
import { AuthStackNavigationProps } from '../types/types'

const LoginScreen = ({ navigation }: AuthStackNavigationProps<'LoginScreen'>) => {
  const [email, setEmail] = useState('jane.doe@example.com')
  const [password, setPassword] = useState('SuperSecretPassword!')

  const onLoginPress = () => {
    if (loginValidation()) {
      signIn(email, password)
    }
  }

  const onAppleLoginPress = () => {
    // navigation.navigate('Home')
  }

  const onGoogleLoginPress = () => {
    onGoogleButtonPress().then(() => {
      // navigation.navigate('Home')
      console.log('User logged in')
    })
  }

  const loginValidation = (): boolean => {
    if (isEmailValid(email)) {
      return true
    } else {
      Alert.alert('Error', 'Invalid Email')
      return false
    }
  }

  return (
    <View style={styles.wrapper}>
      <Text>Login</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={setEmail}
        value={email}
        placeholder={'Enter Email'}
      />
      <TextInput
        style={styles.textInputStyle}
        onChangeText={setPassword}
        value={password}
        placeholder={'Enter Password'}
      />
      <Pressable onPress={() => navigation.navigate('BottomTabs')}>
        <Text>Forgot Password</Text>
      </Pressable>
      <View style={styles.buttonStyle}>
        <Button onPress={onLoginPress} title="Login" accessibilityLabel="Login" />
      </View>
      <View style={styles.iconStyle}>
        <Button onPress={onAppleLoginPress} title="Apple" accessibilityLabel="Login" />
        <Button onPress={onGoogleLoginPress} title="Google" accessibilityLabel="Login" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
    padding: 16
  },
  buttonStyle: {
    height: 40,
    width: 333,
    margin: 20,
    borderWidth: 1,
    borderRadius: 6,
    padding: 1
  },
  iconStyle: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInputStyle: {
    height: 40,
    width: 333,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'lightgrey'
  }
})

export default LoginScreen
