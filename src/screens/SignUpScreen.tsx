import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, Alert } from 'react-native';
import { isEmailValid } from '../utils/email';
import { isPasswordValid } from '../utils/password';
import { AuthStackNavigationProps } from '../types/navigationTypes';

const SignUpScreen = ({ navigation, }: AuthStackNavigationProps<'SignUpScreen'>) => {
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState(''); 
  const [password, setPassword] = useState(''); 

  const onSignUpPress = async () => {
    if (signUpValidation()) {
      navigation.navigate('LocationScreen', {
        emailParam: email,
        passwordParam: password,
        userName: businessName ? businessName : ' ',//Passing single space for empty value to avoid type error for null value
      });
    }
  };

  const onAppleSignUpPress = () => {
    
    navigation.navigate('LocationScreen', {
      emailParam: '',
      passwordParam: '',
      userName: ' ', //Passing single space for empty value to avoid type error for null value
    });
  };

  const onGoogleSignUpPress = () => {
    navigation.navigate('LocationScreen', {
    emailParam: '',
    passwordParam: '',
    userName: ' ', //Passing single space for empty value to avoid type error for null value
    });
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
        <Button onPress={onSignUpPress} title="Sign Up" accessibilityLabel="Sign up" />
      </View>
      <View style={styles.iconStyle}>
        <Button onPress={onAppleSignUpPress} title="Apple" accessibilityLabel="Login" />
        <Button onPress={onGoogleSignUpPress} title="Google" accessibilityLabel="Login" />
      </View>
      <Pressable onPress={() => navigation.navigate('LoginScreen')}>
        <Text>Already a user? Log in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
    padding: 16,
  },
  buttonStyle: {
    height: 40,
    width: 333,
    margin: 20,
    borderWidth: 1,
    borderRadius: 6,
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
