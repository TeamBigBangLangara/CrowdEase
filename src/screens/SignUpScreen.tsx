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
import {isPasswordValid} from '../utils/password';
import {signIn, signUp} from '../auth/user';

const SignUpScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPress = async () => {
    if (signUpValidation()) {
      await signUp(email, password);
      await signIn(email, password);
      navigation.navigate('Home');
    }
  };

  const onAppleSignUpPress = () => {
    navigation.navigate('Home');
  };

  const onGoogleSignUpPress = () => {
    navigation.navigate('Home');
  };

  const signUpValidation = (): boolean => {
    if (isEmailValid(email)) {
    }
    if (isPasswordValid(password)) {
      return true;
    } else {
      Alert.alert('Error', 'Invalid Email or Password');
      return false;
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text>Sign Up</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter Email"
      />
      <TextInput
        style={styles.textInputStyle}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter Password"
      />
      <TextInput
        style={styles.textInputStyle}
        onChangeText={setBusinessName}
        value={businessName}
        placeholder="Enter Business Name"
      />
      <View style={styles.buttonStyle}>
        <Button
          onPress={onSignUpPress}
          title="Sign Up"
          accessibilityLabel="Sign up"
        />
      </View>
      <View style={styles.iconStyle}>
        <Button
          onPress={onAppleSignUpPress}
          title="Apple"
          accessibilityLabel="Login"
        />
        <Button
          onPress={onGoogleSignUpPress}
          title="Google"
          accessibilityLabel="Login"
        />
      </View>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text>Already a user? Log in</Text>
      </Pressable>
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
    padding: 2,
  },
  textInputStyle: {
    height: 40,
    width: 333,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'lightgrey',
  },
  iconStyle: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUpScreen;