import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Alert,
} from 'react-native';

import {isEmailValid} from '../utils/email';
import {onGoogleButtonPress} from '../auth/googleSignIn';
import {signIn} from '../auth/user';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = async () => {
    if (loginValidation()) {
      await signIn(email, password);
      navigation.navigate('Home');
    }
  };

  const onAppleLoginPress = () => {
    navigation.navigate('Home');
  };

  const onGoogleLoginPress = () => {
    onGoogleButtonPress().then(() => {
      navigation.navigate('Home');
      console.log('User logged in');
    });
  };

  const loginValidation = (): boolean => {
    if (isEmailValid(email)) {
      return true;
    } else {
      Alert.alert('Error', 'Invalid Email');
      return false;
    }
  };

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
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Text>Forgot Password</Text>
      </Pressable>
      <View style={styles.buttonStyle}>
        <Button
          onPress={onLoginPress}
          title="Login"
          accessibilityLabel="Login"
        />
      </View>
      <View style={styles.iconStyle}>
        <Button
          onPress={onAppleLoginPress}
          title="Apple"
          accessibilityLabel="Login"
        />
        <Button
          onPress={onGoogleLoginPress}
          title="Google"
          accessibilityLabel="Login"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'lightblue',
    alignItems: 'center',
    margin: 20,
  },
  buttonStyle: {
    height: 40,
    width: 333,
    margin: 20,
    borderWidth: 1,
    padding: 1,
  },
  iconStyle: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    height: 40,
    width: 333,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'lightgrey',
  },
});

export default LoginScreen;
